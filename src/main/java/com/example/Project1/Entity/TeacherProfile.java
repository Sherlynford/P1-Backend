package com.example.Project1.Entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
public class TeacherProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacherProfile-id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "person-id" , referencedColumnName = "person-id")
    @JsonBackReference(value = "person-teacher")
    private Person person;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    private String faculty;

    private String major;

    private String profileIMG;

}
