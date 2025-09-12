package com.example.adminService.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ROUTE")
public class Route {
	public enum routeStatus{
		ACTIVE,
		INACTIVE,
		REMOVED
	}
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "ROUTE_ID")
	    private int routeId;

	    @Column(name = "ROUTE_NAME")
	    private String routeName;

	    @Column(name = "ROUTE_CODE")
	    private String routeCode;

	    @OneToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "END_STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
	    private Stations startStation;

	    @OneToOne(fetch = FetchType.LAZY)
		@JoinColumn(name = "START_STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
	    private Stations endingStation;

	    @Column(name = "ROUTE_STATUS")
	    private String routeStatus;

		public int getRouteId() {
			return routeId;
		}

		public void setRouteId(int routeId) {
			this.routeId = routeId;
		}

		public String getRouteName() {
			return routeName;
		}

		public void setRouteName(String routeName) {
			this.routeName = routeName;
		}

		public String getRouteCode() {
			return routeCode;
		}

		public void setRouteCode(String routeCode) {
			this.routeCode = routeCode;
		}

		public Stations getStartStation() {
			return startStation;
		}

		public void setStartStation(Stations startStation) {
			this.startStation = startStation;
		}

		public Stations getEndingStation() {
			return endingStation;
		}

		public void setEndingStation(Stations endingStation) {
			this.endingStation = endingStation;
		}

		public String getRouteStatus() {
			return routeStatus;
		}

		public void setRouteStatus(String routeStatus) {
			this.routeStatus = routeStatus;
		}

		public Route(String routeName, String routeCode, Stations startStation, Stations endingStation,
				String routeStatus) {
			super();
			this.routeName = routeName;
			this.routeCode = routeCode;
			this.startStation = startStation;
			this.endingStation = endingStation;
			this.routeStatus = routeStatus;
		}

		public Route() {
			super();
		}
	    
}
