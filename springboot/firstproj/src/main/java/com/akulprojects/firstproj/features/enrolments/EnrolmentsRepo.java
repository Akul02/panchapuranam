package com.akulprojects.firstproj.features.enrolments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.akulprojects.firstproj.features.students.Students;
import java.util.List;
import com.akulprojects.firstproj.features.programs.Programs;


@Repository
public interface EnrolmentsRepo extends JpaRepository<Enrolments, Integer> {
    List<Enrolments> findByStudentAndProgram(Students student, Programs program);
}
