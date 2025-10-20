package com.akulprojects.firstproj.features.certificates;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.infrastructure.s3.S3Service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CertificatesController {

    @Autowired
    CertificatesRepo repo;

    @Autowired
    S3Service s3Service;

    @GetMapping("/certificate")
    public List<String> getCertificate(@RequestParam String email) {

        // find all certificates in db that belong to the student with the email given
        List<Certficates> certicates = repo.findByStudent_Email(email);
        List<String> urlList = new ArrayList<>();

        // for each certificate, generate presigned url
        for (Certficates cert : certicates) {
            urlList.add(s3Service.generatePresignedUrl("certficates/" + cert.getFilePath()));
        }
        
        return urlList;
    }
    
}
