package com.example.ticketManagement.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ticketManagement.Entity.SeatCount;

@Repository
public interface SeatCountRepo extends JpaRepository<SeatCount, Integer> {
    List<SeatCount> findByTrainTime_TimeIDAndTrainSeatClass_ClassID(int timeId, int classId);
}


