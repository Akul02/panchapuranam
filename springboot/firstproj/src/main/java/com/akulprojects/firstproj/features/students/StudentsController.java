package com.akulprojects.firstproj.features.students;

import com.akulprojects.firstproj.features.students.dtos.StudentsSignUpDto;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("student")
public class StudentsController {
    private final StudentsService studentsService;

    public StudentsController(StudentsService studentsService) {
        this.studentsService = studentsService;
    }

    @PostMapping("/register")
    public String registerStudent(@RequestBody StudentsSignUpDto signUpInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {

        studentsService.registerStudent(signUpInfo, cookie);

        return "Successfully enrolled student";
    }

    @PostMapping("/bulk/register")
    public String bulkRegisterStudent(@RequestParam(value = "file", required = true) MultipartFile file, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return studentsService.bulkRegisterStudent(file, cookie);
    }
    
}
