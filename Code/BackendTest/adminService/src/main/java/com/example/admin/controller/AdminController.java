package com.example.admin.controller;

import com.example.admin.dto.TrainRequest;
import com.example.admin.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping("/trains")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addTrain(@RequestBody TrainRequest request) {
        return ResponseEntity.ok(adminService.addTrain(request));
    }

    @PutMapping("/trains/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> updateTrain(@PathVariable Long id, @RequestBody TrainRequest request) {
        return ResponseEntity.ok(adminService.updateTrain(id, request));
    }

    @DeleteMapping("/trains/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteTrain(@PathVariable Long id) {
        adminService.deleteTrain(id);
        return ResponseEntity.ok("Train deleted successfully");
    }

    @GetMapping("/trains")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllTrains() {
        return ResponseEntity.ok(adminService.getAllTrains());
    }

    @GetMapping("/tickets")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllTickets() {
        return ResponseEntity.ok(adminService.getAllTickets());
    }

    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PostMapping("/initialize-data")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> initializeData() {
        adminService.initializeData();
        return ResponseEntity.ok("Data initialized successfully");
    }
}