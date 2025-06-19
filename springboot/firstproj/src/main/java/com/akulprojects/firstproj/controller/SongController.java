package com.akulprojects.firstproj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.model.Song;
import com.akulprojects.firstproj.repository.SongRepo;
import com.akulprojects.firstproj.exception.InvalidInputException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.model.Language;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SongController {
    // autowired purpose???
    @Autowired
    SongRepo repo;

    @GetMapping("/song")
    public List<Song> getSong(@RequestParam String languageString) {
        
        Language lang;

        try {
            lang = Language.valueOf(languageString.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new InvalidInputException("the language: " + languageString + " is  not supported");
        }

        List<Song> songs = repo.findByLanguageOrderBySongIdAsc(lang);

        if (songs.isEmpty()) {
            throw new ResourceNotFoundException("no songs found for the language: " + languageString);
        }

        return songs;
    }
}
