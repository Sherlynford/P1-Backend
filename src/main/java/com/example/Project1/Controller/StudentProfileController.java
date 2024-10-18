package com.example.Project1.Controller;

import com.example.Project1.Entity.StudentProfile;
import com.example.Project1.Service.StudentProfileService;
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
@RequestMapping("/api/students")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;
    private final FileStorageService fileStorageService;
    private final TokenService tokenService;  // Inject TokenService

    @PostMapping("/")
    public ResponseEntity<StudentProfile> createStudentProfile(@RequestHeader("Authorization") String token,
                                                               @RequestBody StudentProfile studentProfile) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String role = tokenService.getRoleFromToken(token);

        if (!role.equals("student")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        StudentProfile newStudentProfile = studentProfileService.createStudentProfile(studentProfile);
        return new ResponseEntity<>(newStudentProfile, HttpStatus.CREATED);
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
    public ResponseEntity<List<StudentProfile>> getAllStudentProfiles(@RequestHeader("X-API-KEY") String apiKey) {
        if (!tokenService.validateApiKey(apiKey)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
          }

        List<StudentProfile> studentProfiles = studentProfileService.getAllStudentProfiles();
        return new ResponseEntity<>(studentProfiles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StudentProfile> getStudentProfileById(@RequestHeader("Authorization") String token,
                                                                @PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String role = tokenService.getRoleFromToken(token);
        Long studentProfileId = tokenService.getStudentProfileIdFromToken(token);

        if (!role.equals("student") && !studentProfileId.equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Optional<StudentProfile> studentProfile = studentProfileService.getStudentProfileById(id);
        return studentProfile.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/major/{major}")
    public ResponseEntity<List<StudentProfile>> getStudentProfilesByMajor(@RequestHeader("Authorization") String token,@PathVariable String major) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String role = tokenService.getRoleFromToken(token);
        String tokenMajor = tokenService.getMajorFromToken(token);

        if (!role.equals("teacher") && !tokenMajor.equals(major)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        List<StudentProfile> studentProfiles = studentProfileService.getStudentProfilesByMajor(major);
        return new ResponseEntity<>(studentProfiles, HttpStatus.OK);
    }

    @GetMapping("/faculty/{faculty}")
public ResponseEntity<List<StudentProfile>> getStudentProfilesByFaculty(@RequestHeader("Authorization") String token,
                                                                        @PathVariable String faculty) {
    if (!tokenService.validateToken(token)) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }
    String role = tokenService.getRoleFromToken(token);
    String tokenFaculty = tokenService.getFacultyFromToken(token);

    if (!role.equals("teacher") && !tokenFaculty.equals(faculty)) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
    List<StudentProfile> studentProfiles = studentProfileService.getStudentProfilesByFaculty(faculty);
    return new ResponseEntity<>(studentProfiles, HttpStatus.OK);
}

    @PutMapping("/{id}")
    public ResponseEntity<StudentProfile> updateStudentProfile(@RequestHeader("Authorization") String token,
                                                               @PathVariable Long id,
                                                               @RequestBody StudentProfile newStudentProfile) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String role = tokenService.getRoleFromToken(token);
        Long studentProfileId = tokenService.getStudentProfileIdFromToken(token);

        if (!role.equals("student") && !studentProfileId.equals(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        StudentProfile updatedStudentProfile = studentProfileService.updateStudentProfile(newStudentProfile, id);
        return new ResponseEntity<>(updatedStudentProfile, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentProfile(@RequestHeader("X-API-KEY") String apiKey,
                                                     @PathVariable Long id) {
     if (!tokenService.validateApiKey(apiKey)) {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
     }

        studentProfileService.deleteStudentProfile(id);
        return ResponseEntity.noContent().build();
    }
}
