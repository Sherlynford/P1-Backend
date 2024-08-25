package com.example.Project1.Repository;

import com.example.Project1.Entity.ManualJobApplication;
import com.example.Project1.Entity.StudentProfile;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManualJobApplicationRepository extends JpaRepository<ManualJobApplication, Long> {

    Optional<ManualJobApplication> findByStudentProfileAndApplicationStatus(StudentProfile studentProfile,String applicationStatus);

}
