package com.akulprojects.firstproj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.model.Song;
import com.akulprojects.firstproj.repository.SongRepo;
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
        

        Language lang = Language.valueOf(languageString.toUpperCase());

        return repo.findByLanguageOrderBySongIdAsc(lang);
    }
}
