package com.example.adminService.Request;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateTrainTimeRequest {
	@JsonProperty("departTime")
    private LocalTime departTime;

    @JsonProperty("DepartDate")
    private LocalDate departDate;

    @JsonProperty("arrivalTime")
    private LocalTime arrivalTime;

    @JsonProperty("arrivalDate")
    private LocalDate arrivalDate;

    @JsonProperty("Status")
    private String status;

    @JsonProperty("routeID")
    private int routeID;

    @JsonProperty("trainsID")
    private int trainsID;

    @JsonProperty("platformID")
    private int platformID;

    @JsonProperty("totalCapacity")
    private int totalCapacity;

    @JsonProperty("seatRemainingCount")
    private int seatRemainingCount;
    
	public CreateTrainTimeRequest(LocalTime departTime, LocalDate departDate, LocalTime arrivalTime,
			LocalDate arrivalDate, String status, int routeID, int trainsID, int platformID, int totalCapacity,
			int seatRemainingCount) {
		super();
		this.departTime = departTime;
		this.departDate = departDate;
		this.arrivalTime = arrivalTime;
		this.arrivalDate = arrivalDate;
		this.status = status;
		this.routeID = routeID;
		this.trainsID = trainsID;
		this.platformID = platformID;
		this.totalCapacity = totalCapacity;
		this.seatRemainingCount = seatRemainingCount;
	}

	public LocalTime getDepartTime() {
		return departTime;
	}

	public void setDepartTime(LocalTime departTime) {
		this.departTime = departTime;
	}

	public LocalDate getDepartDate() {
		return departDate;
	}

	public void setDepartDate(LocalDate departDate) {
		this.departDate = departDate;
	}

	public LocalTime getArrivalTime() {
		return arrivalTime;
	}

	public void setArrivalTime(LocalTime arrivalTime) {
		this.arrivalTime = arrivalTime;
	}

	public LocalDate getArrivalDate() {
		return arrivalDate;
	}

	public void setArrivalDate(LocalDate arrivalDate) {
		this.arrivalDate = arrivalDate;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getRouteID() {
		return routeID;
	}

	public void setRouteID(int routeID) {
		this.routeID = routeID;
	}

	public int getTrainsID() {
		return trainsID;
	}

	public void setTrainsID(int trainsID) {
		this.trainsID = trainsID;
	}

	public int getPlatformID() {
		return platformID;
	}

	public void setPlatformID(int platformID) {
		this.platformID = platformID;
	}

	public int getTotalCapacity() {
		return totalCapacity;
	}

	public void setTotalCapacity(int totalCapacity) {
		this.totalCapacity = totalCapacity;
	}

	public int getSeatRemainingCount() {
		return seatRemainingCount;
	}

	public void setSeatRemainingCount(int seatRemainingCount) {
		this.seatRemainingCount = seatRemainingCount;
	}

	public CreateTrainTimeRequest() {
		// TODO Auto-generated constructor stub
	}
}
