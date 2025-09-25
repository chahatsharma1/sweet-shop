package com.sweetshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SweetShopApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SweetShopApplication.class);

        System.out.println("===== Database Environment Variables =====");
        System.out.println("DB_URL: " + System.getenv("DB_URL"));
        System.out.println("DB_USERNAME: " + System.getenv("DB_USERNAME"));
        System.out.println("DB_PASSWORD: " + (System.getenv("DB_PASSWORD") != null ? "<SET>" : "<NULL>"));
        System.out.println("SPRING_PROFILES_ACTIVE: " + System.getenv("SPRING_PROFILES_ACTIVE"));
        System.out.println("========================================");

        app.run(args);
    }
}