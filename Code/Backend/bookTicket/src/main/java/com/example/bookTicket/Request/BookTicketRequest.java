package com.example.bookTicket.Request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class BookTicketRequest {
	    @JsonProperty("reservedSeatCount")
	    private int reservedSeatCount;
	    @JsonProperty("price")
	    private double price;

	    @JsonProperty("paymentType")
	    private String paymentType;

	    @JsonProperty("returnStationID")
	    private int returnStationID;

	    @JsonProperty("trainTimeID")
	    private int trainTimeID;

	    @JsonProperty("classId")
	    private int classId;

	    @JsonProperty("userAccId")
	    private int userAccId;
	    @JsonProperty("paymentStatNumString")
	    private String paymentStatNumString;
	    @JsonProperty("paymentMethod")
	    private String paymentMethod;
	    @JsonProperty("return_location")
	    private String return_location;
	    
	 public String getReturn_location() {
			return return_location;
		}
		public void setReturn_location(String return_location) {
			this.return_location = return_location;
		}
	 public String getPaymentMethod() {
			return paymentMethod;
		}
		public void setPaymentMethod(String paymentMethod) {
			this.paymentMethod = paymentMethod;
		}
	 public String getPaymentStatNumString() {
			return paymentStatNumString;
		}
		public void setPaymentStatNumString(String paymentStatNumString) {
			this.paymentStatNumString = paymentStatNumString;
		}
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
	 public String getPaymentType() {
		 return paymentType;
	 }
	 public void setPaymentType(String paymentType) {
		 this.paymentType = paymentType;
	 }
	 public int getReturnStationID() {
		 return returnStationID;
	 }
	 public void setReturnStationID(int returnStationID) {
		 this.returnStationID = returnStationID;
	 }
	 public int getTrainTimeID() {
		 return trainTimeID;
	 }
	 public void setTrainTimeID(int trainTimeID) {
		 this.trainTimeID = trainTimeID;
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
	 public BookTicketRequest(int reservedSeatCount, double price, String paymentType, int returnStationID,
			int trainTimeID, int classId, int userAccId, String paymentStatNumString, String paymentMethod, String return_location) {
		super();
		this.reservedSeatCount = reservedSeatCount;
		this.price = price;
		this.paymentType = paymentType;
		this.returnStationID = returnStationID;
		this.trainTimeID = trainTimeID;
		this.classId = classId;
		this.userAccId = userAccId;
		this.paymentStatNumString = paymentStatNumString;
		this.paymentMethod = paymentMethod;
		this.return_location = return_location;
	 }
	 
}
