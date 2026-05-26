package com.akulprojects.firstproj.features.enrolments;

import java.util.List;

import lombok.Getter;

@Getter
public class EnrolmentsDtos {
    public record StudentProgramEnrolmentDto (List<String> programNames, int studentId) {}

}
