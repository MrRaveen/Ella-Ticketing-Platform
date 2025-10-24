package com.example.bookTicket.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.SeatCount;

@Repository
public interface SeatCountRepo extends JpaRepository<SeatCount, Integer>{
	List<SeatCount> findAllByTrainTime_TimeIDAndTrainSeatClass_ClassID(int trainTimeId, int classId);
}
