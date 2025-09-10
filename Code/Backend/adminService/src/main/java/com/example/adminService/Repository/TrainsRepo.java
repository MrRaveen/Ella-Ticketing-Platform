package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adminService.Entity.Trains;

@Repository
public interface TrainsRepo extends JpaRepository<Trains, Integer> {
	
}
