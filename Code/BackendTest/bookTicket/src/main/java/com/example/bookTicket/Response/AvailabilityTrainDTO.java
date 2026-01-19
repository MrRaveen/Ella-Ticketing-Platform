package com.example.bookTicket.Response;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public class AvailabilityTrainDTO {
    private int trainTimeId;
    private int trainId;
    private String trainName;
    private LocalDate travelDate;
    private LocalTime departTime;
    private LocalTime arrivalTime;
    private String routeFrom;
    private String routeTo;
    private List<AvailabilityClassDTO> classes;

    public int getTrainTimeId() { return trainTimeId; }
    public void setTrainTimeId(int trainTimeId) { this.trainTimeId = trainTimeId; }
    public int getTrainId() { return trainId; }
    public void setTrainId(int trainId) { this.trainId = trainId; }
    public String getTrainName() { return trainName; }
    public void setTrainName(String trainName) { this.trainName = trainName; }
    public LocalDate getTravelDate() { return travelDate; }
    public void setTravelDate(LocalDate travelDate) { this.travelDate = travelDate; }
    public LocalTime getDepartTime() { return departTime; }
    public void setDepartTime(LocalTime departTime) { this.departTime = departTime; }
    public LocalTime getArrivalTime() { return arrivalTime; }
    public void setArrivalTime(LocalTime arrivalTime) { this.arrivalTime = arrivalTime; }
    public String getRouteFrom() { return routeFrom; }
    public void setRouteFrom(String routeFrom) { this.routeFrom = routeFrom; }
    public String getRouteTo() { return routeTo; }
    public void setRouteTo(String routeTo) { this.routeTo = routeTo; }
    public List<AvailabilityClassDTO> getClasses() { return classes; }
    public void setClasses(List<AvailabilityClassDTO> classes) { this.classes = classes; }
}


