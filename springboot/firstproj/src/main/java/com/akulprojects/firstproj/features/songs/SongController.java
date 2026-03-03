package com.akulprojects.firstproj.features.songs;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class SongController {
    
    private final SongService songService;

    public SongController(SongService songService) {
        this.songService = songService;
    }

    @GetMapping("/song")
    public List<Song> getSong(@RequestParam String languageString) {
        
        return songService.getSong(languageString);
    }
}
