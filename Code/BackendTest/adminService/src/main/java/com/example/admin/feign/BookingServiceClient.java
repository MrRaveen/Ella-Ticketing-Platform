package com.example.admin.feign;

import com.example.admin.dto.TrainRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "BOOKING-SERVICE")
public interface BookingServiceClient {
    
    @PostMapping("/api/trains")
    Object addTrain(@RequestBody TrainRequest trainRequest);
    
    @PutMapping("/api/trains/{id}")
    Object updateTrain(@PathVariable Long id, @RequestBody TrainRequest trainRequest);
    
    @DeleteMapping("/api/trains/{id}")
    void deleteTrain(@PathVariable Long id);
    
    @GetMapping("/api/trains")
    List<?> getAllTrains();
    
    @GetMapping("/api/tickets")
    List<?> getAllTickets();
}