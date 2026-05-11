package com.akulprojects.firstproj.features.students.dtos;

import java.util.List;

import com.akulprojects.firstproj.features.enrolments.dtos.StudentProfileEnrolmentDto;

import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@NoArgsConstructor

public class StudentProfileDto {
    private int id;
    private String firstname;
    private String lastname;
    private String email;
    private List<String> certificateUrls;
    private List<StudentProfileEnrolmentDto> enrolments;
    
}
