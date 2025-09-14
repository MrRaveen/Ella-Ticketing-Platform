package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adminService.Entity.SeatCount;

public interface SeatCountRepo extends JpaRepository<SeatCount, Integer> {

}
