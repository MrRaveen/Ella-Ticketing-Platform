package com.example.adminService.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adminService.Entity.TrainInfo;
import com.example.adminService.Entity.TrainSeatInfo;

public interface TrainSeatInfoRepo extends JpaRepository<TrainSeatInfo, Integer> {
	List<TrainSeatInfo> findByTrainInfo_TrainId(int trainId);
}
