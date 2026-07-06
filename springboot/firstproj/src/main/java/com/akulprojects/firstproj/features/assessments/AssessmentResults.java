package com.akulprojects.firstproj.features.assessments;

import java.time.LocalDateTime;

import com.akulprojects.firstproj.features.enrolments.Enrolments;

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
@Table(name="assessment_results")
public class AssessmentResults {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "assessment_result_id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "assessment_id", nullable = false)
    private Assessments assessment;

    @ManyToOne
    @JoinColumn(name = "enrolment_id", nullable = false)
    private Enrolments enrolment;

    @Column(name = "status")
    private AssessmentStatus status;

    @Column(name = "completed_at")
    private LocalDateTime completedAt;
}
