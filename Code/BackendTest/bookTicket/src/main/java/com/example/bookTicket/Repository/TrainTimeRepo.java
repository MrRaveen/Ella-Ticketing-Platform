package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.TrainTime;
import java.time.LocalDate;
import java.util.List;
@Repository
public interface TrainTimeRepo extends JpaRepository<TrainTime, Integer> {
    List<TrainTime> findByDateOfTrain(LocalDate dateOfTrain);
}
