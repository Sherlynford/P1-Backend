package com.example.Project1.Entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
@Entity
@Data
public class Person {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "person-id")
    private Long id;

    @NotBlank(message = "Password cannot be null or empty")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Column(nullable = false)   
    private String password;

    @NotBlank(message = "cannot be null or empty")
    @Column(nullable = false)  
    private String role;

    @NotBlank(message = "Email cannot be null or empty")
    @Column(nullable = false, unique = true)   
    private String email;

    @JsonProperty("isAdmin")
    private boolean isAdmin;

    @OneToOne(mappedBy = "person", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "person-student")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private StudentProfile studentProfile;

    @OneToOne(mappedBy = "person", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "person-teacher")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private TeacherProfile teacherProfile;

}
