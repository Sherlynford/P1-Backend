package com.example.Project1.Entity;

import java.time.LocalDateTime;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class ConfirmJobApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "confirmJobApplication-id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "teacherProfile-id" , referencedColumnName = "teacherProfile-id")
    @JsonBackReference(value = "teacher-ConfirmApply")
    private TeacherProfile teacherProfile;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "manualJobApplication-id" , referencedColumnName = "manualJobApplication-id")
    @JsonBackReference(value = "manual-ConfirmApply")
    private ManualJobApplication manualJobApplication;
 
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime confirmDateTime;
}
