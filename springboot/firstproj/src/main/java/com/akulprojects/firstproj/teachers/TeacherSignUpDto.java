package com.akulprojects.firstproj.teachers;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeacherSignUpDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
}
