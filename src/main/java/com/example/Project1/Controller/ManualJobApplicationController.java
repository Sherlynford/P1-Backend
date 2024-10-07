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
@CrossOrigin("http://localhost:3000")
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

        String role = tokenService.getRoleFromToken(token);
        if (!role.equals("student")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ManualJobApplication newManualJobApplication = manualJobApplicationService.createManualJobApplication(manualJobApplication);
        return new ResponseEntity<>(newManualJobApplication, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<ManualJobApplication>> getAllManualJobApplications(@RequestHeader("X-API-KEY") String apiKey) {
        if (!tokenService.validateApiKey(apiKey)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
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
        String role = tokenService.getRoleFromToken(token);
        List<Long> manualJobApplicationIds = tokenService.getManualJobApplicationIdsFromToken(token);

        if (!role.equals("student") || !manualJobApplicationIds.contains(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
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
        String role = tokenService.getRoleFromToken(token);
        List<Long> manualJobApplicationIds = tokenService.getManualJobApplicationIdsFromToken(token);

        if (!role.equals("student") || !manualJobApplicationIds.contains(id)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        ManualJobApplication updatedManualJobApplication = manualJobApplicationService.updateManualJobApplication(newManualJobApplication, id);
        return new ResponseEntity<>(updatedManualJobApplication, HttpStatus.OK);
    }
    
    @PutMapping("/{id}/confirm")
    public ResponseEntity<ManualJobApplication> confirmManualJobApplication(@RequestHeader("Authorization") String token,@PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        String role = tokenService.getRoleFromToken(token);
        if (!role.equals("teacher")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        try {
            ManualJobApplication confirmedManualJobApplication = manualJobApplicationService.confirmManualJobApplication(id);
            return new ResponseEntity<>(confirmedManualJobApplication, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManualJobApplication(@RequestHeader("X-API-KEY") String apiKey,
                                                           @PathVariable Long id) {
    if (!tokenService.validateApiKey(apiKey)) {
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

        manualJobApplicationService.deleteManualJobApplication(id);
        return ResponseEntity.noContent().build();
    }
}
