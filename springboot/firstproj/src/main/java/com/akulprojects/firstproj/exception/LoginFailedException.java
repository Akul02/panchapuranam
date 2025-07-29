package com.akulprojects.firstproj.exception;

public class LoginFailedException extends RuntimeException{
    public LoginFailedException (String messageString) { super(messageString); }

}
