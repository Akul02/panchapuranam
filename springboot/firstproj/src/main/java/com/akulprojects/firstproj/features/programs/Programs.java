package com.akulprojects.firstproj.features.programs;

import java.util.List;

import com.akulprojects.firstproj.features.enrolments.Enrolments;

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
@Table(name="programs")
public class Programs {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "program_id")
    private String id;
    
    @Column(name = "name")
    private String name;
    
    @OneToMany(mappedBy = "program", fetch = FetchType.LAZY)
    private List<Enrolments> enrolments;


}
