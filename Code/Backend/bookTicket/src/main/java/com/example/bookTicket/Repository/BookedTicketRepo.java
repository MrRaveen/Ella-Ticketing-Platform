package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.BookedTickets;
@Repository
public interface BookedTicketRepo extends JpaRepository<BookedTickets, Integer> {

}
