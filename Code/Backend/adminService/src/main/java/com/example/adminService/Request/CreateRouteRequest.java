package com.example.adminService.Request;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateRouteRequest {
	@JsonProperty("routeCodeString")
	private String routeCodeString;
	@JsonProperty("startStationID")
	private int startStationID;
	@JsonProperty("endStationID")
	private int endStationID;
	@JsonProperty("routeName")
	private String routeNameString;
	@JsonProperty("routeLocations")
	private List<RouteLocationRequest> allRouteLocations;
	public String getRouteCodeString() {
		return routeCodeString;
	}
	public void setRouteCodeString(String routeCodeString) {
		this.routeCodeString = routeCodeString;
	}
	public int getStartStationID() {
		return startStationID;
	}
	public void setStartStationID(int startStationID) {
		this.startStationID = startStationID;
	}
	public int getEndStationID() {
		return endStationID;
	}
	public void setEndStationID(int endStationID) {
		this.endStationID = endStationID;
	}
	public String getRouteNameString() {
		return routeNameString;
	}
	public void setRouteNameString(String routeNameString) {
		this.routeNameString = routeNameString;
	}
	public List<RouteLocationRequest> getAllRouteLocations() {
		return allRouteLocations;
	}
	public void setAllRouteLocations(List<RouteLocationRequest> allRouteLocations) {
		this.allRouteLocations = allRouteLocations;
	}
	public CreateRouteRequest(String routeCodeString, int startStationID, int endStationID, String routeNameString,
			List<RouteLocationRequest> allRouteLocations) {
		super();
		this.routeCodeString = routeCodeString;
		this.startStationID = startStationID;
		this.endStationID = endStationID;
		this.routeNameString = routeNameString;
		this.allRouteLocations = allRouteLocations;
	}
	public CreateRouteRequest() {
		super();
	}
}
