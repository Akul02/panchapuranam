package com.akulprojects.firstproj.teachers.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.akulprojects.firstproj.teachers.TeacherController;

@RestControllerAdvice(assignableTypes = TeacherController.class)
public class TeacherExceptionHandler {
    @ExceptionHandler(TeacherAlreadyExistsException.class)
    public ResponseEntity<String> handleTeacherAlreadyExists(TeacherAlreadyExistsException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body((ex.getMessage()));
    }
}
