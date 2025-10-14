package com.akulprojects.firstproj.certificates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CertificatesRepo extends JpaRepository<Certficates, Integer> {
    List<Certficates> findByStudent_Email(String emailString);
    
}
