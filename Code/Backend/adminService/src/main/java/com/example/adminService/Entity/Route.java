package com.example.adminService.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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

	    @Column(name = "START_STATION")
	    private String startStation;

	    @Column(name = "ENDING_STATION")
	    private String endingStation;

	    @Column(name = "ROUTE_STATUS")
	    private routeStatus routeStatus;

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

		public String getStartStation() {
			return startStation;
		}

		public void setStartStation(String startStation) {
			this.startStation = startStation;
		}

		public String getEndingStation() {
			return endingStation;
		}

		public void setEndingStation(String endingStation) {
			this.endingStation = endingStation;
		}

		public routeStatus getRouteStatus() {
			return routeStatus;
		}

		public void setRouteStatus(routeStatus routeStatus) {
			this.routeStatus = routeStatus;
		}

		public Route(String routeName, String routeCode, String startStation, String endingStation,
				com.example.adminService.Entity.Route.routeStatus routeStatus) {
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
