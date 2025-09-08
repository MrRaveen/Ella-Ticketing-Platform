package com.example.adminService.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.style.ToStringCreator;
import org.springframework.stereotype.Service;

import com.example.adminService.Entity.Stations;
import com.example.adminService.Entity.TrainInfo;
import com.example.adminService.Repository.StationRepo;
import com.example.adminService.Repository.TrainInfoRepo;

@Service
public class CreateTrainService {
	@Autowired
	private TrainInfoRepo trainInfoRepo;
	@Autowired
	private StationRepo stationRepo;
	public boolean createTrainInfoProcess(TrainInfo trainInfo) throws Exception {
		try {
			trainInfoRepo.save(trainInfo);
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : createTrainInfoProcess) : " + e.toString());
		}
	}
	public boolean createStationProcess(Stations stations) throws Exception {
		try {
			stations.setStationStatus("ACTIVE");
			Stations stationsNew = stationRepo.save(stations);
			if(stationsNew != null) {
				return true;
			}else {
			    return false;	
			}
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : createStationProcess) : " + e.toString());
		}
	}
	public boolean updateStationByID(Stations stations) throws Exception {
		try {
			Optional<Stations> stationsFound = stationRepo.findById(stations.getStationID());
			if (stationsFound.isPresent()) {
				stationsFound.get().setContactNoString(stations.getContactNoString());
				stationsFound.get().setDistanceFromFort(stations.getDistanceFromFort());
				stationsFound.get().setElevation(stations.getElevation());
				stationsFound.get().setStationCodeString(stations.getStationCodeString());
				stationsFound.get().setStationNameString(stations.getStationNameString());
				stationRepo.save(stationsFound.get());
			    return true;	
			}else {
				return false;
			}
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : updateStationByID) : " + e.toString());
		}
	}
	public boolean removeStationByID(int stationID) throws Exception {
		try {
			Optional<Stations> foundStations = stationRepo.findById(stationID);
			if(foundStations.isPresent()) {
				foundStations.get().setStationStatus("NONE");
				stationRepo.save(foundStations.get());
				return true;
			}else {
				return false;
			}
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : removeStationByID) : " + e.toString());
		}
	}
	public List<Stations> getAllStations() throws Exception {
		try {
			List<Stations> allStationsList = stationRepo.findByStationStatus("ACTIVE");
			return allStationsList;
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : getAllStations) : " + e.toString());
		}
	}
}
