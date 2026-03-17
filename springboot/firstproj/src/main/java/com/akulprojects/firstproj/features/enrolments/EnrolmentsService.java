package com.akulprojects.firstproj.features.enrolments;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.features.students.Students;
import com.akulprojects.firstproj.features.students.StudentsRepo;
import com.akulprojects.firstproj.exception.ConflictException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.programs.Programs;
import com.akulprojects.firstproj.features.programs.ProgramsRepo;

@Service
public class EnrolmentsService {

    private final EnrolmentsRepo enrolmentsRepo;
    private final StudentsRepo studentsRepo;
    private final ProgramsRepo programsRepo;

    public EnrolmentsService (EnrolmentsRepo enrolmentsRepo, StudentsRepo studentsRepo, ProgramsRepo programsRepo) {
        this.enrolmentsRepo = enrolmentsRepo;
        this.studentsRepo = studentsRepo;
        this.programsRepo = programsRepo;
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

    public void enrolStudent(String authCookie, List<String> programNames, int studentId) {
        // DecodedJWT decodedJWT = jwtUtil.extractJwtFromCookie(authCooke);
        // if (!jwtUtil.checkPermissions(decodedJWT, Role.TEACHER)) {
        //     throw new ForbiddenException("do not have permission to enrol a student into a program");
        // }

        for (String programName : programNames) {
            createEnrolment(studentId, programName);
        }
    }


}
