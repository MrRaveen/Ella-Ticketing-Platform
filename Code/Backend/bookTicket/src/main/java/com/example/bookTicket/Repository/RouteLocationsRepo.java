package com.example.bookTicket.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.RouteLocations;
@Repository
public interface RouteLocationsRepo extends JpaRepository<RouteLocations, Integer> {
	List<RouteLocations> findByLocationNameString(String locationNameString);
	List<RouteLocations> findByRoute_RouteId(int routeId);
}
