package com.akulprojects.firstproj.features.certificates;

import java.util.Date;

import com.akulprojects.firstproj.features.students.Students;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="certificates")
public class Certificates {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "certificate_id")
    private int certificateId;

    @Column(name = "creation_date")
    private Date creationDate;

    @Column(name = "file_path")
    private String filePath;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id")
    private Students student;

}
