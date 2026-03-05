package com.example.bookTicket.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookTicket.Request.AvailabilityRequest;
import com.example.bookTicket.Response.AvailabilityTrainDTO;
import com.example.bookTicket.Response.BookingSummaryDTO;
import com.example.bookTicket.Service.AvailabilityService;

@RestController
@RequestMapping("/availability")
public class AvailabilityController {
    @Autowired
    private AvailabilityService availabilityService;

    @PostMapping("/search")
    public ResponseEntity<?> search(@RequestBody AvailabilityRequest req) {
        try {
            List<AvailabilityTrainDTO> list = availabilityService.search(
                req.getLeavingStation(), req.getArrivingStation(), req.getTravelDate(), req.getPassengerCount());
            if (list.isEmpty()) return ResponseEntity.status(204).build();
            return ResponseEntity.ok(list);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/summary")
    public ResponseEntity<?> summary(@RequestParam int trainTimeId, @RequestParam int classId, @RequestParam int passengerCount) {
        try {
            BookingSummaryDTO dto = availabilityService.summary(trainTimeId, classId, passengerCount);
            return ResponseEntity.ok(dto);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}


