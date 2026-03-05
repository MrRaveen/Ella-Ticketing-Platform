package com.example.ticketManagement.Entity;

import java.time.LocalDate;

import jakarta.persistence.*;

@Entity
@Table(name = "BOKKED_TICKETS")
public class BookedTickets {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TICKET_ID")
    private int ticketID;
    @Column(name = "RESERVED_SEAT_COUNT")
    private int reservedSeatCont;
    @Column(name = "PRICE")
    private double price;
    @Column(name = "STATUS")
    private boolean status;
    @Column(name = "DATE_OF_BOOK")
    private LocalDate dateOfBook;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
    private Stations returnLocationString;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ACCOUNTID", referencedColumnName = "ACCOUNTID", nullable = false)
    private UserAcc userID;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAIN_ID", referencedColumnName = "TRAIN_ID", nullable = false)
    private Trains trains;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PAYMENT_HIS_ID", referencedColumnName = "PAYMENT_HIS_ID", nullable = false)
    private PaymentHistory paymentHistory;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TIME_ID", referencedColumnName = "TIME_ID", nullable = false)
    private TrainTime trainTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLASS_ID", referencedColumnName = "CLASS_ID", nullable = false)
    private TrainSeatClass trainSeatClass;

    public int getTicketID() { return ticketID; }
    public int getReservedSeatCont() { return reservedSeatCont; }
    public double getPrice() { return price; }
    public boolean isStatus() { return status; }
    public void setStatus(boolean status) { this.status = status; }
    public LocalDate getDateOfBook() { return dateOfBook; }
    public UserAcc getUserID() { return userID; }
    public Trains getTrains() { return trains; }
    public TrainTime getTrainTime() { return trainTime; }
    public TrainSeatClass getTrainSeatClass() { return trainSeatClass; }
}


