package com.example.ticketManagement.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ticketManagement.Entity.BookedTickets;

@Repository
public interface BookedTicketRepo extends JpaRepository<BookedTickets, Integer> {
    List<BookedTickets> findByUserID_AccountIdAndStatusTrue(int accountId);
    List<BookedTickets> findByUserID_AccountIdAndStatusFalse(int accountId);
}


