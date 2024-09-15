package com.example.Project1.Service;

import com.example.Project1.Entity.StudentProfile;
import com.example.Project1.Repository.StudentProfileRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentProfileService {

    private final StudentProfileRepository studentProfileRepository;

    public StudentProfile createStudentProfile(StudentProfile studentProfile) {
        return studentProfileRepository.save(studentProfile);
    }

    public List<StudentProfile> getAllStudentProfiles() {
        return studentProfileRepository.findAll();
    }

    public Optional<StudentProfile> getStudentProfileById(Long id) {
        return studentProfileRepository.findById(id);
    }

    public StudentProfile updateStudentProfile(StudentProfile newStudentProfile, Long id) {
        return studentProfileRepository.findById(id)
                .map(studentProfile -> {
                    studentProfile.setFirstName(newStudentProfile.getFirstName());
                    studentProfile.setLastName(newStudentProfile.getLastName());
                    studentProfile.setFaculty(newStudentProfile.getFaculty());
                    studentProfile.setMajor(newStudentProfile.getMajor());
                    studentProfile.setStudentID(newStudentProfile.getStudentID());
                    studentProfile.setPhoneNumber(newStudentProfile.getPhoneNumber());
                    studentProfile.setInternStartDate(newStudentProfile.getInternStartDate());
                    studentProfile.setInternEndDate(newStudentProfile.getInternEndDate());
                    studentProfile.setCV(newStudentProfile.getCV());
                    studentProfile.setTranscript(newStudentProfile.getTranscript());
                    studentProfile.setProfileIMG(newStudentProfile.getProfileIMG());
                    return studentProfileRepository.save(studentProfile);
                })
                .orElseGet(() -> {
                    newStudentProfile.setId(id);
                    return studentProfileRepository.save(newStudentProfile);
                });
    }

    public void deleteStudentProfile(Long id) {
        studentProfileRepository.deleteById(id);
    }
}
