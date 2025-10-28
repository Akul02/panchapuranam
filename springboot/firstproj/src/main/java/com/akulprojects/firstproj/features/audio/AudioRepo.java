package com.akulprojects.firstproj.features.audio;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface AudioRepo extends JpaRepository<Audio, Integer> {

    // List<Audio> findBySong_SongId(int songId);
    
}
