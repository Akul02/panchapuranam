package com.akulprojects.firstproj.features.songs;

import java.util.List;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.exception.InvalidInputException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.languages.Language;

@Service
public class SongService {

    private final SongRepo songRepo;

    public SongService(SongRepo songRepo) {
        this.songRepo = songRepo;
    }

    public List<Song> getSong(String languageString) {
        
        Language lang;

        try {
            lang = Language.valueOf(languageString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidInputException("the language: " + languageString + " is  not supported");
        }

        List<Song> songs = songRepo.findByLanguageOrderBySongIdAsc(lang);

        if (songs.isEmpty()) {
            throw new ResourceNotFoundException("no songs found for the language: " + languageString);
        }

        return songs;
    }
}
