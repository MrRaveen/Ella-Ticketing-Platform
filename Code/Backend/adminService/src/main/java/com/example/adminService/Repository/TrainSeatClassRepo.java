package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adminService.Entity.TrainSeatClass;

public interface TrainSeatClassRepo extends JpaRepository<TrainSeatClass, Integer> {

}
