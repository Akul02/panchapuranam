package com.akulprojects.firstproj.features.students;

import com.akulprojects.firstproj.features.enrolments.EnrolmentsService;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.akulprojects.firstproj.exception.ConflictException;
import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.features.students.dtos.StudentsSearchDto;
import com.akulprojects.firstproj.features.students.dtos.StudentsSignUpDto;
import com.akulprojects.firstproj.features.students.exception.CsvParseException;
import com.akulprojects.firstproj.features.users.Role;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;

@Service
public class StudentsService {

    private final EnrolmentsService enrolmentsService;
    private final StudentsRepo studentsRepo;
    private final JwtUtil jwtUtil;
    private final CustomizedStudentsRepo batchUpdateRepo;

    public StudentsService(StudentsRepo studentsRepo, JwtUtil jwtUtil, CustomizedStudentsRepo batchUpdatRepo, EnrolmentsService enrolmentsService) {
        this.studentsRepo = studentsRepo;
        this.jwtUtil = jwtUtil;
        this.batchUpdateRepo = batchUpdatRepo;
        this.enrolmentsService = enrolmentsService;
    }

    public void registerStudent(StudentsSignUpDto signUpInfo, String cookie) {

        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(cookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to register a student");
        }

        if (studentsRepo.findByEmail(signUpInfo.getEmail()).isPresent()) {
            throw new ConflictException("the email is already used");
        }

        Students newStudent = new Students(signUpInfo.getFirstName(), signUpInfo.getLastName(), signUpInfo.getEmail());
        
        Students savedStudent = studentsRepo.save(newStudent);

        // add student program enrolment functionality here
        for (String programName : signUpInfo.getProgramNames()) {
            enrolmentsService.createEnrolment(savedStudent.getId(), programName);
        }

    }

    public String bulkRegisterStudent(MultipartFile file, String cookie) {
        
        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(cookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
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
                if (studentsRepo.findByEmail(data[2]).isPresent()) {
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

    public List<StudentsSearchDto> searchStudent (String searchString, String cookie) {

        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(cookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to search for a student");
        }

        return studentsRepo.searchStudentWithSearchString(searchString.toLowerCase());
    }

}
