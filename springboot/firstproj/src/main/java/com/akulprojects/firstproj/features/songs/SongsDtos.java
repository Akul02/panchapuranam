package com.akulprojects.firstproj.features.songs;

import java.util.List;

import com.akulprojects.firstproj.features.audio.AudiosDtos.AudioDto;

public class SongsDtos {
    public record SongDto(int songId, String title, String[] verse, List<AudioDto> audios) {}
}
