package com.akulprojects.firstproj.features.students.dtos;

import java.time.LocalDateTime;
import java.util.List;

import com.akulprojects.firstproj.features.assessments.AssessmentStatus;
import com.akulprojects.firstproj.features.certificates.CertificatesDtos.CertificateDto;

public class StudentsDtos {
    public record StudentProfileDto(
        int id,
        String firstname,
        String lastname,
        String email,
        List<CertificateDto> certificates,
        List<StudentProfileEnrolmentDto> enrolments
    ) {}

    public record StudentProfileEnrolmentDto(
        int id,
        LocalDateTime enrolmentDate,
        String programName,
        List<StudentProfileEnrolmentAssessmentsDto> assessments
    ) {}

    /*
    assesmentprogression dto
        assessment order
        assessment description
        assessment status/mark
        completed at date
    */
    public record StudentProfileEnrolmentAssessmentsDto(
        int id,
        String assessmentDescription,
        AssessmentStatus status
    ) {}

    public record StudentsSignUpDto(
        String firstName,
        String lastName,
        String email,
        List<String> programNames
    ) {}
}
