package com.example.bookTicket.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.bookTicket.Entity.SeatCount;
import com.example.bookTicket.Entity.TrainSeatClass;
import com.example.bookTicket.Entity.TrainTime;
import com.example.bookTicket.Repository.RouteLocationsRepo;
import com.example.bookTicket.Repository.SeatCountRepo;
import com.example.bookTicket.Repository.TrainTimeRepo;
import com.example.bookTicket.Response.AvailabilityClassDTO;
import com.example.bookTicket.Response.AvailabilityTrainDTO;
import com.example.bookTicket.Response.BookingSummaryDTO;

@Service
public class AvailabilityService {
    @Autowired
    private TrainTimeRepo trainTimeRepo;
    @Autowired
    private RouteLocationsRepo routeLocationsRepo;
    @Autowired
    private SeatCountRepo seatCountRepo;

    public List<AvailabilityTrainDTO> search(String leavingStation, String arrivingStation, LocalDate date, int passengerCount) {
        List<AvailabilityTrainDTO> results = new ArrayList<>();
        List<TrainTime> times = trainTimeRepo.findByDateOfTrain(date);
        for (TrainTime tt : times) {
            int routeId = tt.getRoute().getRouteId();
            boolean hasLeave = routeLocationsRepo.existsByRoute_RouteIdAndStations_StationNameString(routeId, leavingStation);
            boolean hasArrive = routeLocationsRepo.existsByRoute_RouteIdAndStations_StationNameString(routeId, arrivingStation);
            if (!hasLeave || !hasArrive) continue;

            List<SeatCount> countsForTime = seatCountRepo.findAll().stream()
                .filter(sc -> sc.getTrainTime().getTimeID() == tt.getTimeID())
                .collect(Collectors.toList());

            List<AvailabilityClassDTO> classDtos = new ArrayList<>();
            for (SeatCount sc : countsForTime) {
                TrainSeatClass c = sc.getTrainSeatClass();
                if (sc.getSeatRemainingCount() >= passengerCount) {
                    classDtos.add(new AvailabilityClassDTO(c.getClassID(), c.getClassNameString(), c.getPricePerson(), sc.getSeatRemainingCount()));
                }
            }
            if (classDtos.isEmpty()) continue;

            AvailabilityTrainDTO dto = new AvailabilityTrainDTO();
            dto.setTrainTimeId(tt.getTimeID());
            dto.setTrainId(tt.getTrains().getTrainID());
            dto.setTrainName(tt.getTrains().getTrainNameString());
            dto.setTravelDate(tt.getDateOfTrain());
            dto.setDepartTime(tt.getDeparTime());
            dto.setArrivalTime(tt.getArrivaLocalTime());
            dto.setRouteFrom(tt.getRoute().getStartStation().getStationNameString());
            dto.setRouteTo(tt.getRoute().getEndingStation().getStationNameString());
            dto.setClasses(classDtos);
            results.add(dto);
        }
        return results;
    }

    public BookingSummaryDTO summary(int trainTimeId, int classId, int passengerCount) {
        TrainTime tt = trainTimeRepo.findById(trainTimeId).orElseThrow();
        // load seat count to get class details and price
        double pricePerPerson = 0.0;
        String className = "";
        for (SeatCount sc : seatCountRepo.findAll()) {
            if (sc.getTrainTime().getTimeID() == trainTimeId && sc.getTrainSeatClass().getClassID() == classId) {
                pricePerPerson = sc.getTrainSeatClass().getPricePerson();
                className = sc.getTrainSeatClass().getClassNameString();
                break;
            }
        }
        BookingSummaryDTO dto = new BookingSummaryDTO();
        dto.setTrainTimeId(trainTimeId);
        dto.setClassId(classId);
        dto.setClassName(className);
        dto.setTrainName(tt.getTrains().getTrainNameString());
        dto.setTravelDate(tt.getDateOfTrain());
        dto.setDepartTime(tt.getDeparTime());
        dto.setArrivalTime(tt.getArrivaLocalTime());
        dto.setPassengerCount(passengerCount);
        dto.setPricePerPerson(pricePerPerson);
        dto.setTotalPrice(pricePerPerson * passengerCount);
        return dto;
    }
}


