package com.akulprojects.firstproj.infrastructure.s3;

import java.time.Duration;

import org.apache.commons.collections4.Get;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import software.amazon.awssdk.services.s3.presigner.model.PresignedGetObjectRequest;

@Service
public class S3Service {

    private final S3Presigner s3Presigner;

    public S3Service (S3Presigner s3Presigner) {
        this.s3Presigner = s3Presigner;
    }

    public String generatePresignedUrl(String key) {
        
        // getobjectrequest
        GetObjectRequest objectRequest = GetObjectRequest.builder()
            .bucket("panchapuranam-bucket")
            .key(key)
            .build();

        // objectpresignreqeust
        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(5))
            .getObjectRequest(objectRequest)
            .build();
        
        //Generate URL
        PresignedGetObjectRequest presignedRequest = s3Presigner.presignGetObject(presignRequest);

        return presignedRequest.url().toExternalForm();
    }

}
