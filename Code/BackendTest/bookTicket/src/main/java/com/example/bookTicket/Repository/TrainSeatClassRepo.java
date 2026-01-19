package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.TrainSeatClass;
@Repository
public interface TrainSeatClassRepo extends JpaRepository<TrainSeatClass, Integer>{

}
