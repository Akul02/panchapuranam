package com.akulprojects.firstproj.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String messageString) { super(messageString);  }
}
