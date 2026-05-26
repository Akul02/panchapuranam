package com.akulprojects.firstproj.apidto;

public class ApiResponses {

    public record SuccessResponse (String message) {}

    public record ErrorResponse (String message) {}
}
