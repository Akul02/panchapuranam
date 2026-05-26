package com.akulprojects.firstproj.features.certificates;

public class CertificatesDtos {

    public record CertificateDto (String certUrl, String programName) {}

    public record CertificateCountDto (Long count) {}

}
