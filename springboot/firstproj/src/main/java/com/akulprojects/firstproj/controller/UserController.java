package com.akulprojects.firstproj.controller;

import java.time.Duration;
import java.util.Date;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.dto.LoginRequest;
import com.akulprojects.firstproj.exception.LoginFailedException;
import com.akulprojects.firstproj.model.Users;
import com.akulprojects.firstproj.repository.UserRepo;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class UserController {
    @Autowired
    UserRepo repo;

    Algorithm algo = Algorithm.HMAC256("pancha");
    JWTVerifier verifier =JWT.require(algo).withIssuer("panchapuranam.org").build();

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {

        Users user = repo.findByEmail(loginRequest.getEmail());
        
        if (user == null) {
            throw new LoginFailedException("the email is incorrect");
        }

        if (user.getPassword().equals(loginRequest.getPassword())) {
            String jwtToken = JWT.create()
                .withIssuer("panchapuranam.org")
                .withSubject(String.valueOf(user.getUId()))
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 60*60*1000L))
                .withJWTId(UUID.randomUUID().toString())
                .withClaim("role", user.getRole().toString())
                .sign(algo);
            
            ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", jwtToken)
                .httpOnly(true)
                .secure(false)
                .sameSite("strict")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("login success");
        } else {
            throw new LoginFailedException("the email or password is incorrect");
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
    

    @GetMapping("/role")
    public String getRole(@CookieValue(name = "AUTH_TOKEN") String cookie) {
        try {
            DecodedJWT decodedJWT = verifier.verify(cookie);
            return decodedJWT.getClaim("role").asString();
        } catch (JWTVerificationException e) {
            System.out.println("error");
            return e.getMessage();
        }
    }
    
}
