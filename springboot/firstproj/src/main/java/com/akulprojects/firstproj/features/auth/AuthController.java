package com.akulprojects.firstproj.features.auth;

import java.time.Duration;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.features.users.UsersDtos.LoginRequestDto;
import com.akulprojects.firstproj.features.users.UsersDtos.SessionDto;

@RestController
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<SuccessResponse> login(@RequestBody LoginRequestDto loginRequest) {

        String jwtToken = authService.login(loginRequest);
        
        ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", jwtToken)
            .httpOnly(true)
            // MUST CHANGE TO TRUE WHEN BUILDING DOCKER IMAGE FOR DEPLOYMENT
            .secure(false)
            .sameSite("strict")
            .path("/")
            .maxAge(Duration.ofHours(1))
            .build();
    
        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(new SuccessResponse("Login successful"));
   
    }

    @PostMapping("/logout")
    public ResponseEntity<SuccessResponse> logout() {

        ResponseCookie cookie = ResponseCookie.from("AUTH_TOKEN", "")
                .httpOnly(true)
                // MUST CHANGE TO TRUE WHEN BUILDING DOCKER IMAGE FOR DEPLOYMENT
                .secure(false)
                .sameSite("strict")
                .path("/")
                .maxAge(0)
                .build();

        return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(new SuccessResponse("Logout successful"));
    }

    @GetMapping("/session")
    public SessionDto getSessionInfo(@CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return authService.getSessionInfo(cookie);
    }

}
