package com.example.Project1.Service;

import com.example.Project1.Entity.Blog;
import com.example.Project1.Repository.BlogRepository;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogRepository;
    
    public Blog createBlog(Blog blog) {
        blog.setDateTime(LocalDateTime.now());
        return blogRepository.save(blog);
    }

    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    public Optional<Blog> getBlogById(Long id) {
        return blogRepository.findById(id);
    }

    public Blog updateBlog(Blog newBlog, Long id) {
        return blogRepository.findById(id)
                .map(blog -> {
                    blog.setTopic(newBlog.getTopic());
                    blog.setDetail(newBlog.getDetail());
                    blog.setImg(newBlog.getImg());
                    blog.setDateTime(LocalDateTime.now());
                    blog.setLink(newBlog.getLink());
                    blog.setOrganizationName(newBlog.getOrganizationName());
                    blog.setUsername(newBlog.getUsername());
                    blog.setLocation(newBlog.getLocation());
                    return blogRepository.save(blog);
                })
                .orElseGet(() -> {
                    newBlog.setId(id);
                    return blogRepository.save(newBlog);
                });
    }

    public void deleteBlog(Long id) {
        blogRepository.deleteById(id);
    }
}
