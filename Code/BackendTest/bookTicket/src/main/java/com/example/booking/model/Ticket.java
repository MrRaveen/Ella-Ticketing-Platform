package com.example.booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "TICKETS")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String ticketNumber;
    
    @Column(nullable = false)
    private Long userId;
    
    @ManyToOne
    @JoinColumn(name = "train_id", nullable = false)
    private Train train;
    
    @ManyToOne
    @JoinColumn(name = "seat_id", nullable = false)
    private Seat seat;
    
    @Column(nullable = false)
    private Double price;
    
    @Column(nullable = false)
    private LocalDateTime bookingTime;
    
    @Enumerated(EnumType.STRING)
    private TicketStatus status;
    
    public enum TicketStatus {
        BOOKED, CANCELLED, COMPLETED
    }
}