package com.akulprojects.firstproj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akulprojects.firstproj.model.Audio;
import java.util.List;


@Repository
public interface AudioRepo extends JpaRepository<Audio, Integer> {

    List<Audio> findBySong_SongId(int songId);
    
}
