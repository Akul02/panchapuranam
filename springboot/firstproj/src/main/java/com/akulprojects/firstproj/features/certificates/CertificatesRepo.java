package com.akulprojects.firstproj.features.certificates;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CertificatesRepo extends JpaRepository<Certificates, Integer> {

    List<Certificates> findByStudent_Email(String emailString);
    
    @Query("SELECT COUNT (DISTINCT c.student) FROM Certificates c")
    Long countStudentsWithCertificates();

}
