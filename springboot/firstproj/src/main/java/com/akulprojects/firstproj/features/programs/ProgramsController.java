package com.akulprojects.firstproj.features.programs;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("programs")
public class ProgramsController {

    private final ProgramsService programsService;

    public ProgramsController(ProgramsService programsService) {
        this.programsService = programsService;
    }
    
    @GetMapping("/get")
    public List<String> getAllPrograms(@CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return programsService.getAllPrograms(cookie);
    }
    
}
