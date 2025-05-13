package com.akulprojects.firstproj.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.model.Song;
import com.akulprojects.firstproj.repository.SongRepo;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SongController {
    // autowired purpose???
    @Autowired
    SongRepo repo;

    @GetMapping("/song")
    public List<Song> getSong() {

        return repo.findAll();
    }
}
