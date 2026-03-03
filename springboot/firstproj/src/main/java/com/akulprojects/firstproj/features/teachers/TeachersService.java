package com.akulprojects.firstproj.features.teachers;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.features.teachers.dtos.TeachersSignUpDto;
import com.akulprojects.firstproj.features.users.Role;
import com.akulprojects.firstproj.features.users.UsersService;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class TeachersService {

    private final UsersService usersService;
    private final JwtUtil jwtUtil;

    public TeachersService(UsersService usersService, JwtUtil jwtUtil) {
        this.usersService = usersService;
        this.jwtUtil = jwtUtil;
    }

    public void registerTeacher(String cookie, TeachersSignUpDto signUpInfo) {

        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(cookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.ADMIN)) {
            throw new ForbiddenException("do not have permission to register a teacher");
        }
        
        usersService.addTeacherUser(signUpInfo);
    }

}
