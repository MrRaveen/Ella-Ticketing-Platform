package com.example.ticketManagement.Service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ticketManagement.Entity.BookedTickets;
import com.example.ticketManagement.Entity.MarkedTicket;
import com.example.ticketManagement.Entity.SeatCount;
import com.example.ticketManagement.Entity.TicketSeats;
import com.example.ticketManagement.Repository.BookedTicketRepo;
import com.example.ticketManagement.Repository.MarkedTicketRepo;
import com.example.ticketManagement.Repository.SeatCountRepo;
import com.example.ticketManagement.Repository.TicketSeatsRepo;

@Service
public class TicketService {
    @Autowired private BookedTicketRepo bookedTicketRepo;
    @Autowired private TicketSeatsRepo ticketSeatsRepo;
    @Autowired private SeatCountRepo seatCountRepo;
    @Autowired private MarkedTicketRepo markedTicketRepo;

    public List<BookedTickets> listActive(int accountId) {
        return bookedTicketRepo.findByUserID_AccountIdAndStatusTrue(accountId);
    }

    public List<BookedTickets> listCancelled(int accountId) {
        return bookedTicketRepo.findByUserID_AccountIdAndStatusFalse(accountId);
    }

    public List<TicketSeats> ticketSeats(int ticketId) {
        return ticketSeatsRepo.findByBookedTickets_TicketID(ticketId);
    }

    @Transactional
    public boolean cancelTicket(int ticketId, int accountId) {
        BookedTickets t = bookedTicketRepo.findById(ticketId).orElseThrow();
        if (t.getUserID().getAccountId() != accountId) return false;
        if (!t.isStatus()) return true; // already cancelled
        t.setStatus(false);
        bookedTicketRepo.save(t);
        // free seats and increment seat counts
        for (TicketSeats ts : ticketSeatsRepo.findByBookedTickets_TicketID(ticketId)) {
            ts.getSeatInfo().setOccupationStat(false);
        }
        for (SeatCount sc : seatCountRepo.findByTrainTime_TimeIDAndTrainSeatClass_ClassID(
                t.getTrainTime().getTimeID(), t.getTrainSeatClass().getClassID())) {
            sc.setSeatRemainingCount(sc.getSeatRemainingCount() + t.getReservedSeatCont());
        }
        return true;
    }

    @Transactional
    public MarkedTicket markTicket(int ticketId, int accountId) {
        BookedTickets t = bookedTicketRepo.findById(ticketId).orElseThrow();
        MarkedTicket mk = new MarkedTicket();
        // set fields via reflection since fields are private with no setters? We'll create setters minimal.
        try {
            java.lang.reflect.Field f1 = MarkedTicket.class.getDeclaredField("ticket");
            f1.setAccessible(true); f1.set(mk, t);
            java.lang.reflect.Field f2 = MarkedTicket.class.getDeclaredField("accountId");
            f2.setAccessible(true); f2.set(mk, accountId);
            java.lang.reflect.Field f3 = MarkedTicket.class.getDeclaredField("createdAt");
            f3.setAccessible(true); f3.set(mk, LocalDateTime.now());
        } catch (Exception ignored) {}
        return markedTicketRepo.save(mk);
    }

    public List<MarkedTicket> listMarks(int accountId) {
        return markedTicketRepo.findByAccountId(accountId);
    }

    public void deleteMark(long markId, int accountId) {
        markedTicketRepo.deleteByMarkIdAndAccountId(markId, accountId);
    }
}


