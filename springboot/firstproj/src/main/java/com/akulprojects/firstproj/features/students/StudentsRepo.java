package com.akulprojects.firstproj.features.students;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.NativeQuery;
import org.springframework.stereotype.Repository;

import com.akulprojects.firstproj.features.students.dtos.StudentsSearchDto;

@Repository
public interface StudentsRepo extends JpaRepository<Students, Integer> {
    Optional<Students> findByEmail(String email);

    @NativeQuery("""
        SELECT student_id as id, CONCAT(first_name, ' ', last_name) as name FROM students 
        WHERE LOWER(first_name) = ?1 
        OR LOWER(first_name) LIKE CONCAT(?1, '%')
        OR LOWER(last_name) LIKE CONCAT(?1, '%')
        OR LOWER(CONCAT(first_name, ' ', last_name)) LIKE CONCAT('%', ?1, '%')
        ORDER BY
            CASE
                WHEN LOWER(first_name) = ?1 THEN 1
                WHEN LOWER(first_name) LIKE CONCAT(?1, '%') THEN 2
                WHEN LOWER(last_name) LIKE CONCAT(?1, '%') THEN 3
                ELSE 4
            END ASC
        LIMIT 10;
    """)
    List<StudentsSearchDto> searchStudentWithSearchString(String searchString);
}
