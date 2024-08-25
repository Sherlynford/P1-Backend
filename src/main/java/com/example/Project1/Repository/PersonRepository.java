package com.example.Project1.Repository;

import com.example.Project1.Entity.Person;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;


@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByUsernameAndPassword(String username, String password);

    Optional<Person> findByEmail(String email);
    Optional<Person> findByRole(String role);
}
