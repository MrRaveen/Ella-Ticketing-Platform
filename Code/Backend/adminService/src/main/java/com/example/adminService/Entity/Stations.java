package com.example.adminService.Entity;

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
	    @Column(name = "STATION_ID")
	    private int stationID;
	    @Column(name = "CONTACT_NO")
	    private String contactNoString;
	    @Column(name = "DISTANCE_FROM_FORT")
	    private double distanceFromFort;
	    @Column(name = "ELEVATION")
	    private double elevation;
	    @Column(name = "STATION_CODE")
	    private String stationCodeString;
	    @Column(name = "STATION_NAME")
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
