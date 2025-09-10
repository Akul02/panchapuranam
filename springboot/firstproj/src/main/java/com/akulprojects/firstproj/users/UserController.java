package com.akulprojects.firstproj.users;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.auth.JwtUtil;
import com.akulprojects.firstproj.exception.InvalidInputException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.exception.UnauthorizedException;
import com.akulprojects.firstproj.users.dtos.LoginRequestDto;
import com.akulprojects.firstproj.users.dtos.PasswordDto;
import com.akulprojects.firstproj.users.dtos.SessionDto;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class UserController {
    @Autowired
    UserRepo repo;
    @Autowired
    JwtUtil jwt;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequest) {

        Users user = repo.findByEmail(loginRequest.getEmail());
        
        if (user == null) {
            throw new UnauthorizedException("the email is incorrect");
        }

        if (user.getPassword().equals(loginRequest.getPassword())) {
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

        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);
        SessionDto info = new SessionDto(); 

        info.setRole(decodedJWT.getClaim("role").asString());

        Users current_user = repo.findById(Integer.valueOf(decodedJWT.getSubject()))
                            .orElseThrow(() -> new ResourceNotFoundException("jwt token does not contain a valid user id"));     

        info.setFirstLogin(current_user.isFirstLogin());

        return info;
    }

    @PostMapping("/password")
    public String postMethodName(@CookieValue(name = "AUTH_TOKEN", required = false) String cookie, @RequestBody PasswordDto passwordRequest) {
        
        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);

        Users current_user = repo.findById(Integer.valueOf(decodedJWT.getSubject()))
                            .orElseThrow(() -> new ResourceNotFoundException("jwt token does not contain a valid user id"));
                            
        // Update Password & FirstLogin Value
        if (current_user.getPassword().equals(passwordRequest.getPassword())) {
            throw new InvalidInputException("password must be different to current password");
        }

        current_user.setPassword(passwordRequest.getPassword());
        current_user.setFirstLogin(false);

        repo.save(current_user);
        
        return "successfully updated password";
    }
    
}
