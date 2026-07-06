package com.akulprojects.firstproj.features.enrolments;

import java.time.LocalDateTime;
import java.util.List;

import com.akulprojects.firstproj.features.assessments.AssessmentResults;
import com.akulprojects.firstproj.features.programs.Programs;
import com.akulprojects.firstproj.features.students.Students;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "enrolments")
public class Enrolments {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Column(name = "enrolment_date")
    private LocalDateTime enrolmentDate;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private Students student;

    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private Programs program;

    @OneToMany(mappedBy = "enrolment", fetch = FetchType.LAZY)
    private List<AssessmentResults> assessmentResults;

}
