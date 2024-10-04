package com.example.Project1.Controller;

import com.example.Project1.Entity.ManualJobApplication;
import com.example.Project1.Service.ManualJobApplicationService;
import com.example.Project1.Service.TokenService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ManualJobApplications")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ManualJobApplicationController {

    private final ManualJobApplicationService manualJobApplicationService;
    private final TokenService tokenService;  // Inject TokenService

    @PostMapping("/")
    public ResponseEntity<ManualJobApplication> createManualJobApplication(@RequestHeader("Authorization") String token,
                                                                           @RequestBody ManualJobApplication manualJobApplication) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        ManualJobApplication newManualJobApplication = manualJobApplicationService.createManualJobApplication(manualJobApplication);
        return new ResponseEntity<>(newManualJobApplication, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<ManualJobApplication>> getAllManualJobApplications(@RequestHeader("Authorization") String token) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<ManualJobApplication> manualJobApplications = manualJobApplicationService.getAllManualJobApplications();
        return new ResponseEntity<>(manualJobApplications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ManualJobApplication> getManualJobApplicationById(@RequestHeader("Authorization") String token,
                                                                            @PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<ManualJobApplication> manualJobApplication = manualJobApplicationService.getManualJobApplicationById(id);
        return manualJobApplication.map(ResponseEntity::ok)
                                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ManualJobApplication> updateManualJobApplication(@RequestHeader("Authorization") String token,
                                                                           @PathVariable Long id,
                                                                           @RequestBody ManualJobApplication newManualJobApplication) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        ManualJobApplication updatedManualJobApplication = manualJobApplicationService.updateManualJobApplication(newManualJobApplication, id);
        return new ResponseEntity<>(updatedManualJobApplication, HttpStatus.OK);
    }

    @PutMapping("/{id}/choose")
    public ResponseEntity<ManualJobApplication> chooseManualJobApplication(@RequestHeader("Authorization") String token,@PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            ManualJobApplication chosenApplication = manualJobApplicationService.chooseManualJobApplication(id);
            return new ResponseEntity<>(chosenApplication, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
    
    @PutMapping("/{id}/confirm")
    public ResponseEntity<ManualJobApplication> confirmManualJobApplication(@RequestHeader("Authorization") String token,@PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            ManualJobApplication confirmedManualJobApplication = manualJobApplicationService.confirmManualJobApplication(id);
            return new ResponseEntity<>(confirmedManualJobApplication, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManualJobApplication(@RequestHeader("Authorization") String token,
                                                           @PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        manualJobApplicationService.deleteManualJobApplication(id);
        return ResponseEntity.noContent().build();
    }
}
