package com.akulprojects.firstproj.features.students.dtos;

import java.time.LocalDateTime;
import java.util.List;

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
        String programName
    ) {}

    public record StudentsSignUpDto(
        String firstName,
        String lastName,
        String email,
        List<String> programNames
    ) {}
}
