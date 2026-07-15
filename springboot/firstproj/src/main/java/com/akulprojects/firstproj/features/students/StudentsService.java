package com.akulprojects.firstproj.features.students;

import com.akulprojects.firstproj.features.enrolments.Enrolments;
import com.akulprojects.firstproj.features.enrolments.EnrolmentsService;
import com.akulprojects.firstproj.features.programs.Programs;
import com.akulprojects.firstproj.features.programs.ProgramsRepo;

import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.exception.ConflictException;
import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.assessments.AssessmentResults;
import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.features.certificates.CertificatesService;
import com.akulprojects.firstproj.features.students.dtos.StudentsSearchDto;
import com.akulprojects.firstproj.features.students.dtos.StudentsDtos.*;
import com.akulprojects.firstproj.features.students.exception.CsvParseException;
import com.akulprojects.firstproj.features.students.exception.StudentBulkRegisterException;
import com.akulprojects.firstproj.features.users.Role;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.opencsv.CSVReader;
import com.opencsv.CSVReaderBuilder;
import com.opencsv.exceptions.CsvException;

import jakarta.transaction.Transactional;

@Service
public class StudentsService {

    private final EnrolmentsService enrolmentsService;
    private final StudentsRepo studentsRepo;
    private final JwtUtil jwtUtil;
    private final CustomizedStudentsRepo batchUpdateRepo;
    private final CertificatesService certificatesService;
    private final ProgramsRepo programsRepo;

    public StudentsService(StudentsRepo studentsRepo, JwtUtil jwtUtil, CustomizedStudentsRepo batchUpdatRepo, EnrolmentsService enrolmentsService, CertificatesService certificatesService, ProgramsRepo programsRepo) {
        this.studentsRepo = studentsRepo;
        this.jwtUtil = jwtUtil;
        this.batchUpdateRepo = batchUpdatRepo;
        this.enrolmentsService = enrolmentsService;
        this.certificatesService = certificatesService;
        this.programsRepo = programsRepo;
    }

    public SuccessResponse registerStudent(StudentsSignUpDto signUpInfo, String cookie) {

        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(cookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to register a student");
        }

        if (studentsRepo.findByEmail(signUpInfo.email()).isPresent()) {
            throw new ConflictException("the email is already used");
        }

        Students newStudent = new Students(signUpInfo.firstName(), signUpInfo.lastName(), signUpInfo.email());
        
        Students savedStudent = studentsRepo.save(newStudent);

        // add student program enrolment functionality here
        for (String programName : signUpInfo.programNames()) {
            enrolmentsService.createEnrolment(savedStudent.getId(), programName);
        }

        return new SuccessResponse("Successfully enrolled student");

    }

    @Transactional
    public SuccessResponse bulkRegisterStudent(MultipartFile file, String cookie) {
        
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
            try {
                batchUpdateRepo.saveAll(studentData);
                return new SuccessResponse("Successfully enrolled set of students");
            } catch (DataAccessException e) {
                throw new StudentBulkRegisterException("failed to bulk register students, no students registered, check data");

            }

            // CAN REMOVE IF NO ISSUES WITH BULKREGISTERING
            // int[] res = batchUpdateRepo.saveAll(studentData);

            // if (res.length == studentData.size()) {
            //     System.out.println(Arrays.toString(res));
            //     System.out.println(studentData.size());
            //     return new SuccessResponse("Successfully enrolled set of students");
            // } else {
            //     return "failed";
            // }

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

    public StudentProfileDto getStudentProfile (String uidString, String cookie) {

        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(cookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to view a student");
        }

        Students student = studentsRepo.findById(Integer.valueOf(uidString))
                            .orElseThrow(() -> new ResourceNotFoundException("id does not correspond to a student"));


        List<StudentProfileEnrolmentDto> enrolments = new ArrayList<>();
        for (Enrolments enrolment : student.getEnrolments()) {
            
            // calculate the progress of the students learning for this particular enrolment/program

            // get a list of the assessments the student has done for this program

            List<StudentProfileEnrolmentAssessmentsDto> assessments = enrolment.getAssessmentResults().stream()
            .map((AssessmentResults assessment) -> {
                return new StudentProfileEnrolmentAssessmentsDto(assessment.getId(), assessment.getAssessment().getDescription(), assessment.getStatus());
            })
            .toList();
    
            enrolments.add(new StudentProfileEnrolmentDto(enrolment.getId(), enrolment.getEnrolmentDate(), enrolment.getProgram().getName(), assessments));
        }

        StudentProfileDto profileDto = new StudentProfileDto(
            student.getId(), 
            student.getFirstName(), 
            student.getLastName(), 
            student.getEmail(), 
            certificatesService.getCertificates(student.getEmail()) , 
            enrolments
        );

        return profileDto;

    }

    public List<String> getStudentsAvailableProgramsList(String studentIdString, String cookie) {
        
        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(cookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to view a student");
        }
        
        if (!studentsRepo.existsById(Integer.valueOf(studentIdString))) {
            throw new ResourceNotFoundException("id does not correspond to a student");
        }
    
        List<Programs> availablePrograms = programsRepo.findProgramsStudentIsNotEnrolledIn(Integer.valueOf(studentIdString));

        return availablePrograms.stream().map((program) -> program.getName()).toList();
    }
}
