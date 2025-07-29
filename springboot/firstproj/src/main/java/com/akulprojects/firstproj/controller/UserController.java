package com.akulprojects.firstproj.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.dto.LoginRequest;
import com.akulprojects.firstproj.exception.LoginFailedException;
import com.akulprojects.firstproj.model.Users;
import com.akulprojects.firstproj.repository.UserRepo;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class UserController {
    @Autowired
    UserRepo repo;

    @PostMapping("/login")
    public String postMethodName(@RequestBody LoginRequest loginRequest) {

        Users user = repo.findByEmail(loginRequest.getEmail());
        
        if (user == null) {
            throw new LoginFailedException("the email is incorrect");
        }

        if (user.getPassword().equals(loginRequest.getPassword())) {
            return "success";
        } else {
            throw new LoginFailedException("the email or password is incorrect");
        }
    }
    
}
