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
import com.example.bookTicket.Response.GetAllLocationsRes;

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
    public List<GetAllLocationsRes> getAllStationNames() {
        try {
            List<RouteLocations> allRouteLocations = routeLocationsRepo.findAll();
            List<GetAllLocationsRes> returningData = new ArrayList<>();
            
            allRouteLocations.forEach(st -> {
                GetAllLocationsRes stationRes = new GetAllLocationsRes(
                    st.getLocationID(),
                    st.getLocationNameString()
                );
                returningData.add(stationRes);
            });
            
            return returningData;
        } catch (Exception e) {
            System.err.println("Error in getAllStationNames: " + e.getMessage());
            return new ArrayList<>();
        }
    }
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
                        int trainTimeID = tr.getTimeID();
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
                            		counts.getTrainSeatClass().getClassID(),
                                    counts.getTrainSeatClass().getClassNameString(),
                                    counts.getTrainSeatClass().getPricePerson(),
                                    counts.getSeatRemainingCount(), 
                                    counts.getTotCapacity());
                            allClassesDetails.add(classObj);
                        }

                        // Final object creation
                        TrainDetail detail = new TrainDetail(
                        		trainTimeID,
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

