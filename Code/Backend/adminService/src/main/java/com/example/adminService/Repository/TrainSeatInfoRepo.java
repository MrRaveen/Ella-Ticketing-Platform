package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adminService.Entity.TrainSeatInfo;

public interface TrainSeatInfoRepo extends JpaRepository<TrainSeatInfo, Integer> {

}
