package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookTicket.Entity.Trains;

public interface TrainsRepo extends JpaRepository<Trains, Integer> {

}
