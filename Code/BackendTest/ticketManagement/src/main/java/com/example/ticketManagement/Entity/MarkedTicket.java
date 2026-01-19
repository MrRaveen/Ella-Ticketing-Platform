package com.example.ticketManagement.Entity;

import java.time.LocalDateTime;
import jakarta.persistence.*;

@Entity
@Table(name = "MARKED_TICKETS")
public class MarkedTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MARK_ID")
    private Long markId;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TICKET_ID", referencedColumnName = "TICKET_ID", nullable = false)
    private BookedTickets ticket;
    @Column(name = "ACCOUNTID", nullable = false)
    private int accountId;
    @Column(name = "CREATED_AT")
    private LocalDateTime createdAt;

    public Long getMarkId() { return markId; }
    public BookedTickets getTicket() { return ticket; }
    public int getAccountId() { return accountId; }
}


