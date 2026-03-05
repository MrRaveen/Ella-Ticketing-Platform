package com.example.userService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.userService.Model.UserAcc;
import com.example.userService.Repositories.UserAccRepo;
import com.example.userService.Response.BookedTicketResponse;
import com.example.userService.Service.CancelTicket;
import com.example.userService.Service.GetAllTicketInfo;

import io.jsonwebtoken.Claims;

@RestController
public class MainRoutes {
	@Autowired
	private GetAllTicketInfo allTicketInfo;
	@Autowired
	private UserAccRepo accRepoAcc;
	@Autowired
	private CancelTicket cancelTicket;
	@GetMapping("/getAllTicketInfo")
    public ResponseEntity<?>getAllTicketInfo(@RequestAttribute("claims") Claims claims){
    	try {
    		String userEmailString = claims.getSubject();
    		UserAcc userOptional = accRepoAcc.findByEmail(userEmailString)
    				.orElseThrow(() -> new RuntimeException("User data is null"));
    		List<BookedTicketResponse> outputDataBookedTicketResponses = allTicketInfo.getProcess(userOptional.getAccountId(),false);
			return ResponseEntity.status(200).body(outputDataBookedTicketResponses);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured in controller (AccessPoint) : " + e.toString());
		}
    }
	@PutMapping("/cancelTicket")
	public ResponseEntity<?> cancelTicket(@RequestParam int ticketID) {
	    try {
	        boolean result = cancelTicket.cancelTicketByID(ticketID);
	        if (result) {
	            return ResponseEntity.ok().body("Ticket ID " + ticketID + " was successfully cancelled.");
	        } else {
	            return ResponseEntity.status(400).body("Failed to cancel ticket ID " + ticketID + ".");
	        }
	    } catch (Exception e) {
	        return ResponseEntity.status(500)
	                .body("Error occurred while cancelling the ticket: " + e.getMessage());
	    }
	}
	@GetMapping("/getCancelledTickets")
    public ResponseEntity<?>getCancelledTickets(@RequestAttribute("claims") Claims claims){
    	try {
    		String userEmailString = claims.getSubject();
    		UserAcc userOptional = accRepoAcc.findByEmail(userEmailString)
    				.orElseThrow(() -> new RuntimeException("User data is null"));
    		List<BookedTicketResponse> outputDataBookedTicketResponses = allTicketInfo.getProcess(userOptional.getAccountId(),
    				true);
			return ResponseEntity.status(200).body(outputDataBookedTicketResponses);
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured in controller (AccessPoint) : " + e.toString());
		}
    }
}
