package com.example.Project1.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Project1.Entity.ConfirmJobApplication;
import com.example.Project1.Service.ConfirmJobApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ConfirmJobApplications")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ConfirmJobApplicationController {

    private final ConfirmJobApplicationService confirmJobApplicationService;

    @PostMapping("/")
    public ResponseEntity<ConfirmJobApplication> createConfirmJobApplication(@RequestBody ConfirmJobApplication confirmJobApplication) {
        ConfirmJobApplication newConfirmJobApplication = confirmJobApplicationService.createConfirmJobApplication(confirmJobApplication);
        return new ResponseEntity<>(newConfirmJobApplication, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<ConfirmJobApplication>> getAllConfirmJobApplications() {
        List<ConfirmJobApplication> confirmJobApplications = confirmJobApplicationService.getAllConfirmJobApplications();
        return new ResponseEntity<>(confirmJobApplications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConfirmJobApplication> getConfirmJobApplicationById(@PathVariable Long id) {
        Optional<ConfirmJobApplication> confirmJobApplication = confirmJobApplicationService.getConfirmJobApplicationById(id);
        return confirmJobApplication.map(ResponseEntity::ok)
                                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConfirmJobApplication> updateConfirmJobApplication(@PathVariable Long id, @RequestBody ConfirmJobApplication newConfirmJobApplication) {
        ConfirmJobApplication updatedConfirmJobApplication = confirmJobApplicationService.updateConfirmJobApplication(newConfirmJobApplication, id);
        return new ResponseEntity<>(updatedConfirmJobApplication, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConfirmJobApplication(@PathVariable Long id) {
        confirmJobApplicationService.deleteConfirmJobApplication(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/")
    public ResponseEntity<Void> deleteAllConfirmJobApplications() {
        confirmJobApplicationService.deleteAllConfirmJobApplications();
        return ResponseEntity.noContent().build();
    }
    
}
