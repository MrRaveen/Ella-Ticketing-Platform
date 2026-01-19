package com.example.booking.repository;

import com.example.booking.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {
    List<Train> findBySourceAndDestinationAndDepartureTimeBetween(
            String source, String destination, LocalDateTime start, LocalDateTime end);
    
    List<Train> findByTrainNumber(String trainNumber);
}