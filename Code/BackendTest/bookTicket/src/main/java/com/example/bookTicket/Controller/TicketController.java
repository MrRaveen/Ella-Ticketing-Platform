package com.example.bookTicket.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bookTicket.Entity.BookedTickets;
import com.example.bookTicket.Repository.BookedTicketRepo;

@RestController
@RequestMapping("/tickets")
public class TicketController {
    @Autowired
    private BookedTicketRepo bookedTicketRepo;

    @GetMapping("/my")
    public ResponseEntity<?> myTickets(@RequestParam int userAccId) {
        try {
            List<BookedTickets> all = bookedTicketRepo.findAll();
            return ResponseEntity.ok(all.stream().filter(t -> t.getUserID().getAccountId() == userAccId).toList());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}


