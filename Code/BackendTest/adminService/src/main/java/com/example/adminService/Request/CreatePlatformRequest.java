package com.example.adminService.Request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreatePlatformRequest {
	@JsonProperty("platformNum")
	private int platformNum;
	@JsonProperty("Status")
	private String statuString;
	@JsonProperty("stationID")
	private int stationID;
	public int getPlatformNum() {
		return platformNum;
	}
	public void setPlatformNum(int platformNum) {
		this.platformNum = platformNum;
	}
	public String getStatuString() {
		return statuString;
	}
	public void setStatuString(String statuString) {
		this.statuString = statuString;
	}
	public int getStationID() {
		return stationID;
	}
	public void setStationID(int stationID) {
		this.stationID = stationID;
	}
	public CreatePlatformRequest(int platformNum, String statuString, int stationID) {
		super();
		this.platformNum = platformNum;
		this.statuString = statuString;
		this.stationID = stationID;
	}
	
}
