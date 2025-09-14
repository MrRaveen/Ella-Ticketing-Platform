package com.example.adminService.Controller;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Entity.Stations;
import com.example.adminService.Entity.TrainInfo;
import com.example.adminService.Entity.Trains;
import com.example.adminService.Entity.trainStats;
import com.example.adminService.Repository.AdminRepo;
import com.example.adminService.Request.AddTrainInfoRequest;
import com.example.adminService.Request.CreatePlatformRequest;
import com.example.adminService.Request.CreateRouteRequest;
import com.example.adminService.Request.CreateStationRequest;
import com.example.adminService.Request.CreateTrainRequest;
import com.example.adminService.Request.CreateTrainTimeRequest;
import com.example.adminService.Request.UpdateStationByID;
import com.example.adminService.Request.UpdateTrainsByIDRequest;
import com.example.adminService.Service.CreateRouteProcess;
import com.example.adminService.Service.CreateTrainService;
import com.example.adminService.Service.CreateTrainTimeService;

@RestController
@RequestMapping("/admin")
//end points for the admin users only
public class AdminController {
	@Autowired
	private CreateTrainService createTrainService;
	@Autowired
	private AdminRepo adminRepo;
	@Autowired
	private CreateTrainTimeService createTrainTimeService;
	@Autowired
	private CreateRouteProcess createRouteProcess;
	@PostMapping("/addTrainInfo")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?> addTrainInfo(@RequestBody AddTrainInfoRequest addTrainInfoRequest){
		try {
			TrainInfo trainInfo = new TrainInfo(addTrainInfoRequest.getName(), addTrainInfoRequest.getReportingNo(),addTrainInfoRequest.getEngineCode(), addTrainInfoRequest.getServiceStartedYear(), addTrainInfoRequest.getManufacturedYear(), addTrainInfoRequest.getAvgSpeed(), addTrainInfoRequest.getTotOperationHours(), addTrainInfoRequest.getAccidentsCount(), addTrainInfoRequest.getTrainStatus(), addTrainInfoRequest.getTrainClass());
			boolean result = createTrainService.createTrainInfoProcess(trainInfo);
			//log the instance
			return ResponseEntity.status(200).body("Train info created");			
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AdminController : addTrainInfo) : " + e.toString());
		}
	}
	@PostMapping("/createStation")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?> createStation(@RequestBody CreateStationRequest createStationRequest){
		try {
			Stations stations = new Stations(createStationRequest.getContactNoString(),createStationRequest.getDistanceFromFort(),createStationRequest.getElevation(),createStationRequest.getStationCodeString(),createStationRequest.getStationCodeString());
			boolean stationSaveResult = createTrainService.createStationProcess(stations);
			if(stationSaveResult == true) {
				return ResponseEntity.status(200).body("Train station created");	
			}else{
				return ResponseEntity.status(502).body("Train station is not created");		
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AdminController : createStation) : " + e.toString());
		}
	}
	@PutMapping("/updateStation")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?> updateStationInfo(@RequestBody UpdateStationByID updateStationByID){
		try {
			Stations stationNew = new Stations(updateStationByID.getContactNoString(),updateStationByID.getDistanceFromFort(),updateStationByID.getElevation(),updateStationByID.getStationCodeString(),updateStationByID.getStationNameString());
			stationNew.setStationID(updateStationByID.getStationID());
			boolean updateResult = createTrainService.updateStationByID(stationNew);
			if(updateResult == true) {
				return ResponseEntity.status(200).body("Station info updated");	
			}else {
				return ResponseEntity.status(502).body("Station info are not updated");	
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AdminController : updateStationInfo) : " + e.toString());
		}
	}
	@DeleteMapping("/RemoveStation")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?> removeStation(@RequestParam int stationID){
		try {
			boolean removeResult = createTrainService.removeStationByID(stationID);
			if (removeResult == true) {
				return ResponseEntity.status(200).body("Station removed");	
			}else {
				return ResponseEntity.status(502).body("Station not removed");	
			}
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Station info are not removed");	
		}
	}
	@GetMapping("/GetAllStations")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?> removeStation(){
		try {
			return ResponseEntity.status(200).body(createTrainService.getAllStations());	
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Station removed");	
		}
	}
	//create trains
	@PostMapping("/createTrains")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?> CreateTrains(@RequestBody CreateTrainRequest createTrainRequest){
		try {
			boolean result = createTrainService.createTrainProcess(createTrainRequest);
			return ResponseEntity.status(200).body("Train created : " + result);	
		}catch (NoSuchElementException e) {
			return ResponseEntity.status(500).body("Some values are empty :" + e.toString());	
		} 
		catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured :" + e.toString());	
		}
	}
	//update trains
	@PutMapping("/updateTrains")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?> UpdateTrainsByID(@RequestBody UpdateTrainsByIDRequest updateTrainsByIDRequest){
		try {
			return ResponseEntity.status(200).body("Train created : " + createTrainService.updateTrainsByID(updateTrainsByIDRequest));	
		}catch (NoSuchElementException e) {
			return ResponseEntity.status(500).body("Some values are empty :" + e.toString());	
		} 
		catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured :" + e.toString());	
		}
	}
	//create platform
	@PostMapping("/createPlatform")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?>createPlatform(@RequestBody CreatePlatformRequest createPlatformRequest){
		try {
			boolean result = createTrainService.createPlatformProcess(createPlatformRequest);
			return ResponseEntity.status(200).body("Data saved : " + result);	
		}catch (NoSuchElementException e) {
			return ResponseEntity.status(500).body("Some values are empty :" + e.toString());	
		}
		catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured :" + e.toString());	
		}
	}
	//create routes
	@PostMapping("/createRoute")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?>createRoute(@RequestBody CreateRouteRequest createRouteRequest){
		try {
			boolean saveResult = createRouteProcess.createRouteProcess(createRouteRequest);
			return ResponseEntity.status(200).body("Data saved : " + saveResult);
		}catch (NoSuchElementException e) {
			return ResponseEntity.status(500).body("Some values are empty :" + e.toString());	
		}
		catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured :" + e.toString());	
		}
	}
	//create train time
	@PostMapping("/createTrainTime")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public ResponseEntity<?>createTrainTime(@RequestBody CreateTrainTimeRequest createTrainTimeRequest){
		try {
			boolean trainTimeSaveResult = createTrainTimeService.createTrainTimeProcess(createTrainTimeRequest);
			return ResponseEntity.status(200).body("Data saved : ");
		}catch (NoSuchElementException e) {
			return ResponseEntity.status(500).body("Some values are empty :" + e.toString());	
		}
		catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured :" + e.toString());	
		}
	}
	@GetMapping("test1")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String test() {
		return "Only admin";
	}
}
