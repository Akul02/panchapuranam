package com.akulprojects.firstproj.model;

import org.hibernate.annotations.Type;

import io.hypersistence.utils.hibernate.type.array.StringArrayType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="songs")
public class Song {
    @Id
    @Column(name = "song_id")
    private int songId;

    @Column(name = "title")
    private String title;

    @Enumerated(EnumType.STRING)
    @Column(name = "language", nullable = false)
    private Language language;
    
    // choosing to use hypersistence tool as opposed to @elementcollection for a simpler faster solution
    @Type(StringArrayType.class)
    @Column(name = "verse", columnDefinition = "text[]")
    private String[] verse;
}