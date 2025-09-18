package com.sweetshop.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sweetshop.model.Sweet;
import com.sweetshop.service.SweetService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(SweetController.class)
class SweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private SweetService sweetService;

    private Sweet sweet;

    @BeforeEach
    void setUp() {
        sweet = Sweet.builder()
                .id(1L)
                .name("Gulab Jamun")
                .category("Indian")
                .price(10.0)
                .quantity(50)
                .build();
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void addSweet_shouldReturnOk() throws Exception {
        // Test will fail initially because SweetService mock is not stubbed
        mockMvc.perform(post("/api/sweets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(sweet)))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser(roles = "USER")
    void purchaseSweet_shouldReturnOk() throws Exception {
        mockMvc.perform(post("/api/sweets/1/purchase")
                        .param("quantity", "2")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    void getAllSweets_shouldReturnOk() throws Exception {
        mockMvc.perform(get("/api/sweets")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
