package com.sweetshop.controller;

import com.sweetshop.dto.LoginRequest;
import com.sweetshop.dto.RegisterRequest;
import com.sweetshop.dto.AuthResponse;
import com.sweetshop.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        return userService.register(request);
    }

    @PostMapping("/create-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<AuthResponse> registerAdmin(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(userService.registerAdmin(request));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        AuthResponse authResponse = userService.login(request);

        if (authResponse.getToken() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse.getMessage());
        }
        return ResponseEntity.ok(authResponse);
    }
}