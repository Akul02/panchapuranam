package com.akulprojects.firstproj.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akulprojects.firstproj.model.Song;

@Repository
public interface SongRepo extends JpaRepository<Song, Integer> {

}
