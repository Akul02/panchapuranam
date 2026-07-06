package com.akulprojects.firstproj.features.enrolments;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.features.students.Students;
import com.akulprojects.firstproj.features.students.StudentsRepo;
import com.akulprojects.firstproj.features.users.Role;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.akulprojects.firstproj.apidto.ApiResponses.SuccessResponse;
import com.akulprojects.firstproj.exception.ConflictException;
import com.akulprojects.firstproj.exception.ForbiddenException;
import com.akulprojects.firstproj.features.assessments.AssessmentResults;
import com.akulprojects.firstproj.features.assessments.AssessmentStatus;
import com.akulprojects.firstproj.features.auth.JwtUtil;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.programs.Programs;
import com.akulprojects.firstproj.features.programs.ProgramsRepo;

@Service
public class EnrolmentsService {

    private final EnrolmentsRepo enrolmentsRepo;
    private final StudentsRepo studentsRepo;
    private final ProgramsRepo programsRepo;
    private final JwtUtil jwtUtil;


    public EnrolmentsService (EnrolmentsRepo enrolmentsRepo, StudentsRepo studentsRepo, ProgramsRepo programsRepo, JwtUtil jwtUtil) {
        this.enrolmentsRepo = enrolmentsRepo;
        this.studentsRepo = studentsRepo;
        this.programsRepo = programsRepo;
        this.jwtUtil = jwtUtil;

    }

    public void createEnrolment(int studentId, String programName) {
        Enrolments enrolment = new Enrolments();
        enrolment.setEnrolmentDate(LocalDateTime.now());

        Programs program = programsRepo.findByName(programName.toLowerCase())
                            .orElseThrow(() -> new ResourceNotFoundException("program not found"));
        
        
        Students student = studentsRepo.findById(studentId)
                            .orElseThrow(() -> new ResourceNotFoundException("student not found"));

        // check if enrolment already exists
        if (!enrolmentsRepo.findByStudentAndProgram(student, program).isEmpty()) {
            throw new ConflictException("student is already enrolled in the program");
        }

        enrolment.setProgram(program);
        enrolment.setStudent(student);

        enrolmentsRepo.save(enrolment);

    }

    public SuccessResponse enrolStudent(String authCookie, List<String> programNames, int studentId) {
        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(authCookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to enrol a student into a program");
        }

        for (String programName : programNames) {
            createEnrolment(studentId, programName);
        }

        return new SuccessResponse("Successfully enrolled student into selected programs");
    }

    public double enrolmentProgress(String authCookie, String enrolmentId) {

        DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(authCookie);
        if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
            throw new ForbiddenException("do not have permission to see student enrolment progress");
        }

        Enrolments enrolment = enrolmentsRepo.findById(Integer.valueOf(enrolmentId))
                                    .orElseThrow(() -> new ResourceNotFoundException("enrolment not found"));


        List<AssessmentResults> assessments = enrolment.getAssessmentResults();

        if (assessments.size() == 0) {
            return 0;
        }

        double progress = 0;

        for (AssessmentResults assessment : assessments) {
            if (assessment.getStatus() == AssessmentStatus.PASS) {
                progress++;
            }
        }


        return progress / enrolment.getProgram().getAssessmentNumber();
    }


}
