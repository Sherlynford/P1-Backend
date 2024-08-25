package com.example.Project1.Controller;

import com.example.Project1.Entity.StudentProfile;
import com.example.Project1.Service.StudentProfileService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
@CrossOrigin("*")
@RequiredArgsConstructor
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    @PostMapping("/")
    public ResponseEntity<StudentProfile> createStudentProfile(@RequestBody StudentProfile studentProfile) {
        StudentProfile newStudentProfile = studentProfileService.createStudentProfile(studentProfile);
        return new ResponseEntity<>(newStudentProfile, HttpStatus.CREATED);
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
    public ResponseEntity<StudentProfile> updateStudentProfile(@PathVariable Long id, @RequestBody StudentProfile newStudentProfile) {
        StudentProfile updatedStudentProfile = studentProfileService.updateStudentProfile(newStudentProfile, id);
        return new ResponseEntity<>(updatedStudentProfile, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentProfile(@PathVariable Long id) {
        studentProfileService.deleteStudentProfile(id);
        return ResponseEntity.noContent().build();
    }
}
