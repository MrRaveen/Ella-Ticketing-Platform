package com.example.bookTicket.Service;

import org.springframework.stereotype.Service;

import com.example.bookTicket.Request.BookTicketRequest;
@Service
public class BookTicketProcess {
	public boolean bookingProcess(BookTicketRequest bookTicketRequest) throws Exception {
		try {
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured (BookTicketProcess : bookingProcess) : " + e.toString());
		}
	}
}
