package com.akulprojects.firstproj.features.audio;

import org.springframework.stereotype.Service;

import com.akulprojects.firstproj.exception.ResourceNotFoundException;

@Service
public class AudioService {
    private final AudioRepo audioRepo;

    public AudioService(AudioRepo audioRepo) {
        this.audioRepo = audioRepo;
    }

    public Audio getAudio(int audioId) {
        return audioRepo.findById(audioId)
                .orElseThrow(() -> new ResourceNotFoundException("audio does not exist"));
    }
}
