package com.example.userService.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.RouteLocations;

@Repository
public interface RouteLocationsRepo extends JpaRepository<RouteLocations, Integer> {
    List<RouteLocations> findByRoute_RouteId(int routeId);
}
