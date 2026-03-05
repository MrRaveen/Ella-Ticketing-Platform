package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.bookTicket.Entity.TicketSeats;

public interface TicketSeatsRepo extends JpaRepository<TicketSeats, Integer> {

}
