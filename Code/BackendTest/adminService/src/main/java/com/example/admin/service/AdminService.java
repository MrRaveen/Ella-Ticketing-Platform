package com.example.admin.service;

import com.example.admin.dto.TrainRequest;
import com.example.admin.feign.BookingServiceClient;
import com.example.admin.feign.UserServiceClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final BookingServiceClient bookingServiceClient;
    private final UserServiceClient userServiceClient;

    public Object addTrain(TrainRequest request) {
        return bookingServiceClient.addTrain(request);
    }

    public Object updateTrain(Long id, TrainRequest request) {
        return bookingServiceClient.updateTrain(id, request);
    }

    public void deleteTrain(Long id) {
        bookingServiceClient.deleteTrain(id);
    }

    public List<?> getAllTrains() {
        return bookingServiceClient.getAllTrains();
    }

    public List<?> getAllTickets() {
        return bookingServiceClient.getAllTickets();
    }

    public List<?> getAllUsers() {
        return userServiceClient.getAllUsers();
    }

    public void initializeData() {
        // Create sample trains
        createSampleTrains();
        
        // Create admin user if not exists
        createAdminUser();
    }

    private void createSampleTrains() {
        // Sample train 1: Colombo to Kandy
        TrainRequest train1 = TrainRequest.builder()
                .trainNumber("TR-001")
                .name("Colombo Express")
                .source("Colombo")
                .destination("Kandy")
                .departureTime(LocalDateTime.now().plusDays(1).withHour(8).withMinute(0))
                .arrivalTime(LocalDateTime.now().plusDays(1).withHour(11).withMinute(30))
                .totalSeats(120)
                .basePrice(1500.0)
                .build();
        
        // Sample train 2: Colombo to Galle
        TrainRequest train2 = TrainRequest.builder()
                .trainNumber("TR-002")
                .name("Coastal Line")
                .source("Colombo")
                .destination("Galle")
                .departureTime(LocalDateTime.now().plusDays(1).withHour(9).withMinute(30))
                .arrivalTime(LocalDateTime.now().plusDays(1).withHour(12).withMinute(0))
                .totalSeats(100)
                .basePrice(1200.0)
                .build();
        
        // Sample train 3: Kandy to Ella
        TrainRequest train3 = TrainRequest.builder()
                .trainNumber("TR-003")
                .name("Hill Country")
                .source("Kandy")
                .destination("Ella")
                .departureTime(LocalDateTime.now().plusDays(1).withHour(10).withMinute(0))
                .arrivalTime(LocalDateTime.now().plusDays(1).withHour(14).withMinute(30))
                .totalSeats(80)
                .basePrice(1800.0)
                .build();
        
        bookingServiceClient.addTrain(train1);
        bookingServiceClient.addTrain(train2);
        bookingServiceClient.addTrain(train3);
    }

    private void createAdminUser() {
        Map<String, Object> adminUser = Map.of(
                "username", "admin",
                "password", "admin123",
                "email", "admin@ellaticket.com",
                "fullName", "System Administrator",
                "phoneNumber", "0771234567",
                "role", "ADMIN"
        );
        
        userServiceClient.createAdminUser(adminUser);
    }
}