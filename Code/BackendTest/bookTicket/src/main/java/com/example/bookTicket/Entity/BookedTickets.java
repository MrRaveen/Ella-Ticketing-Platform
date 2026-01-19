package com.example.bookTicket.Entity;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

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
	    private double Price;
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
		public int getTicketID() {
			return ticketID;
		}
		public void setTicketID(int ticketID) {
			this.ticketID = ticketID;
		}
		public int getReservedSeatCont() {
			return reservedSeatCont;
		}
		public void setReservedSeatCont(int reservedSeatCont) {
			this.reservedSeatCont = reservedSeatCont;
		}
		public double getPrice() {
			return Price;
		}
		public void setPrice(double price) {
			Price = price;
		}
		public boolean isStatus() {
			return status;
		}
		public void setStatus(boolean status) {
			this.status = status;
		}
		public LocalDate getDate() {
			return dateOfBook;
		}
		public void setDate(LocalDate dateOfBook) {
			this.dateOfBook = dateOfBook;
		}
		public LocalDate getDateOfBook() {
			return dateOfBook;
		}
		public void setDateOfBook(LocalDate dateOfBook) {
			this.dateOfBook = dateOfBook;
		}
		public Stations getReturnLocationString() {
			return returnLocationString;
		}
		public void setReturnLocationString(Stations returnLocationString) {
			this.returnLocationString = returnLocationString;
		}
		public UserAcc getUserID() {
			return userID;
		}
		public void setUserID(UserAcc userID) {
			this.userID = userID;
		}
		public Trains getTrains() {
			return trains;
		}
		public void setTrains(Trains trains) {
			this.trains = trains;
		}
		public PaymentHistory getPaymentHistory() {
			return paymentHistory;
		}
		public void setPaymentHistory(PaymentHistory paymentHistory) {
			this.paymentHistory = paymentHistory;
		}
		public TrainTime getTrainTime() {
			return trainTime;
		}
		public void setTrainTime(TrainTime trainTime) {
			this.trainTime = trainTime;
		}
		public TrainSeatClass getTrainSeatClass() {
			return trainSeatClass;
		}
		public void setTrainSeatClass(TrainSeatClass trainSeatClass) {
			this.trainSeatClass = trainSeatClass;
		}
		public BookedTickets(int reservedSeatCont, double price, boolean status, LocalDate dateOfBook,
				Stations returnLocationString, UserAcc userID, Trains trains, PaymentHistory paymentHistory,
				TrainTime trainTime, TrainSeatClass trainSeatClass) {
			super();
			this.reservedSeatCont = reservedSeatCont;
			Price = price;
			this.status = status;
			this.dateOfBook = dateOfBook;
			this.returnLocationString = returnLocationString;
			this.userID = userID;
			this.trains = trains;
			this.paymentHistory = paymentHistory;
			this.trainTime = trainTime;
			this.trainSeatClass = trainSeatClass;
		}
		public BookedTickets() {
			super();
		}
}

