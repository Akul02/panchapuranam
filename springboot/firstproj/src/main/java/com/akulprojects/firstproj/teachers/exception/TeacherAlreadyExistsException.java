package com.akulprojects.firstproj.teachers.exception;

public class TeacherAlreadyExistsException extends RuntimeException {
    public TeacherAlreadyExistsException (String messageString) { super(messageString); }
}
