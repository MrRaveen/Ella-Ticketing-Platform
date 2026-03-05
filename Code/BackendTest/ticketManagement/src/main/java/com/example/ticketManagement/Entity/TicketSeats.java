package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TICKET_SEATS")
public class TicketSeats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "S_ID")
    private Long s_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TICKET_ID", referencedColumnName = "TICKET_ID", nullable = false)
    private BookedTickets bookedTickets;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SEAT_ID", referencedColumnName = "SEAT_ID", nullable = false)
    private SeatInfo seatInfo;

    public Long getS_id() { return s_id; }
    public BookedTickets getBookedTickets() { return bookedTickets; }
    public SeatInfo getSeatInfo() { return seatInfo; }
}


