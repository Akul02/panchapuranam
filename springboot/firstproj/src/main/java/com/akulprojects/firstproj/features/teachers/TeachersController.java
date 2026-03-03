package com.akulprojects.firstproj.features.teachers;

import com.akulprojects.firstproj.features.teachers.dtos.TeachersSignUpDto;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/teacher")
public class TeachersController {

    private final TeachersService teachersService;

    public TeachersController(TeachersService teachersService) {
        this.teachersService = teachersService;
    }

    @PostMapping("/register")
    public String registerTeacher(@RequestBody TeachersSignUpDto signUpInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        
        teachersService.registerTeacher(cookie, signUpInfo);

        return "Successfully added teacher";   
    }
    
}
