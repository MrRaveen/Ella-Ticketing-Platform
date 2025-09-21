package com.example.bookTicket.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookTicket.Request.BookTicketRequest;

@RestController
public class AccessPoint {
	//create a ticket
	@PostMapping("/bookTrain")
	public ResponseEntity<?>bookTrainProcess(@RequestBody BookTicketRequest bookTicketRequest){
		try {
			return ResponseEntity.status(200).body("Data saved");			
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AccessPoint : bookTrainProcess) : " + e.toString());
		}
	}
	@GetMapping("/test")
	public String teString() {
		return "passed";
	}
}
