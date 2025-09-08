package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adminService.Entity.AssignedRoles;
import com.example.adminService.Entity.TrainClass;

@Repository
public interface TrainClassRepo extends JpaRepository<TrainClass, Integer> {
	
}
