package com.example.Project1.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Project1.Entity.Person;
import com.example.Project1.Repository.PersonRepository;

import java.security.Key;
import java.util.Optional;

@Service
public class TokenService {

    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    @Autowired
    private PersonRepository personRepository;

    public String generateToken(String email) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create claims with only serializable and necessary information
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("id", person.getId());
        claims.put("email", person.getEmail());
        claims.put("username", person.getUsername());
        claims.put("password", person.getPassword());
        claims.put("role", person.getRole());
        
        // Add only necessary information from profiles (e.g., IDs or roles)
        if (person.getStudentProfile() != null) {
            claims.put("studentProfileId", person.getStudentProfile().getId());
        }
        if (person.getTeacherProfile() != null) {
            claims.put("teacherProfileId", person.getTeacherProfile().getId());
        }

        return Jwts.builder()
                .setClaims(claims)
                .signWith(key)
                .compact();
    }

    public Optional<Person> getPersonFromToken(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Long personId = claims.get("id", Long.class);
        return personRepository.findById(personId);
    }
}
