package com.akulprojects.firstproj.features.audio;

import java.io.IOException;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class AudioController {
        
        private final AudioService audioService;

        public AudioController(AudioService audioService) {
            this.audioService = audioService;
        }

        @GetMapping("/audio")
        public ResponseEntity<Resource> getAudio(@RequestParam Integer audioId) throws IOException {
            Audio audio = audioService.getAudio(audioId);

            FileSystemResource file = new FileSystemResource("audios/" + audio.getFilePath());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf("audio/mpeg"));
            headers.setContentLength(file.contentLength());
            headers.setContentDisposition(ContentDisposition.inline().filename(audio.getFilePath()).build());
            headers.add("Accept-Ranges", "bytes");

            return new ResponseEntity<Resource>(file,  headers, HttpStatus.OK);
        }
}
