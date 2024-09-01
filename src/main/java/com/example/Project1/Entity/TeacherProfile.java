package com.example.Project1.Entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    private String email;

    private String phoneNumber;

    private String faculty;

    private String major;

    private String profileIMG;

    @Column(unique = true) 
    private String teacherID;

    @OneToMany(mappedBy = "teacherProfile", fetch = FetchType.LAZY)
    @JsonManagedReference(value = "teacher-ConfirmApply")
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<ConfirmJobApplication> confirmJobApplications;


}
