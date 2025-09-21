package com.example.bookTicket.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "STATIONS")
public class Stations {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @JsonProperty("stationID")
	    @Column(name = "STATION_ID")
	    private int stationID;
	    @Column(name = "CONTACT_NO")
	    @JsonProperty("contactNoString")
	    private String contactNoString;
	    @Column(name = "DISTANCE_FROM_FORT")
	    @JsonProperty("distanceFromFort")
	    private double distanceFromFort;
	    @Column(name = "ELEVATION")
	    @JsonProperty("elevation")
	    private double elevation;
	    @Column(name = "STATION_CODE")
	    @JsonProperty("stationCodeString")
	    private String stationCodeString;
	    @Column(name = "STATION_NAME")
	    @JsonProperty("stationNameString")
	    private String stationNameString;
	    @Column(name = "STATUS")
	    @JsonProperty("stationStatus")
	    private String stationStatus;
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
		public String getStationStatus() {
			return stationStatus;
		}
		public void setStationStatus(String stationStatus) {
			this.stationStatus = stationStatus;
		}
		public Stations(String contactNoString, double distanceFromFort, double elevation, String stationCodeString,
				String stationNameString) {
			super();
			this.contactNoString = contactNoString;
			this.distanceFromFort = distanceFromFort;
			this.elevation = elevation;
			this.stationCodeString = stationCodeString;
			this.stationNameString = stationNameString;
		}
		public Stations() {
			super();
		}
	    
}
