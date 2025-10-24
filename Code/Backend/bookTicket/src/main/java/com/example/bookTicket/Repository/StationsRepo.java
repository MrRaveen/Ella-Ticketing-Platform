package com.example.bookTicket.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.Stations;
@Repository
public interface StationsRepo extends JpaRepository<Stations, Integer> {
	List<Stations> findByStationNameString(String stationNameString);
}
