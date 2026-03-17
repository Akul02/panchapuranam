package com.akulprojects.firstproj.features.enrolments;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.features.students.Students;
import com.akulprojects.firstproj.features.students.StudentsRepo;
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
        enrolment.setProgram(program);
        
        Students student = studentsRepo.findById(studentId)
                            .orElseThrow(() -> new ResourceNotFoundException("student not found"));

        enrolment.setStudent(student);

        enrolmentsRepo.save(enrolment);

    }


}
