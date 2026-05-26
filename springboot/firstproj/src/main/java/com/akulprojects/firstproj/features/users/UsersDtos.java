package com.akulprojects.firstproj.features.users;

public class UsersDtos {

    public record LoginRequestDto (String email, String password) {}

    public record PasswordDto (String password) {}

    public record SessionDto (String role, boolean firstLogin) {}
    
}
