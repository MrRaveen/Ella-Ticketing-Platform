package com.example.adminService.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
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
	public TicketSeats() {
	}
	public TicketSeats(BookedTickets bookedTickets, SeatInfo seatInfo) {
		super();
		this.bookedTickets = bookedTickets;
		this.seatInfo = seatInfo;
	}
	public Long getS_id() {
		return s_id;
	}
	public void setS_id(Long s_id) {
		this.s_id = s_id;
	}
	public BookedTickets getBookedTickets() {
		return bookedTickets;
	}
	public void setBookedTickets(BookedTickets bookedTickets) {
		this.bookedTickets = bookedTickets;
	}
	public SeatInfo getSeatInfo() {
		return seatInfo;
	}
	public void setSeatInfo(SeatInfo seatInfo) {
		this.seatInfo = seatInfo;
	}
}
