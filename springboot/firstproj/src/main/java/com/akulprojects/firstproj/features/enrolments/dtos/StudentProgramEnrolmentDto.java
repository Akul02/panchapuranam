package com.akulprojects.firstproj.features.enrolments.dtos;

import java.util.List;

import lombok.Getter;

@Getter
public class StudentProgramEnrolmentDto {

    private List<String> programNames;
    private int studentId;
}
