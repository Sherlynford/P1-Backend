package com.example.Project1.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.Project1.Entity.ConfirmJobApplication;
import com.example.Project1.Repository.ConfirmJobApplicationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ConfirmJobApplicationService {
    
    private final ConfirmJobApplicationRepository confirmJobApplicationRepository;

    public ConfirmJobApplication createConfirmJobApplication(ConfirmJobApplication confirmJobApplication) {
        confirmJobApplication.setConfirmDateTime(LocalDateTime.now());
        return confirmJobApplicationRepository.save(confirmJobApplication);
    }   

    public List<ConfirmJobApplication> getAllConfirmJobApplications() {
        return confirmJobApplicationRepository.findAll();
    }  
    
    public Optional<ConfirmJobApplication> getConfirmJobApplicationById(Long id) {
        return confirmJobApplicationRepository.findById(id);
    }

    public ConfirmJobApplication updateConfirmJobApplication(ConfirmJobApplication newConfirmJobApplication, Long id) {     
        return confirmJobApplicationRepository.findById(id)
                .map(confirmJobApplication -> {
                    confirmJobApplication.setConfirmDateTime(newConfirmJobApplication.getConfirmDateTime());
                    return confirmJobApplicationRepository.save(confirmJobApplication);
                })
                .orElseGet(() -> {
                    newConfirmJobApplication.setId(id);
                    return confirmJobApplicationRepository.save(newConfirmJobApplication);
                });
    }
    
    public void deleteConfirmJobApplication(Long id) {
        confirmJobApplicationRepository.deleteById(id);
    }   

    public void deleteAllConfirmJobApplications() {
        confirmJobApplicationRepository.deleteAll();
    }   

}
