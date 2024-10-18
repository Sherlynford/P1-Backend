package com.example.Project1.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.Project1.Entity.ManualJobApplication;
import com.example.Project1.Entity.Person;
import com.example.Project1.Repository.PersonRepository;

import java.security.Key;
import java.util.Optional;

@Service
public class TokenService {

    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    @Value("${api.secret-key}")
    private String SECRET_API_KEY;


    @Autowired
    private PersonRepository personRepository;

    public String generateToken(String email) {
        Person person = personRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create claims with only serializable and necessary information
        Claims claims = Jwts.claims().setSubject(email);
        claims.put("id", person.getId());
        claims.put("email", person.getEmail());
        claims.put("role", person.getRole());
        claims.put("admin",person.isAdmin());

        if (person.getStudentProfile() != null) {
            claims.put("studentProfileId", person.getStudentProfile().getId());
            List<Long> manualJobApplicationIds = person.getStudentProfile().getManualJobApplications().stream().map(ManualJobApplication::getId).collect(Collectors.toList());
            claims.put("manualJobApplicationIds", manualJobApplicationIds);
        }
        if (person.getTeacherProfile() != null) {
            claims.put("teacherProfileId", person.getTeacherProfile().getId());
            claims.put("major", person.getTeacherProfile().getMajor());
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

    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token.replace("Bearer ", "")) // Remove 'Bearer ' prefix
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            parseToken(token); // Ensure the token is valid
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean validateApiKey(String apiKey) {
        return SECRET_API_KEY.equals(apiKey);
    }

    public String getRoleFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.get("role", String.class);
    }

    public Long getIdFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.get("id", Long.class);
    }

    public Long getStudentProfileIdFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.get("studentProfileId", Long.class);  // Extract studentProfileId
    }

    public Long getTeacherProfileIdFromToken(String token) {    
        Claims claims = parseToken(token);
        return claims.get("teacherProfileId", Long.class);  // Extract teacherProfileId
    }

    public String getMajorFromToken(String token) {
        Claims claims = parseToken(token);
        return claims.get("major", String.class);
    }

    public String getFacultyFromToken(String token){
        Claims claims = parseToken(token);
        return claims.get("faculty",String.class);
    }

    @SuppressWarnings("unchecked")
    public List<Long> getManualJobApplicationIdsFromToken(String token) {
        Claims claims = parseToken(token);
        
        // Make sure to extract the list as a list of Long values
        List<Integer> applicationIds = claims.get("manualJobApplicationIds", List.class);
        
        // Convert to Long if necessary (JWT may store numbers as Integer)
        return applicationIds.stream().map(Long::valueOf).collect(Collectors.toList());
    }
    
}
