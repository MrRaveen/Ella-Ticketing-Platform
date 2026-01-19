package com.example.adminService.Request;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class UpdateStationByID {
	    @JsonProperty("stationID")
	    private int stationID;
	    @JsonProperty("contactNoString")
	    private String contactNoString;
	    @JsonProperty("distanceFromFort")
	    private double distanceFromFort;
	    @JsonProperty("elevation")
	    private double elevation;
	    @JsonProperty("stationCodeString")
	    private String stationCodeString;
	    @JsonProperty("stationNameString")
	    private String stationNameString;
		public int getStationID() {
			return stationID;
		}
		public void setStationID(int stationID) {
			this.stationID = stationID;
		}
		public String getContactNoString() {
			return contactNoString;
		}
		public void setContactNoString(String contactNoString) {
			this.contactNoString = contactNoString;
		}
		public double getDistanceFromFort() {
			return distanceFromFort;
		}
		public void setDistanceFromFort(double distanceFromFort) {
			this.distanceFromFort = distanceFromFort;
		}
		public double getElevation() {
			return elevation;
		}
		public void setElevation(double elevation) {
			this.elevation = elevation;
		}
		public String getStationCodeString() {
			return stationCodeString;
		}
		public void setStationCodeString(String stationCodeString) {
			this.stationCodeString = stationCodeString;
		}
		public String getStationNameString() {
			return stationNameString;
		}
		public void setStationNameString(String stationNameString) {
			this.stationNameString = stationNameString;
		}
		public UpdateStationByID(int stationID, String contactNoString, double distanceFromFort, double elevation,
				String stationCodeString, String stationNameString) {
			super();
			this.stationID = stationID;
			this.contactNoString = contactNoString;
			this.distanceFromFort = distanceFromFort;
			this.elevation = elevation;
			this.stationCodeString = stationCodeString;
			this.stationNameString = stationNameString;
		}
		public UpdateStationByID() {
			super();
		}
	    
}
