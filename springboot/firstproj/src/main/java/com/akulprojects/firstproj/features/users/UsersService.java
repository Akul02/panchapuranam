package com.akulprojects.firstproj.features.users;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.exception.ConflictException;
import com.akulprojects.firstproj.exception.InvalidInputException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.features.teachers.TeachersDtos.TeachersSignUpDto;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.password4j.Password;

@Service
public class UsersService {

    private final UsersRepo repo;
    private final JwtUtil jwt;

    public UsersService(UsersRepo repo, JwtUtil jwt) {
        this.repo = repo;
        this.jwt = jwt;
    }

    public Optional<Users> findUserWithEmail(String emailString) {
        return repo.findByEmail(emailString);
    }

    public Users findUserWithId(int id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("id does not correspond to a user"));
    }

    public SuccessResponse changeUserPassword(String password, String cookie) {

        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);

        Users current_user = findUserWithId(jwt.getId(decodedJWT));

        if (Password.check(password, current_user.getPassword()).withArgon2()) {
            throw new InvalidInputException("password must be different to current password");
        }

        current_user.setPassword(Password.hash(password).addRandomSalt().withArgon2().getResult());

        // teacher sets their password on their first login
        current_user.setFirstLogin(false);
        System.out.println("5");
        repo.save(current_user);

        return new SuccessResponse("Successfully changed password");
    } 

    public void addTeacherUser(TeachersSignUpDto signUpInfo) {
        if (repo.findByEmail(signUpInfo.email()).isPresent()) {
            throw new ConflictException("the email is already used");
        }

        String hashString = Password.hash(signUpInfo.password()).addRandomSalt().withArgon2().getResult();

        Users newTeacher = new Users(signUpInfo.firstName(), signUpInfo.lastName(), 
            signUpInfo.email(), hashString, Role.TEACHER, true);

        repo.save(newTeacher);

    }

}
