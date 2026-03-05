package com.example.userService.Repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.userService.Model.TicketSeats;

@Repository
public interface TicketSeatRepo extends JpaRepository<TicketSeats, Long> {

    List<TicketSeats> findByBookedTickets_TicketID(int ticketID);

}