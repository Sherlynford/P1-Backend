package com.example.Project1.Repository;

import com.example.Project1.Entity.ConfirmJobApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmJobApplicationRepository extends JpaRepository<ConfirmJobApplication, Long>  {
    
}
