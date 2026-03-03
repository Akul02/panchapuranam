package com.akulprojects.firstproj.features.certificates;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.students.StudentsRepo;
import com.akulprojects.firstproj.infrastructure.s3.S3Service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CertificatesController {

    private final CertificatesService certificatesService;

    public CertificatesController(CertificatesService certificatesService) {
        this.certificatesService = certificatesService;
    }

    @GetMapping("/certificate")
    public List<String> getCertificate(@RequestParam String email) {

        return certificatesService.getCertificate(email);
    }

    @GetMapping("/certificates/count")
    public long getStudentsWithCertificatesCount() {
        return certificatesService.getStudentsWithCertificates();
    }
    
}
