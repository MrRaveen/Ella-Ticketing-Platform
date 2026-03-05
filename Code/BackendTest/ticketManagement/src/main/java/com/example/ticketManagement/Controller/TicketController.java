package com.example.ticketManagement.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ticketManagement.Entity.BookedTickets;
import com.example.ticketManagement.Entity.MarkedTicket;
import com.example.ticketManagement.Entity.TicketSeats;
import com.example.ticketManagement.Service.TicketService;

@RestController
@RequestMapping("/")
public class TicketController {
    @Autowired private TicketService ticketService;

    // Dashboard widgets can call these
    @GetMapping("tickets")
    public ResponseEntity<?> list(@RequestParam int userAccId) {
        return ResponseEntity.ok(ticketService.listActive(userAccId));
    }

    @GetMapping("tickets/{ticketId}")
    public ResponseEntity<?> details(@PathVariable int ticketId) {
        List<TicketSeats> seats = ticketService.ticketSeats(ticketId);
        Map<String,Object> res = new HashMap<>();
        res.put("seats", seats.stream().map(s -> s.getSeatInfo().getSeatCode()).toList());
        return ResponseEntity.ok(res);
    }

    @PostMapping("tickets/{ticketId}/cancel")
    public ResponseEntity<?> cancel(@PathVariable int ticketId, @RequestParam int userAccId) {
        boolean ok = ticketService.cancelTicket(ticketId, userAccId);
        return ok ? ResponseEntity.ok().build() : ResponseEntity.status(403).body("Not allowed");
    }

    // Mark ticket (for QR or quick access)
    @PostMapping("tickets/{ticketId}/mark")
    public ResponseEntity<?> mark(@PathVariable int ticketId, @RequestParam int userAccId) {
        MarkedTicket m = ticketService.markTicket(ticketId, userAccId);
        return ResponseEntity.ok(m.getMarkId());
    }

    // History endpoints
    @GetMapping("history/cancelled")
    public ResponseEntity<?> cancelled(@RequestParam int userAccId) {
        List<BookedTickets> list = ticketService.listCancelled(userAccId);
        return list.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(list);
    }

    @GetMapping("history/marked")
    public ResponseEntity<?> marked(@RequestParam int userAccId) {
        return ResponseEntity.ok(ticketService.listMarks(userAccId));
    }

    @DeleteMapping("history/marked/{markId}")
    public ResponseEntity<?> deleteMark(@PathVariable long markId, @RequestParam int userAccId) {
        ticketService.deleteMark(markId, userAccId);
        return ResponseEntity.ok().build();
    }

    // Info endpoint suitable for map view (stations names)
    @GetMapping("tickets/{ticketId}/info")
    public ResponseEntity<?> info(@PathVariable int ticketId) {
        // reuse details; frontend can geocode station names
        List<TicketSeats> seats = ticketService.ticketSeats(ticketId);
        Map<String,Object> res = new HashMap<>();
        if (!seats.isEmpty()) {
            var tt = seats.get(0).getSeatInfo().getTrainTime();
            Map<String, Object> trip = new HashMap<>();
            trip.put("trainTimeId", tt.getTimeID());
            trip.put("trainName", tt.getTrains().getTrainNameString());
            trip.put("from", tt.getRoute().getStartStation().getStationNameString());
            trip.put("to", tt.getRoute().getEndingStation().getStationNameString());
            trip.put("departTime", tt.getDeparTime());
            trip.put("arrivalTime", tt.getArrivaLocalTime());
            res.put("trip", trip);
        }
        res.put("seatCodes", seats.stream().map(s -> s.getSeatInfo().getSeatCode()).toList());
        return ResponseEntity.ok(res);
    }
}


