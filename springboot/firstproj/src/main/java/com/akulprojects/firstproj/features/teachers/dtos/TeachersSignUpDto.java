package com.akulprojects.firstproj.features.teachers.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class TeachersSignUpDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
