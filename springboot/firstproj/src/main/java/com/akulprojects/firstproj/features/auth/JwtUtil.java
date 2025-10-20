package com.akulprojects.firstproj.features.auth;

import java.util.Date;
import java.util.UUID;

import org.springframework.stereotype.Component;

import com.akulprojects.firstproj.exception.UnauthorizedException;
import com.akulprojects.firstproj.features.users.Role;
import com.akulprojects.firstproj.features.users.Users;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Component("jwtUtil")
public class JwtUtil {

    Algorithm algo = Algorithm.HMAC256("pancha");
    JWTVerifier verifier = JWT.require(algo).withIssuer("panchapuranam.org").build();

    public String createJwt(Users user) {
        String jwt = JWT.create()
                .withIssuer("panchapuranam.org")
                .withSubject(String.valueOf(user.getId()))
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 60*60*1000L))
                .withJWTId(UUID.randomUUID().toString())
                .withClaim("role", user.getRole().name())
                .sign(algo);

        return jwt;
    }

    public DecodedJWT extractJwtFromCookie(String cookie) {
        if (cookie == null) {
            throw new UnauthorizedException("Invalid user session, please login again"); 
        }
        return verifier.verify(cookie);
    }

    public boolean checkPermissions(DecodedJWT jwt, Role requiredRole) {
        String jwtRole = jwt.getClaim("role").asString();

        if (requiredRole.name().equalsIgnoreCase(jwtRole)) {
            return true;
        } else {
            return false;
        }
    }

    public int getId(DecodedJWT jwt) {
        return Integer.valueOf(jwt.getSubject());
    }
}
