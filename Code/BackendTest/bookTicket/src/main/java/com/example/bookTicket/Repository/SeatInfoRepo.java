package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.SeatInfo;
@Repository
public interface SeatInfoRepo extends JpaRepository<SeatInfo, Integer> {
	 SeatInfo findTopByOrderBySeatIDDesc();
}
