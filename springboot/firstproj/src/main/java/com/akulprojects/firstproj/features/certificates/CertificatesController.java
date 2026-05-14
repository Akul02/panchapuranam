package com.akulprojects.firstproj.features.certificates;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.features.certificates.dtos.CertificateDto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CertificatesController {

    private final CertificatesService certificatesService;

    public CertificatesController(CertificatesService certificatesService) {
        this.certificatesService = certificatesService;
    }

    @GetMapping("/certificate")
    public List<CertificateDto> getCertificate(@RequestParam String email) {
        return certificatesService.getCertificates(email);
    }

    @GetMapping("/certificates/count")
    public long getStudentsWithCertificatesCount() {
        return certificatesService.getStudentsWithCertificates();
    }
    
}
