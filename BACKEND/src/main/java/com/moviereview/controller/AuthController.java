package com.moviereview.controller;

import com.moviereview.dto.AuthResponse;
import com.moviereview.dto.LoginRequest;
import com.moviereview.dto.RegisterRequest;
import com.moviereview.entity.User;
import com.moviereview.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Controller handling user authentication: Register & Login.
 */
@RestController
@CrossOrigin(origins = "*") // Allows cross-origin requests from any frontend port/origin
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * POST /register and POST /api/register
     * Registers a new user.
     */
    @PostMapping({"/register", "/api/register"})
    public ResponseEntity<AuthResponse> registerUser(@Valid @RequestBody RegisterRequest request) {
        User registeredUser = userService.registerUser(request);

        AuthResponse.UserData userData = new AuthResponse.UserData(
                registeredUser.getId(),
                registeredUser.getName(),
                registeredUser.getEmail()
        );

        AuthResponse response = new AuthResponse(
                true,
                "Registration successful! You can now log in.",
                userData
        );

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    /**
     * POST /login and POST /api/login
     * Authenticates existing user.
     */
    @PostMapping({"/login", "/api/login"})
    public ResponseEntity<AuthResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        User user = userService.loginUser(request);

        AuthResponse.UserData userData = new AuthResponse.UserData(
                user.getId(),
                user.getName(),
                user.getEmail()
        );

        AuthResponse response = new AuthResponse(
                true,
                "Login successful! Welcome back, " + user.getName(),
                userData
        );

        return ResponseEntity.ok(response);
    }
}
