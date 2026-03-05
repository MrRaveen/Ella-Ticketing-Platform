package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.TicketSeats;

@Repository
public interface TicketSeatsRepo extends JpaRepository<TicketSeats, Long> {
}


