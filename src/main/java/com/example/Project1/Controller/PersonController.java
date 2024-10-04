package com.example.Project1.Controller;

import com.example.Project1.Entity.Person;
import com.example.Project1.Service.PersonService;
import com.example.Project1.Service.TokenService;
import com.example.Project1.Service.AuthenticationService;

import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/persons")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;
    private final AuthenticationService authenticationService;
    private final TokenService tokenService;

    @PostMapping("/")
    public ResponseEntity<Person> createPerson(@RequestBody Person person) {
        Person newPerson = personService.createPerson(person);
        return new ResponseEntity<>(newPerson, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Person>> getAllPersons(@RequestHeader("Authorization") String token) {
        if (!tokenService.validateToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        List<Person> persons = personService.getAllPersons();
        return new ResponseEntity<>(persons, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Person> getPersonById(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        if (!tokenService.validateToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Optional<Person> person = personService.getPersonById(id);
        return person.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Person> updatePerson(@PathVariable Long id, @RequestBody Person newPerson, @RequestHeader("Authorization") String token) {
        if (!tokenService.validateToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Person updatedPerson = personService.updatePerson(newPerson, id);
        return new ResponseEntity<>(updatedPerson, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePerson(@PathVariable Long id, @RequestHeader("Authorization") String token) {
        if (!tokenService.validateToken(token)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        personService.deletePerson(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Person person) {
        if (authenticationService.authenticate(person.getEmail(), person.getPassword())) {
            String token = tokenService.generateToken(person.getEmail());

            // Fetch the user by email to get their role
            Person authenticatedPerson = personService.getPersonByEmail(person.getEmail());

            // Return both the token and the role
            return ResponseEntity.ok(Map.of(
                "token", token,
                "role", authenticatedPerson.getRole() // Include role in the response
            ));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
