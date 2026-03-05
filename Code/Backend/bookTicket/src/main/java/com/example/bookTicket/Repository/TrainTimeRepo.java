package com.example.bookTicket.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.TrainTime;
@Repository
public interface TrainTimeRepo extends JpaRepository<TrainTime, Integer> {
	List<TrainTime> findByRoute_RouteIdAndArrivalDateOfTrainAndArrivaLocalTimeGreaterThanEqual(
	        int routeId, 
	        LocalDate arrivalDateOfTrain, 
	        LocalTime arrivaLocalTime
	    );
}
