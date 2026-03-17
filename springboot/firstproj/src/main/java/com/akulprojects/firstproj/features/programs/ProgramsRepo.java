package com.akulprojects.firstproj.features.programs;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;



@Repository
public interface ProgramsRepo extends JpaRepository<Programs, Integer>{
    Optional<Programs> findByName(String name);

}
