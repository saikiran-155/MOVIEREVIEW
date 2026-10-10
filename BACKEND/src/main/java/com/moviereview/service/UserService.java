package com.moviereview.service;

import com.moviereview.dto.LoginRequest;
import com.moviereview.dto.RegisterRequest;
import com.moviereview.entity.User;
import com.moviereview.exception.ResourceNotFoundException;
import com.moviereview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Service class handling user business logic: Registration & Login.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Registers a new user after verifying that the email is not already taken.
     */
    public User registerUser(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase())) {
            throw new IllegalArgumentException("Email is already registered! Please log in.");
        }

        User newUser = new User();
        newUser.setName(request.getName().trim());
        newUser.setEmail(request.getEmail().trim().toLowerCase());
        newUser.setPassword(request.getPassword().trim()); // Beginner-friendly basic authentication

        return userRepository.save(newUser);
    }

    /**
     * Authenticates a user by email and password.
     */
    public User loginUser(LoginRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        String password = request.getPassword().trim();

        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            throw new ResourceNotFoundException("No user found with email: " + email);
        }

        User user = userOptional.get();

        // Compare password
        if (!user.getPassword().equals(password)) {
            throw new IllegalArgumentException("Invalid password! Please try again.");
        }

        return user;
    }

    /**
     * Finds a user by ID.
     */
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }
}
