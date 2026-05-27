package com.akulprojects.firstproj.features.programs;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;



@Repository
public interface ProgramsRepo extends JpaRepository<Programs, Integer>{
    Optional<Programs> findByName(String name);

    @Query("""
        SELECT p
        FROM Programs p
        WHERE p.id NOT IN (
            SELECT e.program.id
            FROM Enrolments e
            WHERE e.student.id = :studentId
        )
    """)
    List<Programs> findProgramsStudentIsNotEnrolledIn(@Param("studentId") int studentId);

}
