package com.akulprojects.firstproj.features.songs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.akulprojects.firstproj.features.languages.Language;

@Repository
public interface SongRepo extends JpaRepository<Song, Integer> {
    List<Song> findByLanguageOrderBySongIdAsc(Language language);
}
