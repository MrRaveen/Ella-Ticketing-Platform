package com.example.bookTicket.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AccessPoint {
	@GetMapping("/test")
	public String teString() {
		return "passed";
	}
}
