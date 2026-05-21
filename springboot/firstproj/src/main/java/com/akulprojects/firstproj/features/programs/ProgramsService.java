package com.akulprojects.firstproj.features.programs;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.features.users.Role;

@Service
public class ProgramsService {
    private final ProgramsRepo programsRepo;
    private final JwtUtil jwtUtil;

    public ProgramsService(ProgramsRepo programsRepo, JwtUtil jwtUtil) {
        this.programsRepo = programsRepo;
        this.jwtUtil = jwtUtil;
    }
    
    public List<String> getAllPrograms(String cookie) {
        if (!jwtUtil.checkPermissions(jwtUtil.extractJwtFromCookie(cookie), Role.TEACHER) && !jwtUtil.checkPermissions(jwtUtil.extractJwtFromCookie(cookie), Role.ADMIN)) {
            throw new ForbiddenException("do not have permission to access programs list");
        }

        List<Programs> programsList = programsRepo.findAll();
        List<String> programsStrings = new ArrayList<String>();
        for (Programs program : programsList) {
            programsStrings.add(program.getName());
        }

        return programsStrings;
    }

}
