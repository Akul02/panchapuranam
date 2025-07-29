package com.akulprojects.firstproj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akulprojects.firstproj.model.Users;


@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
}
