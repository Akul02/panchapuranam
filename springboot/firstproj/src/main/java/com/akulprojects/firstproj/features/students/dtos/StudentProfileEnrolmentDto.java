package com.akulprojects.firstproj.features.students.dtos;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public class StudentProfileEnrolmentDto {
    private LocalDateTime enrolmentDate;
    private String programName;
    // learning progress for this enrolment
}
