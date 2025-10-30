package com.akulprojects.firstproj.features.users;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.exception.InvalidInputException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.exception.UnauthorizedException;
import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.features.users.dtos.LoginRequestDto;
import com.akulprojects.firstproj.features.users.dtos.PasswordDto;
import com.akulprojects.firstproj.features.users.dtos.SessionDto;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.password4j.Password;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class UsersController {
    @Autowired
    UsersRepo repo;
    @Autowired
    JwtUtil jwt;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequest) {

        Users user = repo.findByEmail(loginRequest.getEmail())
                        .orElseThrow(() -> new UnauthorizedException("the email is incorrect"));

        if (Password.check(loginRequest.getPassword(), user.getPassword()).withArgon2()) {
            String jwtToken = jwt.createJwt(user);
            
            ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", jwtToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("strict")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("login success");
        } else {
            throw new UnauthorizedException("the email or password is incorrect");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        
        ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", "")
                .httpOnly(true)
                .secure(false)
                .sameSite("strict")
                .path("/")
                .maxAge(0)
                .build();
        
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("logout success");
    }
    

    @GetMapping("/session")
    public SessionDto getSessionInfo(@CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {

        SessionDto info = new SessionDto();

        // if cookie is null return empty info dto
        if (cookie == null) {
            System.out.print("test");
            info.setRole(Role.NO_USER.toString());
            info.setFirstLogin(false);
            return info;
        }

        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);

        info.setRole(decodedJWT.getClaim("role").asString());

        Users current_user = repo.findById(jwt.getId(decodedJWT))
                            .orElseThrow(() -> new ResourceNotFoundException("jwt token does not contain a valid user id"));     

        info.setFirstLogin(current_user.isFirstLogin());

        return info;
    }

    @PostMapping("/password")
    public String postMethodName(@CookieValue(name = "AUTH_TOKEN", required = false) String cookie, @RequestBody PasswordDto passwordRequest) {
        
        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);

        Users current_user = repo.findById(jwt.getId(decodedJWT))
                            .orElseThrow(() -> new ResourceNotFoundException("jwt token does not contain a valid user id"));
                            
        // Update Password & FirstLogin Value
        if (Password.check(passwordRequest.getPassword(), current_user.getPassword()).withArgon2()) {
            throw new InvalidInputException("password must be different to current password");
        }

        current_user.setPassword(Password.hash(passwordRequest.getPassword()).addRandomSalt().withArgon2().getResult());
        current_user.setFirstLogin(false);

        repo.save(current_user);
        
        return "successfully updated password";
    }
    
}
