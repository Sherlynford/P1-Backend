package com.example.Project1.Controller;

import com.example.Project1.Entity.ConfirmJobApplication;
import com.example.Project1.Service.ConfirmJobApplicationService;
import com.example.Project1.Service.TokenService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ConfirmJobApplications")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class ConfirmJobApplicationController {

    private final ConfirmJobApplicationService confirmJobApplicationService;
    private final TokenService tokenService;  // Inject TokenService

    @PostMapping("/")
    public ResponseEntity<ConfirmJobApplication> createConfirmApplication(@RequestHeader("Authorization") String token,
                                                                       @RequestBody ConfirmJobApplication confirmJobApplication) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        ConfirmJobApplication newConfirmJobApplication = confirmJobApplicationService.createConfirmJobApplication(confirmJobApplication);
        return new ResponseEntity<>(newConfirmJobApplication, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<ConfirmJobApplication>> getAllConfirmApplications(@RequestHeader("Authorization") String token) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        List<ConfirmJobApplication> confirmJobApplications = confirmJobApplicationService.getAllConfirmJobApplications();
        return new ResponseEntity<>(confirmJobApplications, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConfirmJobApplication> getConfirmJobApplicationById(@RequestHeader("Authorization") String token,
                                                                        @PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Optional<ConfirmJobApplication> confirmJobApplication = confirmJobApplicationService.getConfirmJobApplicationById(id);
        return confirmJobApplication.map(ResponseEntity::ok)
                                 .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConfirmJobApplication> updateConfirmApplication(@RequestHeader("Authorization") String token,
                                                                       @PathVariable Long id,
                                                                       @RequestBody ConfirmJobApplication newConfirmJobApplication) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        ConfirmJobApplication updatedConfirmJobApplication = confirmJobApplicationService.updateConfirmJobApplication(newConfirmJobApplication, id);
        return new ResponseEntity<>(updatedConfirmJobApplication, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConfirmApplication(@RequestHeader("Authorization") String token,
                                                         @PathVariable Long id) {
        if (!tokenService.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        confirmJobApplicationService.deleteConfirmJobApplication(id);
        return ResponseEntity.noContent().build();
    }
}
