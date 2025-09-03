package com.akulprojects.firstproj.apidto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SuccessResponse<T> {
    private String msg;
    private T data;
}
