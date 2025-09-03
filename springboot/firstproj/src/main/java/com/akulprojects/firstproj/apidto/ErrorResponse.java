package com.akulprojects.firstproj.apidto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class ErrorResponse {
    private int status;
    private String msg;
}
