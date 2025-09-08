package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adminService.Entity.TrainClass;
import com.example.adminService.Entity.TrainInfo;

@Repository
public interface TrainInfoRepo extends JpaRepository<TrainInfo, Integer> {

}
