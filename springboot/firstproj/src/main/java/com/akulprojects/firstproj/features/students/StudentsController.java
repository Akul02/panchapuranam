package com.akulprojects.firstproj.features.students;

import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.features.students.dtos.StudentsSearchDto;
import com.akulprojects.firstproj.features.students.dtos.StudentsDtos.StudentProfileDto;
import com.akulprojects.firstproj.features.students.dtos.StudentsDtos.StudentsSignUpDto;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("student")
public class StudentsController {
    private final StudentsService studentsService;

    public StudentsController(StudentsService studentsService) {
        this.studentsService = studentsService;
    }

    @PostMapping("/register")
    public SuccessResponse registerStudent(@RequestBody StudentsSignUpDto signUpInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return studentsService.registerStudent(signUpInfo, cookie);
    }

    @PostMapping("/bulk/register")
    public SuccessResponse bulkRegisterStudent(@RequestParam(value = "file", required = true) MultipartFile file, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return studentsService.bulkRegisterStudent(file, cookie);
    }

    @GetMapping("/search")
    public List<StudentsSearchDto> getStudent(@RequestParam String searchString, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return studentsService.searchStudent(searchString, cookie);
    }

    @GetMapping("/profile")
    public StudentProfileDto getStudentProfile(@RequestParam String uidString, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return studentsService.getStudentProfile(uidString, cookie);
    }

    @GetMapping("/{id}/available-programs")
    public List<String> getStudentAvailablePrograms(@PathVariable String id, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {
        return studentsService.getStudentsAvailableProgramsList(id, cookie);
    }
    
    
    
    
}
