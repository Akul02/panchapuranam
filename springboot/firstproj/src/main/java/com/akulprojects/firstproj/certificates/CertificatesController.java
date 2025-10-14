package com.akulprojects.firstproj.certificates;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CertificatesController {

    @Autowired
    CertificatesRepo repo;

    @GetMapping("/certificate")
    public List<Certficates> getCertificate(@RequestParam String email) {

        // find certificates in db that belong to the student with the email given

        return repo.findByStudent_Email(email);
    }
    
}
