package com.example.adminService.Repository;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.adminService.Entity.Stations;

@Repository
public interface StationRepo extends JpaRepository<Stations, Integer>{
	List<Stations> findByStationStatus(String stationStatus);
}
