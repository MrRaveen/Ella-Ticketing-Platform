package com.example.bookTicket.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ROUTE_LOCATIONS")
public class RouteLocations {
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "LOCATION_ID")
	 private int locationID;
	 @Column(name = "DISTRICT_NAME")
	 private String districtNameString;
	 @Column(name = "LOCATION_NAME")
	 private String locationNameString;
	 @Column(name = "PROVINCE")
	 private String provinceString;
	 
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "ROUTE_ID", referencedColumnName = "ROUTE_ID", nullable = false)
	 private Route route;
	 
	 @ManyToOne(fetch = FetchType.LAZY)
	 @JoinColumn(name = "STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
	 private Stations stations;
	 
	 public int getLocationID() {
		 return locationID;
	 }
	 public void setLocationID(int locationID) {
		 this.locationID = locationID;
	 }
	 public String getDistrictNameString() {
		 return districtNameString;
	 }
	 public void setDistrictNameString(String districtNameString) {
		 this.districtNameString = districtNameString;
	 }
	 public String getLocationNameString() {
		 return locationNameString;
	 }
	 public void setLocationNameString(String locationNameString) {
		 this.locationNameString = locationNameString;
	 }
	 public String getProvinceString() {
		 return provinceString;
	 }
	 public void setProvinceString(String provinceString) {
		 this.provinceString = provinceString;
	 }
	 public Route getRoute() {
		 return route;
	 }
	 public void setRoute(Route route) {
		 this.route = route;
	 }
	 public Stations getStations() {
		 return stations;
	 }
	 public void setStations(Stations stations) {
		 this.stations = stations;
	 }
	 public RouteLocations(String districtNameString, String locationNameString, String provinceString, Route route,
			Stations stations) {
		super();
		this.districtNameString = districtNameString;
		this.locationNameString = locationNameString;
		this.provinceString = provinceString;
		this.route = route;
		this.stations = stations;
	 }
	 public RouteLocations() {
		super();
	 }
}
