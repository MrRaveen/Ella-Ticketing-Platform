package com.example.userService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.SeatInfo;
@Repository
public interface SeatInfoRepo extends JpaRepository<SeatInfo, Integer> {

}
