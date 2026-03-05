package com.example.userService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.TrainTime;
@Repository
public interface TrainTimeRepo extends JpaRepository<TrainTime, Integer> {

}
