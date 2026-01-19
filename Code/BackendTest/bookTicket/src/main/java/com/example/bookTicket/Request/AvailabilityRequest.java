package com.example.bookTicket.Request;

import java.time.LocalDate;

public class AvailabilityRequest {
    private String leavingStation;
    private String arrivingStation;
    private LocalDate travelDate;
    private int passengerCount;

    public String getLeavingStation() { return leavingStation; }
    public void setLeavingStation(String leavingStation) { this.leavingStation = leavingStation; }
    public String getArrivingStation() { return arrivingStation; }
    public void setArrivingStation(String arrivingStation) { this.arrivingStation = arrivingStation; }
    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }
    public int getPassengerCount() { return passengerCount; }
    public void setPassengerCount(int passengerCount) { this.passengerCount = passengerCount; }
}


