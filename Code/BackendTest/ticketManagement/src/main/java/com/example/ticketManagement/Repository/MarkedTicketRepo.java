package com.example.ticketManagement.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.ticketManagement.Entity.MarkedTicket;

@Repository
public interface MarkedTicketRepo extends JpaRepository<MarkedTicket, Long> {
    List<MarkedTicket> findByAccountId(int accountId);
    void deleteByMarkIdAndAccountId(Long markId, int accountId);
}


