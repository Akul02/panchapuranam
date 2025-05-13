package com.akulprojects.firstproj.model;

import org.hibernate.annotations.Type;

import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="songs")
public class Song {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int songId;
    private String title;
    // choosing to use hypersistence tool as opposed to @elementcollection for a simpler faster solution
    @Type(StringArrayType.class)
    @Column(name = "verse", columnDefinition = "text[]")
    private String[] verse;
}