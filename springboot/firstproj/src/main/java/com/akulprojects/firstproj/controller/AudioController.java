package com.akulprojects.firstproj.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ContentDisposition;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import com.akulprojects.firstproj.model.Audio;
import com.akulprojects.firstproj.repository.AudioRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@CrossOrigin(origins = "https://localhost:3000")
public class AudioController {
        @Autowired
        AudioRepo repo;

        @GetMapping("/audios/{songId}")
        public ResponseEntity<Resource> getAudioList(@PathVariable Integer songId) throws IOException {
            List<Audio> audiosList = repo.findBySong_SongId(songId);
            Audio audio = audiosList.get(0);

            FileSystemResource file = new FileSystemResource("audios/" + audio.getFilePath());
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.valueOf("audio/mpeg"));
            headers.setContentLength(file.contentLength());
            headers.setContentDisposition(ContentDisposition.inline().filename(audio.getFilePath()).build());
            headers.add("Accept-Ranges", "bytes");

            return new ResponseEntity<Resource>(file,  headers, HttpStatus.OK);
        }
}
