package com.example.Project1.Service;

import java.util.Optional;
import org.springframework.stereotype.Service;
import com.example.Project1.Entity.Person;
import com.example.Project1.Repository.PersonRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final PersonRepository personRepository;

    public boolean authenticate(String email, String password) {

        Optional<Person> person = personRepository.findByEmail(email);

    if (person.isEmpty() || !person.get().getPassword().equals(password)) {
        return false ;
        
    }
        return true;
    }
}