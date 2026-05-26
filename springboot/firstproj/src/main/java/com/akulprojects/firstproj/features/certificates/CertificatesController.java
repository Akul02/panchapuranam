package com.akulprojects.firstproj.features.certificates;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.features.certificates.CertificatesDtos.CertificateCountDto;
import com.akulprojects.firstproj.features.certificates.CertificatesDtos.CertificateDto;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CertificatesController {

    private final CertificatesService certificatesService;

    public CertificatesController(CertificatesService certificatesService) {
        this.certificatesService = certificatesService;
    }

    @GetMapping("/certificates")
    public List<CertificateDto> getCertificate(@RequestParam String email) {
        return certificatesService.getCertificates(email);
    }

    @GetMapping("/certificates/count")
    public CertificateCountDto getStudentsWithCertificatesCount() {
        return certificatesService.getStudentsWithCertificates();
    }
    
}
