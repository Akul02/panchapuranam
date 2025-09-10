package com.akulprojects.firstproj.teachers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.auth.JwtUtil;
import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.exception.UnauthorizedException;
import com.akulprojects.firstproj.teachers.exception.TeacherAlreadyExistsException;
import com.akulprojects.firstproj.users.Role;
import com.akulprojects.firstproj.users.UserRepo;
import com.akulprojects.firstproj.users.Users;
import com.auth0.jwt.interfaces.DecodedJWT;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    UserRepo repo;
    @Autowired
    JwtUtil jwt;

    @PostMapping("/register")
    public String postMethodName(@RequestBody TeacherSignUpDto signUpInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {

        // ADD AUTHORISATION CHECK
        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);
        if (!jwt.checkPermissions(decodedJWT, Role.ADMIN)) {
            throw new ForbiddenException("do not have permission to register a teacher");
        }
        
        // Check to see if email exists in database already
        Users checkTeacher = repo.findByEmail(signUpInfo.getEmail());

        if (checkTeacher != null) {
            throw new TeacherAlreadyExistsException("email is already used");
        }

        // Sign Up User
        Users newTeacher = new Users(signUpInfo.getFirstName(), signUpInfo.getLastName(), 
            signUpInfo.getEmail(), signUpInfo.getPassword(), Role.TEACHER, true);
        
        
        repo.save(newTeacher);
        // return success response
        return "Successfully added teacher";   
    }
    
}
