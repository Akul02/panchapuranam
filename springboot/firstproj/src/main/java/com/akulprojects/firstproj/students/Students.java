package com.akulprojects.firstproj.students;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
