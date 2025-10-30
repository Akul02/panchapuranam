package com.akulprojects.firstproj.features.students;

import java.util.List;

import com.akulprojects.firstproj.features.certificates.Certificates;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="students")
public class Students {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private int id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email", unique = true)
    private String email;

    @OneToMany(mappedBy = "student", fetch = FetchType.EAGER)
    private List<Certificates> certficates;

    // phone number
    // suburb
    // city
    // state
    // country

    public Students () {}

    public Students(String firstName2, String lastName2, String email2) {
        this.setFirstName(firstName2);
        this.setLastName(lastName2);
        this.setEmail(email2);
    }

}   
