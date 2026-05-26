package com.akulprojects.firstproj.features.users;

import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.features.users.UsersDtos.PasswordDto;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CookieValue;


@RestController
public class UsersController {

    private final UsersService usersService;
    

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/password")
    public SuccessResponse postMethodName(@CookieValue(name = "AUTH_TOKEN", required = false) String cookie, @RequestBody PasswordDto passwordRequest) {
        return usersService.changeUserPassword(passwordRequest.password(), cookie);
    }
    
}
