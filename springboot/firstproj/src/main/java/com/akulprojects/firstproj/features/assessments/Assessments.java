package com.akulprojects.firstproj.features.assessments;

import com.akulprojects.firstproj.features.programs.Programs;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="assessments")
public class Assessments {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "assessment_id")
    private int id;
    
    @Column(name = "name")
    private String description;

    @Column(name = "number")
    private int number;

    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private Programs program;

    /*
    Type:
    Oral 
    Written
    
    */
}
