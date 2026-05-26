package com.akulprojects.firstproj.features.auth;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.exception.UnauthorizedException;
import com.akulprojects.firstproj.features.users.Role;
import com.akulprojects.firstproj.features.users.Users;
import com.akulprojects.firstproj.features.users.UsersService;
import com.akulprojects.firstproj.features.users.UsersDtos.LoginRequestDto;
import com.akulprojects.firstproj.features.users.UsersDtos.SessionDto;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.password4j.Password;

@Service
public class AuthService {
    private final JwtUtil jwt;
    private final UsersService usersService;

    public AuthService(JwtUtil jwt, UsersService usersService) {
        this.jwt = jwt;
        this.usersService = usersService;
    }

    public String login(LoginRequestDto loginRequest) {

        Users user = usersService.findUserWithEmail(loginRequest.email())
                .orElseThrow(() -> new UnauthorizedException("the email or password is incorrect"));

        if (!Password.check(loginRequest.password(), user.getPassword()).withArgon2()) {
        throw new UnauthorizedException("the email or password is incorrect");
        }

        return jwt.createJwt(user);
    }

    public SessionDto getSessionInfo(String cookie) {

        // if cookie is null return empty info dto
        if (cookie == null) {
            return new SessionDto(Role.NO_USER.toString(), false);
        }

        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);
        Users current_user = usersService.findUserWithId(jwt.getId(decodedJWT));

        return new SessionDto(decodedJWT.getClaim("role").asString(), current_user.isFirstLogin());
    }


}
