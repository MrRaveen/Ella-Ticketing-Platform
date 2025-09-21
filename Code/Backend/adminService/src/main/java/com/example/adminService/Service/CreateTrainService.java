package com.example.adminService.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.style.ToStringCreator;
import org.springframework.stereotype.Service;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Entity.PlatformInfo;
import com.example.adminService.Entity.Stations;
import com.example.adminService.Entity.TrainInfo;
import com.example.adminService.Entity.TrainSeatClass;
import com.example.adminService.Entity.TrainSeatInfo;
import com.example.adminService.Entity.Trains;
import com.example.adminService.Repository.AdminRepo;
import com.example.adminService.Repository.PlatformRepo;
import com.example.adminService.Repository.StationRepo;
import com.example.adminService.Repository.TrainInfoRepo;
import com.example.adminService.Repository.TrainSeatClassRepo;
import com.example.adminService.Repository.TrainSeatInfoRepo;
import com.example.adminService.Repository.TrainsRepo;
import com.example.adminService.Request.CreatePlatformRequest;
import com.example.adminService.Request.CreateTrainRequest;
import com.example.adminService.Request.CreateTrainSeatClassReq;
import com.example.adminService.Request.TrainSeatInfoRequest;
import com.example.adminService.Request.UpdateTrainsByIDRequest;

@Service
public class CreateTrainService {
	@Autowired
	private TrainInfoRepo trainInfoRepo;
	@Autowired
	private StationRepo stationRepo;
	@Autowired
	private TrainsRepo trainsRepo;
	@Autowired
	private AdminRepo adminRepo;
	@Autowired
	private TrainSeatInfoRepo trainSeatInfoRepo;
	@Autowired
	private PlatformRepo platformRepo;
	@Autowired
	private TrainSeatClassRepo trainSeatClassRepo;
	public boolean createTrainInfoProcess(TrainInfo trainInfo, List<TrainSeatInfoRequest> trainSeatInfoRequests) throws Exception {
		try {
			TrainInfo createdTrainInfo = trainInfoRepo.save(trainInfo);
			if (trainSeatInfoRequests.isEmpty()) {
				return true;	
			}else {
				trainSeatInfoRequests.forEach(data ->{
					Optional<TrainSeatClass> foundSeatClass = trainSeatClassRepo.findById(data.getTrainSeatClass().getClassID());
					if (foundSeatClass.isPresent()) {
						TrainSeatInfo newTrainSeatInfo = new TrainSeatInfo(data.getSeat_count(), createdTrainInfo, data.getTrainSeatClass());
						trainSeatInfoRepo.save(newTrainSeatInfo);
					}
				});
				return true;
			}
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
	public boolean createTrainProcess(CreateTrainRequest createTrainRequest) throws Exception {
		try {
			Admin currentAdmin = adminRepo.findByUsername(createTrainRequest.getAdminUsername())
					.orElseThrow();
			Stations stations = stationRepo.findById(createTrainRequest.getStationsID())
					.orElseThrow();
			TrainInfo trainInfo = trainInfoRepo.findById(createTrainRequest.getTrainInfoID())
					.orElseThrow();
			Trains newTrains = new Trains(createTrainRequest.getDriverName(), true, createTrainRequest.getTrainName(), trainInfo, currentAdmin, stations);
			Trains createdTrains = trainsRepo.save(newTrains);
			if(createdTrains != null) {
				return true;
			}else {
				return false;
			}
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : createTrainProcess) : " + e.toString());
		}
	}
	public boolean createPlatformProcess(CreatePlatformRequest createPlatformRequest) throws Exception {
		try {
			Stations stations = stationRepo.findById(createPlatformRequest.getStationID()).
					orElseThrow();
			PlatformInfo newPlatformInfo = new PlatformInfo(createPlatformRequest.getPlatformNum(), null, stations);
			if(createPlatformRequest.getStatuString().equals("ACTIVE")) {
				newPlatformInfo.setStatus("ACTIVE");
			}else if (createPlatformRequest.getStatuString().equals("INACTIVE")) {
				newPlatformInfo.setStatus("INACTIVE");
			}else {
				newPlatformInfo.setStatus("ACTIVE");
			}
			PlatformInfo createdPlatformInfo = platformRepo.save(newPlatformInfo);
			if(createdPlatformInfo == null) {
				return false;
			}else {
				return true;
			}
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : createTrainProcess) : " + e.toString());
		}
	}
	public boolean updateTrainsByID(UpdateTrainsByIDRequest updateTrainsByIDRequest) throws Exception {
		try {
			Trains foundTrains = trainsRepo.findById(updateTrainsByIDRequest.getTrainID())
					.orElseThrow();
			Stations foundStations = stationRepo.findById(updateTrainsByIDRequest.getStationsID())
					.orElseThrow();
			TrainInfo foundTrainInfo = trainInfoRepo.findById(updateTrainsByIDRequest.getTrainInfoID())
					.orElseThrow();
			foundTrains.setDriverNameString(updateTrainsByIDRequest.getDriverName());
			foundTrains.setStatus(updateTrainsByIDRequest.isStatus());
			foundTrains.setTrainNameString(updateTrainsByIDRequest.getTrainName());
			foundTrains.setStations(foundStations);
			foundTrains.setTrainInfo(foundTrainInfo);
			trainsRepo.save(foundTrains);
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : createTrainProcess) : " + e.toString());
		}
	}
	public boolean createTrainSeatClass(CreateTrainSeatClassReq createTrainSeatClassReq) throws Exception {
		try {
			TrainSeatClass newTrainSeatClass = new TrainSeatClass(createTrainSeatClassReq.getPricePerson(), createTrainSeatClassReq.getClassNameString());
			trainSeatClassRepo.save(newTrainSeatClass);
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured (CreateTrainService : createTrainSeatClass) : " + e.toString());
		}
	}
}
