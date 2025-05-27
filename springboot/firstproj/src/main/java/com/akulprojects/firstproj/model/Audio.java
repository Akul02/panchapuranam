package com.akulprojects.firstproj.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="audios")
public class Audio {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "audio_id")
    private int audioId;

    @Column(name = "title")
    private String title;

    @Column(name = "filepath")
    private String filePath;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "song_id")
    private Song song;

}
