package com.example.bookTicket.Response;

import java.time.LocalDate;
import java.time.LocalTime;

public class BookingSummaryDTO {
    private int trainTimeId;
    private int classId;
    private String className;
    private String trainName;
    private LocalDate travelDate;
    private LocalTime departTime;
    private LocalTime arrivalTime;
    private int passengerCount;
    private double pricePerPerson;
    private double totalPrice;

    public int getTrainTimeId() { return trainTimeId; }
    public void setTrainTimeId(int trainTimeId) { this.trainTimeId = trainTimeId; }
    public int getClassId() { return classId; }
    public void setClassId(int classId) { this.classId = classId; }
    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }
    public String getTrainName() { return trainName; }
    public void setTrainName(String trainName) { this.trainName = trainName; }
    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }
    public LocalTime getDepartTime() { return departTime; }
    public void setDepartTime(LocalTime departTime) { this.departTime = departTime; }
    public LocalTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }
    public int getPassengerCount() { return passengerCount; }
    public void setPassengerCount(int passengerCount) { this.passengerCount = passengerCount; }
    public double getPricePerPerson() { return pricePerPerson; }
    public void setPricePerPerson(double pricePerPerson) { this.pricePerPerson = pricePerPerson; }
    public double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(double totalPrice) { this.totalPrice = totalPrice; }
}


