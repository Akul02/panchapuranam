package com.akulprojects.firstproj.users.dtos;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SessionDto {
    private String role;
    private boolean firstLogin;
}
