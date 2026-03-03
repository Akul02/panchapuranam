package com.akulprojects.firstproj.features.certificates;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.students.StudentsRepo;
import com.akulprojects.firstproj.infrastructure.s3.S3Service;

@Service
public class CertificatesService {
    private final CertificatesRepo certificatesRepo;
    private final StudentsRepo studentsRepo;
    private final S3Service s3Service;

    public CertificatesService(CertificatesRepo certificatesRepo, StudentsRepo studentsRepo, S3Service s3Service) {
        this.certificatesRepo = certificatesRepo;
        this.studentsRepo = studentsRepo;
        this.s3Service = s3Service;
    }

    public List<String> getCertificate(String emailString) {
        
        studentsRepo.findByEmail(emailString)
            .orElseThrow(() -> new ResourceNotFoundException("email provided does not match any student record"));


        // find all certificates in db that belong to the student with the email given
        List<Certificates> certicates = certificatesRepo.findByStudent_Email(emailString);
        List<String> resList = new ArrayList<>();

        if (certicates.size() == 0) {
            return resList;
        } 

        // for each certificate, generate presigned url
        for (Certificates cert : certicates) {
            resList.add(s3Service.generatePresignedUrl("certficates/" + cert.getFilePath()));
        }
        
        return resList;
    }

    public long getStudentsWithCertificates() {
        return certificatesRepo.countStudentsWithCertificates();
    }

}
