package com.akulprojects.firstproj.features.teachers;

public class TeachersDtos {
    public record TeachersSignUpDto (String firstName, String lastName, String email, String password) {}
}
