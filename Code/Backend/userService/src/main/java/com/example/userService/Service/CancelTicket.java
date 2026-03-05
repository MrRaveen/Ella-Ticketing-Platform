package com.example.userService.Service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.userService.Model.BookedTickets;
import com.example.userService.Model.SeatCount;
import com.example.userService.Model.SeatInfo;
import com.example.userService.Model.TicketSeats;
import com.example.userService.Model.TrainSeatClass;
import com.example.userService.Model.TrainTime;
import com.example.userService.Repositories.BookedTicketsRepo;
import com.example.userService.Repositories.SeatCountRepo;
import com.example.userService.Repositories.TicketSeatRepo;

@Service
public class CancelTicket {
    
	@Autowired
	private BookedTicketsRepo bookedTicketsRepo;
    
	@Autowired
	private TicketSeatRepo ticketSeatRepo;
    
	@Autowired
	private SeatCountRepo seatCountRepo;

	@Transactional(rollbackFor = Exception.class)
	public boolean cancelTicketByID(int ticketID) throws Exception {
		try {
			BookedTickets ticket = bookedTicketsRepo.findById(ticketID)
	                .orElseThrow(() -> new RuntimeException("Ticket ID " + ticketID + " not found"));
	        
	        ticket.setStatus(false);
	        
	        List<TicketSeats> allTicketSeats = ticketSeatRepo.findByBookedTickets_TicketID(ticketID);
	        
            // Note: Use .size() for Java Lists
	        int seatsNeedToAdd = allTicketSeats.size();
			TrainSeatClass trainSeatClass = ticket.getTrainSeatClass();
			TrainTime trainTime = ticket.getTrainTime();
			
			// Logic to update the seat count
			SeatCount seatCount = seatCountRepo.findByTrainTimeAndTrainSeatClass(trainTime, trainSeatClass)
			        .orElseThrow(() -> new RuntimeException("Seat count record not found"));
			
            // Add the cancelled seats back to the remaining count
			seatCount.setSeatRemainingCount(seatCount.getSeatRemainingCount() + seatsNeedToAdd);
	        
	        allTicketSeats.forEach(ticketSeat -> {
	        	SeatInfo seatInfo = ticketSeat.getSeatInfo();
	        	if (seatInfo != null) {
	        		seatInfo.setExpieryStat(true);
	        	}
	        });
	        bookedTicketsRepo.save(ticket);
	        return true;
		} catch (Exception e) {
			throw new Exception("Error occurred when cancelling ticket: " + e.toString());
		}
	}
}