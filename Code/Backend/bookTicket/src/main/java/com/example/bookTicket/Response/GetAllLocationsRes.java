package com.example.bookTicket.Response;

public class GetAllLocationsRes {
	private int locationID;
	private String locationNameString;
	public int getLocationID() {
		return locationID;
	}
	public void setLocationID(int locationID) {
		this.locationID = locationID;
	}
	public String getLocationNameString() {
		return locationNameString;
	}
	public void setLocationNameString(String locationNameString) {
		this.locationNameString = locationNameString;
	}
	public GetAllLocationsRes(int locationID, String locationNameString) {
		super();
		this.locationID = locationID;
		this.locationNameString = locationNameString;
	}
	
	
}
