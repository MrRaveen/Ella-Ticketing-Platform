package com.example.adminService.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.adminService.Entity.PlatformInfo;
import com.example.adminService.Entity.Route;
import com.example.adminService.Entity.SeatCount;
import com.example.adminService.Entity.TrainInfo;
import com.example.adminService.Entity.TrainSeatInfo;
import com.example.adminService.Entity.TrainTime;
import com.example.adminService.Entity.Trains;
import com.example.adminService.Entity.trainTimeStatus;
import com.example.adminService.Repository.PlatformRepo;
import com.example.adminService.Repository.RouteRepo;
import com.example.adminService.Repository.SeatCountRepo;
import com.example.adminService.Repository.TrainSeatInfoRepo;
import com.example.adminService.Repository.TrainTimeRepo;
import com.example.adminService.Repository.TrainsRepo;
import com.example.adminService.Request.CreateTrainTimeRequest;

@Service
public class CreateTrainTimeService {
	@Autowired
	private RouteRepo routeRepo;
	@Autowired
	private TrainsRepo trainsRepo;
	@Autowired
	private PlatformRepo platformRepo;
	@Autowired
	private TrainTimeRepo trainTimeRepo;
	@Autowired
	private TrainSeatInfoRepo trainSeatInfoRepo;
	@Autowired
	private SeatCountRepo seatCountRepo;
	public boolean createTrainTimeProcess(CreateTrainTimeRequest creaeCreateTrainTimeRequest) throws Exception {
		try {
			trainTimeStatus currenTimeStatus = trainTimeStatus.ACTIVE;
			if(creaeCreateTrainTimeRequest.getStatus() == "CANCELLED") {
				currenTimeStatus = trainTimeStatus.CANCELLED;
			}else if (creaeCreateTrainTimeRequest.getStatus() == "ACTIVE") {
				currenTimeStatus = trainTimeStatus.ACTIVE;
			}else if (creaeCreateTrainTimeRequest.getStatus() == "COMPLETED") {
				currenTimeStatus = trainTimeStatus.COMPLETED;
			}else if (creaeCreateTrainTimeRequest.getStatus() == "STOPED") {
				currenTimeStatus = trainTimeStatus.STOPED;
			}else {
				currenTimeStatus = trainTimeStatus.CANCELLED;
			}
			Route route = routeRepo.findById(creaeCreateTrainTimeRequest.getRouteID()).
					orElseThrow();
			Trains trains = trainsRepo.findById(creaeCreateTrainTimeRequest.getTrainsID())
					.orElseThrow();
			PlatformInfo platformInfo = platformRepo.findById(creaeCreateTrainTimeRequest.getPlatformID())
					.orElseThrow();
			TrainTime newTrainTime = new TrainTime(creaeCreateTrainTimeRequest.getDepartTime(),
					creaeCreateTrainTimeRequest.getDepartDate(), 
					creaeCreateTrainTimeRequest.getArrivalDate(), 
					creaeCreateTrainTimeRequest.getArrivalTime(), 
					currenTimeStatus, 
					route, trains, platformInfo);
			TrainTime createdObj = trainTimeRepo.save(newTrainTime);
			TrainInfo trainInfo = trains.getTrainInfo();
			List<TrainSeatInfo> seatInformation = trainSeatInfoRepo.findByTrainInfo_TrainId(trainInfo.getTrainId());
			seatInformation.forEach(data -> {
				SeatCount newCount = new SeatCount(data.getSeat_count(), data.getSeat_count(),
						createdObj, data.getTrainClass());
				seatCountRepo.save(newCount);
			});
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured (createTrainTimeProcess) : " + e.toString());
		}
	}
}
