package com.example.Project1.Controller;

import com.example.Project1.Entity.StudentProfile;
import com.example.Project1.Service.StudentProfileService;

import com.example.Project1.Service.FileStorageService;

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
@RequestMapping("/api/students")
@CrossOrigin("*")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;
    private final FileStorageService fileStorageService;

    @PostMapping("/")
    public ResponseEntity<StudentProfile> createStudentProfile(@RequestBody StudentProfile studentProfile) {
        StudentProfile newStudentProfile = studentProfileService.createStudentProfile(studentProfile);
        return new ResponseEntity<>(newStudentProfile, HttpStatus.CREATED);
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, List<String>>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
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
    public ResponseEntity<List<StudentProfile>> getAllStudentProfiles() {
        List<StudentProfile> studentProfiles = studentProfileService.getAllStudentProfiles();
        return new ResponseEntity<>(studentProfiles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentProfile> getStudentProfileById(@PathVariable Long id) {
        Optional<StudentProfile> studentProfile = studentProfileService.getStudentProfileById(id);
        return studentProfile.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<StudentProfile> updateStudentProfile(@PathVariable Long id,
            @RequestBody StudentProfile newStudentProfile) {
        StudentProfile updatedStudentProfile = studentProfileService.updateStudentProfile(newStudentProfile, id);
        return new ResponseEntity<>(updatedStudentProfile, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentProfile(@PathVariable Long id) {
        studentProfileService.deleteStudentProfile(id);
        return ResponseEntity.noContent().build();
    }
}
