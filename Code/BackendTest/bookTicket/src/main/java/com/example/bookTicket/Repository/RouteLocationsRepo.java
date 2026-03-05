package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.RouteLocations;

@Repository
public interface RouteLocationsRepo extends JpaRepository<RouteLocations, Integer> {
    boolean existsByRoute_RouteIdAndStations_StationNameString(int routeId, String stationNameString);
}


