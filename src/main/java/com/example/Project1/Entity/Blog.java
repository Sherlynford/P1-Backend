package com.example.Project1.Entity;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Data
public class Blog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "blog-id")
    private Long id;

    @NotBlank(message = "cannot be null or empty")
    @Column(nullable = false)  
    private String topic;

    @NotBlank(message = "cannot be null or empty")
    @Column(nullable = false)  
    private String detail;

    private String img;

    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime dateTime;

    private String link;

    private String organizationName;

    @NotBlank(message = "cannot be null or empty")
    @Column(nullable = false) 
    private String username;

    private String location;

}
