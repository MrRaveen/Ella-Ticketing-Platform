package com.example.adminService.Request;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Entity.Stations;
import com.example.adminService.Entity.TrainInfo;
import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateTrainRequest {
	@JsonProperty("TrainName")
	private String TrainName;
	@JsonProperty("Status")
	private boolean Status;
	@JsonProperty("DriverName")
	private String DriverName;
	@JsonProperty("stationsID")
	private int stationsID;
	@JsonProperty("trainInfoID")
	private int trainInfoID;
	@JsonProperty("adminUsername")
	private String adminUsername;
	public String getTrainName() {
		return TrainName;
	}
	public void setTrainName(String trainName) {
		TrainName = trainName;
	}
	public boolean isStatus() {
		return Status;
	}
	public void setStatus(boolean status) {
		Status = status;
	}
	public String getDriverName() {
		return DriverName;
	}
	public void setDriverName(String driverName) {
		DriverName = driverName;
	}
	public int getStationsID() {
		return stationsID;
	}
	public void setStationsID(int stationsID) {
		this.stationsID = stationsID;
	}
	public int getTrainInfoID() {
		return trainInfoID;
	}
	public void setTrainInfoID(int trainInfoID) {
		this.trainInfoID = trainInfoID;
	}
	public String getAdminUsername() {
		return adminUsername;
	}
	public void setAdminUsername(String adminUsername) {
		this.adminUsername = adminUsername;
	}
	public CreateTrainRequest(String trainName, boolean status, String driverName, int stationsID, int trainInfoID,
			String adminUsername) {
		super();
		TrainName = trainName;
		Status = status;
		DriverName = driverName;
		this.stationsID = stationsID;
		this.trainInfoID = trainInfoID;
		this.adminUsername = adminUsername;
	}
	public CreateTrainRequest() {
		super();
	}
	
	
}
