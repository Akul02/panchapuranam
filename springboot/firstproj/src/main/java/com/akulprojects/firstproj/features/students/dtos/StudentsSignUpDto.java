package com.akulprojects.firstproj.features.students.dtos;

import java.util.List;

import lombok.Getter;

@Getter

public class StudentsSignUpDto {
    private String firstName;
    private String lastName;
    private String email;
    private List<String> programNames;

}
