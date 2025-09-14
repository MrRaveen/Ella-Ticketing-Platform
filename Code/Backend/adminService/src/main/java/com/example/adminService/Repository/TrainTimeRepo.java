package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adminService.Entity.TrainTime;

public interface TrainTimeRepo extends JpaRepository<TrainTime,Integer> {

}
