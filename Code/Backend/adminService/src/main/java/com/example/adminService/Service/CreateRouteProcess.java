package com.example.adminService.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adminService.Entity.Route;
import com.example.adminService.Entity.RouteLocations;
import com.example.adminService.Entity.Stations;
import com.example.adminService.Repository.RouteLocationsRepo;
import com.example.adminService.Repository.RouteRepo;
import com.example.adminService.Repository.StationRepo;
import com.example.adminService.Request.CreateRouteRequest;
import com.example.adminService.Request.RouteLocationRequest;

@Service
public class CreateRouteProcess {
	@Autowired
	private RouteRepo route;
	@Autowired
	private RouteLocationsRepo routeLocationsRepo;
	@Autowired
	private StationRepo stationRepo;
	public boolean createRouteProcess(CreateRouteRequest createRouteRequest) throws Exception {
		try {
			Stations startStations = stationRepo.findById(createRouteRequest.getStartStationID()).get();
			Stations endStations = stationRepo.findById(createRouteRequest.getEndStationID()).get();
			Route newRoute = new Route(createRouteRequest.getRouteNameString(), createRouteRequest.getRouteCodeString(), startStations, endStations, "ACTIVE");
			Route createdRoute = route.save(newRoute);
			List<RouteLocationRequest> allRouteLocations = createRouteRequest.getAllRouteLocations();
			allRouteLocations.forEach(routeLocation->{
				Stations station = stationRepo.findById(routeLocation.getStationID()).get();
				RouteLocations newRouteLocation = new RouteLocations(routeLocation.getDistrictName(), routeLocation.getLocationName(), routeLocation.getProvince(), createdRoute, station);
			    routeLocationsRepo.save(newRouteLocation);
			});
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured in (createRouteProcess) : " + e.toString());
		}
	}
}
