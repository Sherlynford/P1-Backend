package com.example.Project1.Service;

import com.example.Project1.Entity.TeacherProfile;
import com.example.Project1.Repository.TeacherProfileRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TeacherProfileService {

    private final TeacherProfileRepository teacherProfileRepository;

    public TeacherProfile createTeacherProfile(TeacherProfile teacherProfile) {
        return teacherProfileRepository.save(teacherProfile);
    }

    public List<TeacherProfile> getAllTeacherProfiles() {
        return teacherProfileRepository.findAll();
    }

    public Optional<TeacherProfile> getTeacherProfileById(Long id) {
        return teacherProfileRepository.findById(id);
    }

    public TeacherProfile updateTeacherProfile(TeacherProfile newTeacherProfile, Long id) {
        return teacherProfileRepository.findById(id)
                .map(teacherProfile -> {
                    teacherProfile.setFirstName(newTeacherProfile.getFirstName());
                    teacherProfile.setLastName(newTeacherProfile.getLastName());
                    teacherProfile.setEmail(newTeacherProfile.getEmail());
                    teacherProfile.setPhoneNumber(newTeacherProfile.getPhoneNumber());
                    teacherProfile.setFaculty(newTeacherProfile.getFaculty());
                    teacherProfile.setMajor(newTeacherProfile.getMajor());
                    teacherProfile.setTeacherID(newTeacherProfile.getTeacherID());
                    teacherProfile.setProfileIMG(newTeacherProfile.getProfileIMG());
                    return teacherProfileRepository.save(teacherProfile);
                })
                .orElseGet(() -> {
                    newTeacherProfile.setId(id);
                    return teacherProfileRepository.save(newTeacherProfile);
                });
    }

    public void deleteTeacherProfile(Long id) {
        teacherProfileRepository.deleteById(id);
    }
}
