package com.example.booking.controller;

import com.example.booking.dto.BookingRequest;
import com.example.booking.dto.BookingResponse;
import com.example.booking.dto.PaymentRequest;
import com.example.booking.model.Payment;
import com.example.booking.model.Seat;
import com.example.booking.model.Train;
import com.example.booking.service.BookingService;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/booking")
@RequiredArgsConstructor
public class BookingController {
    private final BookingService bookingService;
    private final Bucket bucket;

    // Rate limiting configuration
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
        Bandwidth limit = Bandwidth.classic(20, Refill.greedy(20, Duration.ofMinutes(1)));
        this.bucket = Bucket.builder().addLimit(limit).build();
    }

    @GetMapping("/trains")
    public ResponseEntity<?> searchTrains(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam String departureDate) {
        
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded");
        }
        
        LocalDateTime date = LocalDateTime.parse(departureDate, DateTimeFormatter.ISO_DATE_TIME);
        List<Train> trains = bookingService.searchTrains(source, destination, date);
        return ResponseEntity.ok(trains);
    }

    @GetMapping("/trains/{trainId}/seats")
    public ResponseEntity<?> getAvailableSeats(@PathVariable Long trainId) {
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded");
        }
        
        List<Seat> seats = bookingService.getAvailableSeats(trainId);
        return ResponseEntity.ok(seats);
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookTicket(@RequestBody BookingRequest request) {
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded");
        }
        
        try {
            BookingResponse response = bookingService.bookTicket(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/payment")
    public ResponseEntity<?> processPayment(@RequestBody PaymentRequest request) {
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded");
        }
        
        try {
            Payment payment = bookingService.processPayment(request);
            return ResponseEntity.ok(payment);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/cancel/{ticketNumber}")
    public ResponseEntity<?> cancelTicket(@PathVariable String ticketNumber) {
        if (!bucket.tryConsume(1)) {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("Rate limit exceeded");
        }
        
        try {
            bookingService.cancelTicket(ticketNumber);
            return ResponseEntity.ok("Ticket cancelled successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}