package com.example.ticketManagement.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ticketManagement.Entity.TicketSeats;

@Repository
public interface TicketSeatsRepo extends JpaRepository<TicketSeats, Long> {
    List<TicketSeats> findByBookedTickets_TicketID(int ticketId);
}


