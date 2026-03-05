package com.example.bookTicket.Controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookTicket.Entity.UserAcc;
import com.example.bookTicket.Repository.UserAccRepo;
import com.example.bookTicket.Request.BookTicketRequest;
import com.example.bookTicket.Request.TicketSearchRequest;
import com.example.bookTicket.Request.TrainSearchResponse;
import com.example.bookTicket.Service.BookTicketProcess;
import com.example.bookTicket.Service.GetTrainData;

import io.jsonwebtoken.Claims;

@RestController
public class AccessPoint {
	@Autowired
	private BookTicketProcess bookTicketProcess;
	@Autowired
	private UserAccRepo userAccRepo;
	@Autowired
	private GetTrainData data;
	//create a ticket
	@PostMapping("/bookTrain")
	public ResponseEntity<?>bookTrainProcess(@RequestAttribute("claims") Claims claims,@RequestBody BookTicketRequest bookTicketRequest){
		try {
			String email = claims.getSubject();
			Optional<UserAcc> obj = userAccRepo.findByEmail(email);
			int userIDString = obj.get().getAccountId();
			bookTicketRequest.setUserAccId(userIDString);
			System.out.println("ID user: " + userIDString);
			if (bookTicketProcess.bookingProcess(bookTicketRequest)) {
				return ResponseEntity.status(200).body("Data saved");	
			}else {
				return ResponseEntity.status(401).body("Data not saved");		
			}		
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AccessPoint : bookTrainProcess) : " + e.toString());
		}
	}
	//get train info
	@GetMapping("/getTrainInfo")
	public ResponseEntity<?>getTrainInfo(@RequestBody TicketSearchRequest requestData){
		try {
			TrainSearchResponse res = data.getProcess(requestData);
			return ResponseEntity.status(200).body(res); 
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AccessPoint : bookTrainProcess) : " + e.toString());
		}
	}
	@GetMapping("/test")
	public String teString() {
		return "passed";
	}
}
