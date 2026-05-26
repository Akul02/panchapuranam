package com.akulprojects.firstproj.features.songs;

import java.util.List;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.exception.InvalidInputException;
import com.akulprojects.firstproj.exception.ResourceNotFoundException;
import com.akulprojects.firstproj.features.audio.AudiosDtos.AudioDto;
import com.akulprojects.firstproj.features.languages.Language;
import com.akulprojects.firstproj.features.songs.SongsDtos.SongDto;

@Service
public class SongService {

    private final SongRepo songRepo;

    public SongService(SongRepo songRepo) {
        this.songRepo = songRepo;
    }

    public List<SongDto> getSong(String languageString) {
        
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

        

        List<SongDto> songsDtos = songs.stream()
            .map(song -> new SongDto(
                song.getSongId(), 
                song.getTitle(), 
                song.getVerse(),
                song.getAudios().stream()
                    .map(audio -> new AudioDto(
                        audio.getAudioId(),
                        audio.getTitle(),
                        audio.getFilePath()
                    ))
                    .toList()
            ))
            .toList();

        return songsDtos;
    }
}
