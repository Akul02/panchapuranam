package com.akulprojects.firstproj.features.teachers;

import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.features.teachers.TeachersDtos.TeachersSignUpDto;

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
    public SuccessResponse registerTeacher(@RequestBody TeachersSignUpDto signUpInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return teachersService.registerTeacher(cookie, signUpInfo);  
    }
    
}
