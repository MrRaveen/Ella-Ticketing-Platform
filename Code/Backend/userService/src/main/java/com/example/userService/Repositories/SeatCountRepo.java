package com.example.userService.Repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.SeatCount;
import com.example.userService.Model.TrainSeatClass;
import com.example.userService.Model.TrainTime;

@Repository
public interface SeatCountRepo extends JpaRepository<SeatCount, Integer> {
    Optional<SeatCount> findByTrainTimeAndTrainSeatClass(TrainTime trainTime, TrainSeatClass trainSeatClass);
}