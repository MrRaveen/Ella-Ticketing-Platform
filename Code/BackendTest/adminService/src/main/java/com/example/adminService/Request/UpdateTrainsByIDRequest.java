package com.example.adminService.Request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UpdateTrainsByIDRequest {
	@JsonProperty("TrainID")
	private int TrainID;
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
	public int getTrainID() {
		return TrainID;
	}
	public void setTrainID(int trainID) {
		TrainID = trainID;
	}
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
	public UpdateTrainsByIDRequest(int trainID, String trainName, boolean status,
			String driverName, int stationsID, int trainInfoID) {
		super();
		TrainID = trainID;
		TrainName = trainName;
		Status = status;
		DriverName = driverName;
		this.stationsID = stationsID;
		this.trainInfoID = trainInfoID;
	}
}
