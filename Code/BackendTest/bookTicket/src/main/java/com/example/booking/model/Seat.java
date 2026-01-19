package com.example.booking.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "SEATS")
public class Seat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String seatNumber;
    
    @Column(nullable = false)
    private SeatType seatType;
    
    @Column(nullable = false)
    private boolean isAvailable = true;
    
    @ManyToOne
    @JoinColumn(name = "train_id", nullable = false)
    private Train train;
    
    public enum SeatType {
        ECONOMY, BUSINESS, FIRST_CLASS
    }
}