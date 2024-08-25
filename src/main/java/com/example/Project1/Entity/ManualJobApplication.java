package com.example.Project1.Entity;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    @NotBlank(message = "cannot be null or empty")
    @Column(nullable = false,name = "applicationStatus")  
    private String applicationStatus;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate applicationDate;

    @OneToOne(mappedBy = "manualJobApplication", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "manual-ConfirmApply")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private ConfirmJobApplication confirmJobApplication;
}
