package com.akulprojects.firstproj.users;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;



@Repository
public interface UserRepo extends JpaRepository<Users, Integer> {
    Users findByEmail(String email);
    Optional<Users> findById(int id);
}
