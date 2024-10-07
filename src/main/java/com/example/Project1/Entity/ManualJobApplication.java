package com.example.Project1.Entity;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
public class ManualJobApplication {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manualJobApplication-id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "studentProfile-id" , referencedColumnName = "studentProfile-id")
    @JsonBackReference(value = "student-ManualApply")
    private StudentProfile studentProfile;

    @NotBlank(message = "cannot be null or empty")
    @Column(nullable = false)  
    private String organizationName;

    private String organizationAddress;

    private String organizationEmail;

    private String organizationPhone;

    @NotBlank(message = "cannot be null or empty")
    @Column(nullable = false)  
    private String jobName;

    @Column(name = "applicationStatus")  
    private String applicationStatus;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate applicationDate;

}
