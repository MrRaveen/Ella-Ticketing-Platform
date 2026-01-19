package com.example.admin.config;

import com.example.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final AdminService adminService;

    @Bean
    @Profile("!test")
    public CommandLineRunner initData() {
        return args -> {
            log.info("Initializing sample data...");
            try {
                adminService.initializeData();
                log.info("Sample data initialization completed successfully");
            } catch (Exception e) {
                log.error("Error initializing sample data: {}", e.getMessage(), e);
            }
        };
    }
}