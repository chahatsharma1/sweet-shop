package com.sweetshop.service;

import com.sweetshop.dto.LoginRequest;
import com.sweetshop.dto.RegisterRequest;
import com.sweetshop.dto.AuthResponse;
import com.sweetshop.model.Role;
import com.sweetshop.model.User;
import com.sweetshop.repository.UserRepository;
import com.sweetshop.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public ResponseEntity<?> register(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email is already taken.");
        }

        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();

        userRepository.save(user);

        AuthResponse response = new AuthResponse("User registered successfully", null);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Admin Registration (only for admins)
    public AuthResponse registerAdmin(RegisterRequest request) {
        Optional<User> existingUser = userRepository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return new AuthResponse("Email already taken", null);
        }

        User admin = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ADMIN)
                .build();

        userRepository.save(admin);

        return new AuthResponse("Admin registered successfully", null);
    }

    public AuthResponse login(LoginRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) {
            return new AuthResponse("Invalid email or password", null);
        }

        User user = userOpt.get();
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse("Invalid email or password", null);
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return new AuthResponse("Login Successfully", token);
    }
}