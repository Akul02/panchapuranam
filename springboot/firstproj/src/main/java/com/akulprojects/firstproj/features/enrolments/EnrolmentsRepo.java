package com.akulprojects.firstproj.features.enrolments;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EnrolmentsRepo extends JpaRepository<Enrolments, Integer> {

}
