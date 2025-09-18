package com.sweetshop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sweetshop.dto.RegisterRequest;
import com.sweetshop.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private UserService userService;

    private RegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        registerRequest = new RegisterRequest();
        registerRequest.setPassword("password123");
        registerRequest.setEmail("john@example.com");
    }

    @Test
    void shouldRegisterUserSuccessfully() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerRequest))).andExpect(status().isOk());
    }

    @Test
    void shouldFailLoginWithInvalidCredentials() throws Exception {
        Mockito.when(userService.login(Mockito.any())).thenReturn(new com.sweetshop.dto.AuthResponse(null, "Invalid credentials"));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new com.sweetshop.dto.LoginRequest("wronguser", "wrongpass")
                        )))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void shouldLoginSuccessfully() throws Exception {
        Mockito.when(userService.login(Mockito.any()))
                .thenReturn(new com.sweetshop.dto.AuthResponse("valid-jwt-token", null));

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(
                                new com.sweetshop.dto.LoginRequest("john_doe", "password123")
                        )))
                .andExpect(status().isOk());
    }

}
