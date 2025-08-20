package com.akulprojects.firstproj.teachers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.teachers.exception.TeacherAlreadyExistsException;
import com.akulprojects.firstproj.users.Role;
import com.akulprojects.firstproj.users.UserRepo;
import com.akulprojects.firstproj.users.Users;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/teacher")
public class TeacherController {
    @Autowired
    UserRepo repo;

    @PostMapping("/register")
    public String postMethodName(@RequestBody TeacherSignUpDto signUpInfo) {
        
        // Check to see if email exists in database already
        Users checkTeacher = repo.findByEmail(signUpInfo.getEmail());

        if (checkTeacher != null) {
            throw new TeacherAlreadyExistsException("email is already used");
        }

        // Sign Up User
        Users newTeacher = new Users(signUpInfo. getFirstName(), signUpInfo.getLastName(), 
            signUpInfo.getEmail(), signUpInfo.getPassword(), Role.TEACHER, true);
        
        try {
            repo.save(newTeacher);
            // return success response
            return "";
        } catch (Exception e) {
            // throw exception
            return "";
        }        
    }
    
}
