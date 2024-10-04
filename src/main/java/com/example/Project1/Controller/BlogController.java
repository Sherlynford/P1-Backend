package com.example.Project1.Controller;

import com.example.Project1.Entity.Blog;
import com.example.Project1.Service.BlogService;
import com.example.Project1.Service.FileStorageService;

import io.jsonwebtoken.io.IOException;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/blogs")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;
    private final FileStorageService fileStorageService;

    @PostMapping("/")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        Blog newBlog = blogService.createBlog(blog);
        return new ResponseEntity<>(newBlog, HttpStatus.CREATED);
    }
    @PostMapping("/upload")
    public ResponseEntity<Map<String, List<String>>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<String> fileUrls = new ArrayList<>();
        Map<String, List<String>> response = new HashMap<>();
        
        try {
            for (MultipartFile file : files) {
                String fileUrl = fileStorageService.storeFile(file);
                fileUrls.add(fileUrl);
            }
            response.put("fileUrls", fileUrls);
            return ResponseEntity.ok(response);
        } catch (IOException | java.io.IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", List.of("Failed to upload files: " + e.getMessage())));
        }
    }


    @GetMapping("/")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return new ResponseEntity<>(blogs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable Long id) {
        Optional<Blog> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable Long id, @RequestBody Blog newBlog) {
        Blog updatedBlog = blogService.updateBlog(newBlog, id);
        return new ResponseEntity<>(updatedBlog, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable Long id) {
        blogService.deleteBlog(id);
        return ResponseEntity.noContent().build();
    }
}
