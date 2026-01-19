package com.example.adminService.Request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RouteLocationRequest {
	@JsonProperty("DistrictName")
	private String DistrictName;
	@JsonProperty("LocationName")
	private String LocationName;
	@JsonProperty("Province")
	private String Province;
	@JsonProperty("StationID")
	private int StationID;
	public String getDistrictName() {
		return DistrictName;
	}
	public void setDistrictName(String districtName) {
		DistrictName = districtName;
	}
	public String getLocationName() {
		return LocationName;
	}
	public void setLocationName(String locationName) {
		LocationName = locationName;
	}
	public String getProvince() {
		return Province;
	}
	public void setProvince(String province) {
		Province = province;
	}
	public int getStationID() {
		return StationID;
	}
	public void setStationID(int stationID) {
		StationID = stationID;
	}
	public RouteLocationRequest(String districtName, String locationName, String province, int stationID) {
		super();
		DistrictName = districtName;
		LocationName = locationName;
		Province = province;
		StationID = stationID;
	}
	public RouteLocationRequest() {
		super();
	}
}
