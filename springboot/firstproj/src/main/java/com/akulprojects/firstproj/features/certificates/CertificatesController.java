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

    @Autowired
    CertificatesRepo repo;

    @Autowired
    StudentsRepo studentsRepo;

    @Autowired
    S3Service s3Service;

    @GetMapping("/certificate")
    public List<String> getCertificate(@RequestParam String email) {

        studentsRepo.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("email provided does not match any student record"));


        // find all certificates in db that belong to the student with the email given
        List<Certificates> certicates = repo.findByStudent_Email(email);
        List<String> resList = new ArrayList<>();

        if (certicates.size() == 0) {
            System.out.println("debug");
            return resList;
        } 

        // for each certificate, generate presigned url
        for (Certificates cert : certicates) {
            resList.add(s3Service.generatePresignedUrl("certficates/" + cert.getFilePath()));
        }
        
        return resList;
    }

    @GetMapping("/certificates/count")
    public long getStudentsWithCertificates() {
        return repo.countStudentsWithCertificates();
    }
    
}
