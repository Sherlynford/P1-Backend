package com.example.Project1.Controller;

import com.example.Project1.Entity.TeacherProfile;
import com.example.Project1.Service.TeacherProfileService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/teachers")
@CrossOrigin("*")
@RequiredArgsConstructor
public class TeacherProfileController {

    private final TeacherProfileService teacherProfileService;

    @PostMapping("/")
    public ResponseEntity<TeacherProfile> createTeacherProfile(@RequestBody TeacherProfile teacherProfile) {
        TeacherProfile newTeacherProfile = teacherProfileService.createTeacherProfile(teacherProfile);
        return new ResponseEntity<>(newTeacherProfile, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<TeacherProfile>> getAllTeacherProfiles() {
        List<TeacherProfile> teacherProfiles = teacherProfileService.getAllTeacherProfiles();
        return new ResponseEntity<>(teacherProfiles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TeacherProfile> getTeacherProfileById(@PathVariable Long id) {
        Optional<TeacherProfile> teacherProfile = teacherProfileService.getTeacherProfileById(id);
        return teacherProfile.map(ResponseEntity::ok)
                             .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<TeacherProfile> updateTeacherProfile(@PathVariable Long id, @RequestBody TeacherProfile newTeacherProfile) {
        TeacherProfile updatedTeacherProfile = teacherProfileService.updateTeacherProfile(newTeacherProfile, id);
        return new ResponseEntity<>(updatedTeacherProfile, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTeacherProfile(@PathVariable Long id) {
        teacherProfileService.deleteTeacherProfile(id);
        return ResponseEntity.noContent().build();
    }
}
