package com.example.bookTicket.Service;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookTicket.Entity.Route;
import com.example.bookTicket.Entity.RouteLocations;
import com.example.bookTicket.Entity.SeatCount;
import com.example.bookTicket.Entity.Stations;
import com.example.bookTicket.Entity.TrainTime;
import com.example.bookTicket.Entity.Trains;
import com.example.bookTicket.Repository.RouteLocationsRepo;
import com.example.bookTicket.Repository.SeatCountRepo;
import com.example.bookTicket.Repository.StationsRepo;
import com.example.bookTicket.Repository.TrainTimeRepo;
import com.example.bookTicket.Repository.TrainsRepo;
import com.example.bookTicket.Request.TicketSearchRequest;
import com.example.bookTicket.Request.TrainSearchResponse;
import com.example.bookTicket.Request.TrainSearchResponse.AvailableClass;
import com.example.bookTicket.Request.TrainSearchResponse.TrainDetail;

@Service
public class GetTrainData {
    
    @Autowired
    private RouteLocationsRepo routeLocationsRepo;
    @Autowired
    private TrainTimeRepo trainTimeRepo;
    @Autowired 
    private SeatCountRepo seatCountRepo;
    @Autowired
    private TrainsRepo trainsRepo;
    @Autowired
    private StationsRepo stationsRepo;

    public TrainSearchResponse getProcess(TicketSearchRequest ticketSearchData) throws Exception {
        try {
            List<TrainDetail> trainDetails = new ArrayList<>();
            List<Route> allSelectedRoutes = new ArrayList<>();
            Set<Integer> processedRouteIds = new HashSet<>(); // Tracks unique routes

            List<RouteLocations> fromLocations = routeLocationsRepo.findByLocationNameString(ticketSearchData.getFromLocation());
            List<RouteLocations> toLocations = routeLocationsRepo.findByLocationNameString(ticketSearchData.getToLocation());

            if (fromLocations.isEmpty() || toLocations.isEmpty()) {
                throw new Exception("Routes are not found. Try different locations");
            }

            // Get unique route IDs to prevent duplicate JSON objects
            for (RouteLocations fromObj : fromLocations) {
                Route route = fromObj.getRoute();
                if (route == null) {
                    continue; 
                }
                for (RouteLocations t : toLocations) {
                    Route route2 = t.getRoute();
                    if (route2 != null && route.getRouteId() == route2.getRouteId()) {
                        // Set.add() returns true only if the ID is not already present
                        if (processedRouteIds.add(route.getRouteId())) {
                            allSelectedRoutes.add(route);
                        }
                    }
                }
            }

            // Get the train time data according to route IDs
            for (Route singleRoute : allSelectedRoutes) {
                List<TrainTime> trainTimes = trainTimeRepo.findByRoute_RouteIdAndArrivalDateOfTrainAndArrivaLocalTimeGreaterThanEqual(
                        singleRoute.getRouteId(),
                        ticketSearchData.getDate(), 
                        ticketSearchData.getTimeFrom());

                if (!trainTimes.isEmpty()) {
                    for (TrainTime tr : trainTimes) {
                        // Prevent NullPointerException if train relationship is missing
                        if (tr.getTrains() == null) {
                            continue;
                        }

                        Trains trains = trainsRepo.findById(tr.getTrains().getTrainID()).orElseThrow();
                        String trainNameString = trains.getTrainNameString();
                        
                        Stations stations = stationsRepo.findById(singleRoute.getStartStation().getStationID()).orElseThrow();
                        Stations stationsEnd = stationsRepo.findById(singleRoute.getEndingStation().getStationID()).orElseThrow();
                        
                        String startStationString = stations.getStationNameString();
                        String endStationString = stationsEnd.getStationNameString();
                        LocalTime depatureLocalTime = tr.getDeparTime();
                        LocalTime arrivaLocalTime = tr.getArrivaLocalTime();
                        
                        List<RouteLocations> allLocationObjects = routeLocationsRepo.findByRoute_RouteId(singleRoute.getRouteId());
                        List<String> allStopStationNameStrings = new ArrayList<>();
                        List<AvailableClass> allClassesDetails = new ArrayList<>();
                        
                        if (!allLocationObjects.isEmpty()) {
                            for (RouteLocations locations : allLocationObjects) {
                                allStopStationNameStrings.add(locations.getLocationNameString());
                            }
                        }

                        // Seat count creation
                        List<SeatCount> allCounts = seatCountRepo.findByTrainTime_TimeID(tr.getTimeID());
                        for (SeatCount counts : allCounts) {
                            AvailableClass classObj = new AvailableClass(
                                    counts.getTrainSeatClass().getClassNameString(),
                                    counts.getTrainSeatClass().getPricePerson(),
                                    counts.getSeatRemainingCount(), 
                                    counts.getTotCapacity());
                            allClassesDetails.add(classObj);
                        }

                        // Final object creation
                        TrainDetail detail = new TrainDetail(
                                trainNameString, 
                                startStationString,
                                endStationString,
                                depatureLocalTime,
                                arrivaLocalTime,
                                allStopStationNameStrings,
                                allClassesDetails);
                        trainDetails.add(detail);
                    }
                }
            }
            
            return new TrainSearchResponse(trainDetails);
            
        } catch (Exception e) {
            throw new Exception("Error occured when selecting train details: " + e.getMessage(), e);
        }
    }
}

//package com.example.bookTicket.Service;
//
//import java.time.LocalTime;
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.example.bookTicket.Entity.Route;
//import com.example.bookTicket.Entity.RouteLocations;
//import com.example.bookTicket.Entity.SeatCount;
//import com.example.bookTicket.Entity.Stations;
//import com.example.bookTicket.Entity.TrainTime;
//import com.example.bookTicket.Entity.Trains;
//import com.example.bookTicket.Repository.RouteLocationsRepo;
//import com.example.bookTicket.Repository.SeatCountRepo;
//import com.example.bookTicket.Repository.StationsRepo;
//import com.example.bookTicket.Repository.TrainTimeRepo;
//import com.example.bookTicket.Repository.TrainsRepo;
//import com.example.bookTicket.Request.TicketSearchRequest;
//import com.example.bookTicket.Request.TrainSearchResponse;
//import com.example.bookTicket.Request.TrainSearchResponse.AvailableClass;
//import com.example.bookTicket.Request.TrainSearchResponse.TrainDetail;
//
//@Service
//public class GetTrainData {
//	@Autowired
//	private RouteLocationsRepo routeLocationsRepo;
//	@Autowired
//	private TrainTimeRepo trainTimeRepo;
//	@Autowired 
//	private SeatCountRepo seatCountRepo;
//	@Autowired
//	private TrainsRepo trainsRepo;
//	@Autowired
//	private StationsRepo stationsRepo;
//	public TrainSearchResponse getProcess(TicketSearchRequest ticketSearchData) throws Exception {
//		try {
//			List<TrainDetail>trainDetails = new ArrayList<TrainDetail>();//returning response
//			List<Route>allSelectedRoutes = new ArrayList<Route>();
//			List<RouteLocations>fromLocations = routeLocationsRepo.findByLocationNameString(ticketSearchData.getFromLocation());
//			List<RouteLocations>toLocations = routeLocationsRepo.findByLocationNameString(ticketSearchData.getToLocation());
//			if (fromLocations.isEmpty() || toLocations.isEmpty()) {
//				throw new Exception("Routes are not found. Try different locations");
//			} else {
//				//get the route ID that can go with it
//				fromLocations.forEach(fromObj -> {
//				    Route route = fromObj.getRoute();
//				    if (route == null) {
//				        return; 
//				    }
//				    toLocations.forEach(t -> {
//				        Route route2 = t.getRoute();
//				        if (route2 != null && route.getRouteId() == route2.getRouteId()) {
//				        	allSelectedRoutes.add(route);
//				        }
//				    });
//				});
//				//get the train time data according to route ID's
//				allSelectedRoutes.forEach(singleRoute -> {
//					List<TrainTime> trainTimes = trainTimeRepo.findByRoute_RouteIdAndArrivalDateOfTrainAndArrivaLocalTimeGreaterThanEqual(
//							singleRoute.getRouteId(),
//							ticketSearchData.getDate(), ticketSearchData.getTimeFrom());
//					if (!trainTimes.isEmpty()) {
//						trainTimes.forEach(tr -> {
////							String trainNameString = tr.getTrains().getTrainNameString();
//							Trains trains = trainsRepo.findById(tr.getTrains().getTrainID()).orElseThrow();
//							String trainNameString = trains.getTrainNameString();
//						    Stations stations = stationsRepo.findById(singleRoute.getStartStation().getStationID())
//						    		.orElseThrow();
//						    Stations stationsEnd = stationsRepo.findById(singleRoute.getEndingStation().getStationID())
//						    		.orElseThrow();
////							String startStationString = singleRoute.getStartStation().getStationNameString();
////							String endStationString = singleRoute.getEndingStation().getStationNameString();
//						    String startStationString = stations.getStationNameString();
//							String endStationString = stationsEnd.getStationNameString();
//							LocalTime depatureLocalTime = tr.getDeparTime();
//							LocalTime arrivaLocalTime = tr.getArrivaLocalTime();
//							List<RouteLocations> allLocationObjects = routeLocationsRepo.findByRoute_RouteId(singleRoute.getRouteId());
//							List<String>allStopStationNameStrings = new ArrayList<String>();//location array
//							List<AvailableClass>allClassesDetails = new ArrayList<TrainSearchResponse.AvailableClass>();//class details
//							if (!allLocationObjects.isEmpty()) {
//								allLocationObjects.forEach(locations -> {
//									allStopStationNameStrings.add(locations.getLocationNameString());
//								});
//							}
//							//seat count creation
//							List<SeatCount> allCounts = seatCountRepo.findByTrainTime_TimeID(tr.getTimeID());
//							allCounts.forEach(counts -> {
//								AvailableClass classObj = new AvailableClass(counts.getTrainSeatClass().getClassNameString(),
//										counts.getTrainSeatClass().getPricePerson(),
//										counts.getSeatRemainingCount(), 
//										counts.getTotCapacity());
//								allClassesDetails.add(classObj);
//							});
//							//final object creation
//							TrainDetail detail = new TrainDetail(
//									trainNameString, 
//									startStationString,
//									endStationString,
//									depatureLocalTime,
//									arrivaLocalTime,
//									allStopStationNameStrings,
//									allClassesDetails);
//							trainDetails.add(detail);
//						});	
//					}
//				});
//			}
//			TrainSearchResponse res = new TrainSearchResponse(trainDetails);
//			return res;
//		} catch (Exception e) {
//			throw new Exception("Error occured when selecting train details" + e.toString());
//		}
//	}
//}
