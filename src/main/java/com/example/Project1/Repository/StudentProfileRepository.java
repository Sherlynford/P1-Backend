package com.example.Project1.Repository;

import com.example.Project1.Entity.StudentProfile;
import java.util.List;  // Use java.util.List instead of org.hibernate.mapping.List
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    List<StudentProfile> findByMajor(String major);  // This should return java.util.List<StudentProfile>
    List<StudentProfile> findByFaculty(String faculty);
}
