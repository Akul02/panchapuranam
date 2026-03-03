package com.akulprojects.firstproj.features.users;

import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.features.users.dtos.PasswordDto;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;


@RestController
public class UsersController {

    private final UsersService usersService;
    private final JwtUtil jwt;

    public UsersController(UsersService usersService, JwtUtil jwt) {
        this.usersService = usersService;
        this.jwt = jwt;
    }

    @PostMapping("/password")
    public String postMethodName(@CookieValue(name = "AUTH_TOKEN", required = false) String cookie, @RequestBody PasswordDto passwordRequest) {
        
        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);
        
        usersService.changeUserPassword(passwordRequest.getPassword(), jwt.getId(decodedJWT));        
        
        return "successfully updated password";
    }
    
}
