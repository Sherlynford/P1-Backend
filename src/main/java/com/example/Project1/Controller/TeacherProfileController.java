package com.example.Project1.Controller;

import com.example.Project1.Entity.TeacherProfile;
import com.example.Project1.Service.TeacherProfileService;
import com.example.Project1.Service.FileStorageService;
import com.example.Project1.Service.TokenService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin("*")
@RequiredArgsConstructor
public class TeacherProfileController {

    private final TeacherProfileService teacherProfileService;
    private final FileStorageService fileStorageService;
    private final TokenService tokenService;  // Inject TokenService

    @PostMapping("/")
    public ResponseEntity<TeacherProfile> createTeacherProfile(@RequestHeader("Authorization") String token,
                                                               @RequestBody TeacherProfile teacherProfile) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TeacherProfile newTeacherProfile = teacherProfileService.createTeacherProfile(teacherProfile);
        return new ResponseEntity<>(newTeacherProfile, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, List<String>>> uploadFiles(@RequestHeader("Authorization") String token,
                                                                 @RequestParam("files") MultipartFile[] files) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<String> fileUrls = new ArrayList<>();
        Map<String, List<String>> response = new HashMap<>();

        try {
            for (MultipartFile file : files) {
                String fileUrl = fileStorageService.storeFile(file);
                fileUrls.add(fileUrl);
            }
            response.put("fileUrls", fileUrls);
            return ResponseEntity.ok(response);
        } catch (IOException | java.io.IOException e) {
            return ResponseEntity.status(500)
                    .body(Map.of("error", List.of("Failed to upload files: " + e.getMessage())));
        }
    }

    @GetMapping("/")
    public ResponseEntity<List<TeacherProfile>> getAllTeacherProfiles(@RequestHeader("Authorization") String token) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<TeacherProfile> teacherProfiles = teacherProfileService.getAllTeacherProfiles();
        return new ResponseEntity<>(teacherProfiles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherProfile> getTeacherProfileById(@RequestHeader("Authorization") String token,
                                                                @PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<TeacherProfile> teacherProfile = teacherProfileService.getTeacherProfileById(id);
        return teacherProfile.map(ResponseEntity::ok)
                             .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeacherProfile> updateTeacherProfile(@RequestHeader("Authorization") String token,
                                                               @PathVariable Long id,
                                                               @RequestBody TeacherProfile newTeacherProfile) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        TeacherProfile updatedTeacherProfile = teacherProfileService.updateTeacherProfile(newTeacherProfile, id);
        return new ResponseEntity<>(updatedTeacherProfile, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacherProfile(@RequestHeader("Authorization") String token,
                                                     @PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        teacherProfileService.deleteTeacherProfile(id);
        return ResponseEntity.noContent().build();
    }
}
