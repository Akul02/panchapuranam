package com.akulprojects.firstproj.students;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.auth.JwtUtil;
import com.akulprojects.firstproj.exception.ConflictException;
import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.students.dtos.StudentsSignUpDto;
import com.akulprojects.firstproj.users.Role;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("student")
public class StudentsController {
    @Autowired
    StudentsRepo repo;
    @Autowired
    JwtUtil jwt;

    @PostMapping("/register")
    public String registerStudent(@RequestBody StudentsSignUpDto signUpInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {

        // AUTHORISATION CHECK
        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);
        if (!jwt.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to register a student");
        }

        if (repo.findByEmail(signUpInfo.getEmail()).isPresent()) {
            System.out.println("test");
            throw new ConflictException("the email is already used");
        }

        Students newStudent = new Students(signUpInfo.getFirstName(), signUpInfo.getLastName(), signUpInfo.getEmail());
        
        repo.save(newStudent);

        return "Succesffully enrolled student";
    }
    
}
