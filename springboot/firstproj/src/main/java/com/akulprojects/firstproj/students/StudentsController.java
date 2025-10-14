package com.akulprojects.firstproj.students;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.akulprojects.firstproj.auth.JwtUtil;
import com.akulprojects.firstproj.exception.ConflictException;
import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.students.dtos.StudentsSignUpDto;
import com.akulprojects.firstproj.students.exception.CsvParseException;
import com.akulprojects.firstproj.users.Role;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;

import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("student")
public class StudentsController {
    @Autowired
    StudentsRepo repo;
    @Autowired
    JwtUtil jwt;
    @Autowired
    CustomizedStudentsRepo batchUpdateRepo;

    @PostMapping("/register")
    public String registerStudent(@RequestBody StudentsSignUpDto signUpInfo, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {

        // AUTHORISATION CHECK
        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);
        if (!jwt.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to register a student");
        }

        if (repo.findByEmail(signUpInfo.getEmail()).isPresent()) {
            System.out.println("test");
            throw new ConflictException("the email is already used");
        }

        Students newStudent = new Students(signUpInfo.getFirstName(), signUpInfo.getLastName(), signUpInfo.getEmail());
        
        repo.save(newStudent);

        return "Successfully enrolled student";
    }
    

    // bulk enrol route
    // uploads to a csv file to the server
    // goes through the csv file and then 
    @PostMapping("/bulk/register")
    public String bulkRegisterStudent(@RequestParam(value = "file", required = true) MultipartFile file, @CookieValue(name = "AUTH_TOKEN", required = false) String cookie) {

        // AUTHORISATION CHECK
        DecodedJWT decodedJWT = jwt.extractJwtFromCookie(cookie);
        if (!jwt.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to register a student");
        }

        // read csv file, skipping col titles
        try (CSVReader reader = new CSVReaderBuilder(new InputStreamReader(file.getInputStream())).withSkipLines(1).build()) {

            List<String[]> enrolmentData = reader.readAll();
            List<String> set = new ArrayList<>();
            // validate contents of csv file
            // for each element in the list
            for (String[] data : enrolmentData) {

                // check if email already belongs to a student
                if (repo.findByEmail(data[2]).isPresent()) {
                    throw new ConflictException("The email: " + data[2] + " is already used, emails for each student must be unqiue"); 
                }

                // check if there is a duplicate email in the enrolmentData
                if (!set.contains(data[2])) {
                    set.add(data[2]);
                } else {
                    // duplicate email
                    throw new ConflictException("The email: " + data[2] + " occurs more than once in the file provided, emails for each student must be unqiue");
                }
                
            }            

            // map List<String[]> to List<Object[]>
            List<Object[]> studentData = enrolmentData.stream()
            .map(r -> (Object[]) r)
            .toList();

            // perform batchupdate
            int[] res = batchUpdateRepo.saveAll(studentData);

            if (res.length == studentData.size()) {
                System.out.println(Arrays.toString(res));
                System.out.println(studentData.size());
                return "Successfully enrolled set of students";
            } else {
                return "failed";
            }

        } catch (IOException | CsvException e) {
            throw new CsvParseException("error relating to parsing csv file");
        } 
    }

}
