package com.example.booking.service;

import com.example.booking.dto.BookingRequest;
import com.example.booking.dto.BookingResponse;
import com.example.booking.dto.PaymentRequest;
import com.example.booking.model.Payment;
import com.example.booking.model.Seat;
import com.example.booking.model.Ticket;
import com.example.booking.model.Train;
import com.example.booking.repository.PaymentRepository;
import com.example.booking.repository.SeatRepository;
import com.example.booking.repository.TicketRepository;
import com.example.booking.repository.TrainRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class BookingService {
    private final TrainRepository trainRepository;
    private final SeatRepository seatRepository;
    private final TicketRepository ticketRepository;
    private final PaymentRepository paymentRepository;

    public List<Train> searchTrains(String source, String destination, LocalDateTime departureDate) {
        LocalDateTime endOfDay = departureDate.toLocalDate().atTime(23, 59, 59);
        return trainRepository.findBySourceAndDestinationAndDepartureTimeBetween(
                source, destination, departureDate, endOfDay);
    }

    public List<Seat> getAvailableSeats(Long trainId) {
        return seatRepository.findByTrainIdAndIsAvailable(trainId, true);
    }

    @Transactional
    public BookingResponse bookTicket(BookingRequest request) {
        // Validate train and seat
        Train train = trainRepository.findById(request.getTrainId())
                .orElseThrow(() -> new RuntimeException("Train not found"));
        
        Seat seat = seatRepository.findById(request.getSeatId())
                .orElseThrow(() -> new RuntimeException("Seat not found"));
        
        if (!seat.isAvailable()) {
            throw new RuntimeException("Seat is already booked");
        }
        
        // Create ticket
        Ticket ticket = Ticket.builder()
                .ticketNumber(generateTicketNumber())
                .userId(request.getUserId())
                .train(train)
                .seat(seat)
                .price(calculatePrice(train, seat))
                .bookingTime(LocalDateTime.now())
                .status(Ticket.TicketStatus.BOOKED)
                .build();
        
        // Update seat availability
        seat.setAvailable(false);
        seatRepository.save(seat);
        
        // Save ticket
        Ticket savedTicket = ticketRepository.save(ticket);
        
        return BookingResponse.builder()
                .ticketId(savedTicket.getId())
                .ticketNumber(savedTicket.getTicketNumber())
                .price(savedTicket.getPrice())
                .build();
    }
    
    @Transactional
    public Payment processPayment(PaymentRequest request) {
        Ticket ticket = ticketRepository.findById(request.getTicketId())
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        Payment payment = Payment.builder()
                .paymentId(UUID.randomUUID().toString())
                .ticket(ticket)
                .amount(ticket.getPrice())
                .paymentTime(LocalDateTime.now())
                .paymentMethod(request.getPaymentMethod())
                .status(Payment.PaymentStatus.COMPLETED)
                .build();
        
        return paymentRepository.save(payment);
    }
    
    @Transactional
    public void cancelTicket(String ticketNumber) {
        Ticket ticket = ticketRepository.findByTicketNumber(ticketNumber)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        
        // Update ticket status
        ticket.setStatus(Ticket.TicketStatus.CANCELLED);
        ticketRepository.save(ticket);
        
        // Make seat available again
        Seat seat = ticket.getSeat();
        seat.setAvailable(true);
        seatRepository.save(seat);
        
        // Process refund if payment exists
        paymentRepository.findByTicket(ticket).ifPresent(payment -> {
            payment.setStatus(Payment.PaymentStatus.REFUNDED);
            paymentRepository.save(payment);
        });
    }
    
    private String generateTicketNumber() {
        return "TKT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
    
    private Double calculatePrice(Train train, Seat seat) {
        double basePrice = train.getBasePrice();
        double multiplier = switch (seat.getSeatType()) {
            case ECONOMY -> 1.0;
            case BUSINESS -> 1.5;
            case FIRST_CLASS -> 2.0;
        };
        return basePrice * multiplier;
    }
}