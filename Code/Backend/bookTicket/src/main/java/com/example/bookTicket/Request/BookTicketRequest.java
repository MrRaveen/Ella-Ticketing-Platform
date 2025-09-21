package com.example.bookTicket.Request;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookTicketRequest {
	 private int reservedSeatCount;
	 private double price;
	 private boolean status;
	 private LocalDate bookedDate;
	 private LocalTime bookedTime;
	 private int returnStationID;
	 private int trainId;
	 private int paymentHistoryId;
	 private int classId;
	 private int userAccId;
	 public int getReservedSeatCount() {
		 return reservedSeatCount;
	 }
	 public void setReservedSeatCount(int reservedSeatCount) {
		 this.reservedSeatCount = reservedSeatCount;
	 }
	 public double getPrice() {
		 return price;
	 }
	 public void setPrice(double price) {
		 this.price = price;
	 }
	 public boolean isStatus() {
		 return status;
	 }
	 public void setStatus(boolean status) {
		 this.status = status;
	 }
	 public LocalDate getBookedDate() {
		 return bookedDate;
	 }
	 public void setBookedDate(LocalDate bookedDate) {
		 this.bookedDate = bookedDate;
	 }
	 public LocalTime getBookedTime() {
		 return bookedTime;
	 }
	 public void setBookedTime(LocalTime bookedTime) {
		 this.bookedTime = bookedTime;
	 }
	 public int getReturnStationID() {
		 return returnStationID;
	 }
	 public void setReturnStationID(int returnStationID) {
		 this.returnStationID = returnStationID;
	 }
	 public int getTrainId() {
		 return trainId;
	 }
	 public void setTrainId(int trainId) {
		 this.trainId = trainId;
	 }
	 public int getPaymentHistoryId() {
		 return paymentHistoryId;
	 }
	 public void setPaymentHistoryId(int paymentHistoryId) {
		 this.paymentHistoryId = paymentHistoryId;
	 }
	 public int getClassId() {
		 return classId;
	 }
	 public void setClassId(int classId) {
		 this.classId = classId;
	 }
	 public int getUserAccId() {
		 return userAccId;
	 }
	 public void setUserAccId(int userAccId) {
		 this.userAccId = userAccId;
	 }
	 public BookTicketRequest(int reservedSeatCount, double price, boolean status, LocalDate bookedDate,
			LocalTime bookedTime, int returnStationID, int trainId, int paymentHistoryId, int classId, int userAccId) {
		super();
		this.reservedSeatCount = reservedSeatCount;
		this.price = price;
		this.status = status;
		this.bookedDate = bookedDate;
		this.bookedTime = bookedTime;
		this.returnStationID = returnStationID;
		this.trainId = trainId;
		this.paymentHistoryId = paymentHistoryId;
		this.classId = classId;
		this.userAccId = userAccId;
	 }
	 public BookTicketRequest() {
		super();
	 }
}
