package com.example.userService.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.userService.Model.BookedTickets;
import com.example.userService.Model.PaymentHistory;
import com.example.userService.Model.PlatformInfo;
import com.example.userService.Model.Route;
import com.example.userService.Model.RouteLocations;
import com.example.userService.Model.Stations;
import com.example.userService.Model.TicketSeats;
import com.example.userService.Model.TrainTime;
import com.example.userService.Model.Trains;
import com.example.userService.Repositories.BookedTicketsRepo;
import com.example.userService.Repositories.PaymentHistoryRepo;
import com.example.userService.Repositories.PlatformInfoRepo;
import com.example.userService.Repositories.RouteLocationsRepo;
import com.example.userService.Repositories.RouteRepo;
import com.example.userService.Repositories.StationsRepo;
import com.example.userService.Repositories.TicketSeatRepo;
import com.example.userService.Repositories.TrainTimeRepo;
import com.example.userService.Response.BookedTicketResponse;
import com.example.userService.Response.BookedTicketResponse.JourneyDetails;
import com.example.userService.Response.BookedTicketResponse.PaymentDetails;
import com.example.userService.Response.BookedTicketResponse.RouteDetails;
import com.example.userService.Response.BookedTicketResponse.RouteLocation;
import com.example.userService.Response.BookedTicketResponse.TicketSeat;
import com.example.userService.Response.BookedTicketResponse.TrainInfo;
@Service
public class GetAllTicketInfo {
	@Autowired
	private BookedTicketsRepo bookedTicketsRepo;
	@Autowired
	private PaymentHistoryRepo paymentHistoryRepo;
	@Autowired
	private TrainTimeRepo trainTimeRepo;
	@Autowired
	private PlatformInfoRepo platformInfoRepo;
	@Autowired
	private StationsRepo stationsRepo;
	@Autowired
	private RouteRepo routeRepo;
	@Autowired
	private RouteLocationsRepo routeLocationsRepo;
	@Autowired
	private TicketSeatRepo ticketSeatRepo;
	public List<BookedTicketResponse> getProcess(Integer userIDString,boolean getCancelled) throws Exception {
		try {
			List<BookedTicketResponse>resList = new ArrayList<BookedTicketResponse>();
			List<BookedTickets> bookedTickets = new ArrayList<BookedTickets>();
			if (getCancelled) {
				 bookedTickets = bookedTicketsRepo.findByUserID_AccountIdAndStatusFalse(userIDString);
			} else {
				 bookedTickets = bookedTicketsRepo.findByUserID_AccountId(userIDString);
			}
			if(bookedTickets.isEmpty()) {
				throw new Exception("There are no booked tickets");
			}
			//each booked row
			bookedTickets.forEach(ticket -> {
				/*
				 * "bookedTicketID":"int",
				  "reservedSeatCount":"int",
				  "price":"double",
				  "timeStamp":"timeStamp",
				  "status":"bool",
				  "returnLocation":"str",
				 * */
				Long paymentHistoryID = Optional.ofNullable(ticket.getPaymentHistory())
				        .map(PaymentHistory::getId)
				        .orElseThrow(() -> new IllegalArgumentException("Payment History ID not found"));
				PaymentHistory paymentHistory = paymentHistoryRepo.findById(Math.toIntExact(paymentHistoryID))
						.orElseThrow(() -> new RuntimeException("Payment record not found"));
				PaymentDetails sendingPaymentDetails=new PaymentDetails(Math.toIntExact(paymentHistory.getId()),
						paymentHistory.getTimeDate(), paymentHistory.getPaymentType(), paymentHistory.getServiceName());
				/*
				 * "paymentDetails":{
				    "id":"int",
				    "date":"timestamp",
				    "paymentType":"str",
				    "service":"str"
				  },
				 * */
				int trainTimeID = Optional.ofNullable(ticket.getTrainTime())
				        .map(TrainTime::getTimeID)
				        .orElseThrow(() -> new IllegalArgumentException("Train time ID not found"));
				TrainTime trainTime = trainTimeRepo.findById(trainTimeID)
						.orElseThrow(() -> new RuntimeException("Train time row is not found"));
				/*
				 "arrivalTime":"datetime",
			    "departTime":"datetime",
			    "date":"datetime",
			    "status":"str",
				 * */
				int platformInfoID = Optional.ofNullable(trainTime.getPlatformInfo())
				        .map(PlatformInfo::getPlatformID)
				        .orElseThrow(() -> new IllegalArgumentException("Platfrom ID not found"));
				PlatformInfo platformInfo = platformInfoRepo.findById(platformInfoID)
						.orElseThrow(()-> new RuntimeException("Platform row is not found"));
				//"platformNumber":"int",
				int stationID = Optional.ofNullable(platformInfo.getTrainClass())
				        .map(Stations::getStationID)
				        .orElseThrow(() -> new IllegalArgumentException("Station ID not found"));
				Stations stations = stationsRepo.findById(stationID)
						.orElseThrow(()-> new RuntimeException("Station row is not found"));
				//"stationName":"str",
				int routeID = Optional.ofNullable(trainTime.getRoute())
				        .map(Route::getRouteId)
				        .orElseThrow(() -> new IllegalArgumentException("Route ID not found"));
				Route route = routeRepo.findById(routeID)
						.orElseThrow(() -> new IllegalArgumentException("Route row is not found"));
				/*
				 *  "routeID":"int",
	      "routeName":"str",
	      "startingStation":"str",
	      "endingStation":"str",
				 * */
				List<RouteLocations>routeLocations = routeLocationsRepo.findByRoute_RouteId(routeID);
				List<RouteLocation>routeLocationList = new ArrayList<BookedTicketResponse.RouteLocation>();
				routeLocations.forEach(singleRoute -> {
					String stationNameString = Optional.ofNullable(singleRoute.getStations())
					        .map(Stations::getStationNameString)
					        .orElseThrow(() -> new IllegalArgumentException("Station name not found"));
					RouteLocation locationEntry = new RouteLocation(singleRoute.getDistrictNameString(),
							singleRoute.getProvinceString(),
							singleRoute.getLocationNameString(), stationNameString);
					routeLocationList.add(locationEntry);
				});
				/*
				 "routeLocations":[
			        {
			          "districtName":"str",
			          "provience":"str",
			          "locationName":"str",
			          "stationName":"str"
			        }
			      ]
				 * */
				RouteDetails routeDetails = new RouteDetails(route.getRouteId(),
						route.getRouteName(),
						route.getStartStation().getStationNameString(),
						route.getEndingStation().getStationNameString(),
						routeLocationList);
				JourneyDetails details = new JourneyDetails(trainTime.getArrivaLocalTime(),
						trainTime.getDeparTime(),
						trainTime.getDate(),
						trainTime.getStatus(),
						stations.getStationNameString(),
						platformInfo.getPlatforNo(),
						routeDetails);
				Trains trainsObjTrains = Optional.ofNullable(ticket.getTrains())
				        .orElseThrow(() -> new IllegalArgumentException("Trains object from ticket row not found"));
				TrainInfo trainInfo = new TrainInfo(trainsObjTrains.getTrainID(), trainsObjTrains.getTrainNameString());
				/*
				 *  "trainInfo":{
	    "id":"int",
	    "name":"str"
	  },
				 * */
				List<TicketSeat>allTicketSeatsObj = new ArrayList<TicketSeat>();//returning data (from different models)
				List<TicketSeats>allTicketSeatsOriginaList = ticketSeatRepo.findByBookedTickets_TicketID(ticket.getTicketID());
				allTicketSeatsOriginaList.forEach(singleTicketSeat -> {
					TicketSeat seat = new TicketSeat(Math.toIntExact(singleTicketSeat.getS_id()), 
							singleTicketSeat.getSeatInfo().isOccupationStat(),
							singleTicketSeat.getSeatInfo().isExpieryStat(), 
							singleTicketSeat.getSeatInfo().getSeatCode(),
							singleTicketSeat.getSeatInfo().getTrainSeatClass().getClassNameString(),
							singleTicketSeat.getSeatInfo().getTrainSeatClass().getPricePerson());
					allTicketSeatsObj.add(seat);
				});
				/*
				 * "ticketSeats":[
					    {
					      "seatID":"int",
					      "occupation":"bool",
					      "expieryStat":"bool",
					      "seatCode":"str",
					      "className":"str",
					      "pricePerson":"str"
					    }
					  ]
				 * */
				BookedTicketResponse resObj = new BookedTicketResponse(ticket.getTicketID(),
						ticket.getReservedSeatCont(),
						ticket.getPrice(), 
						ticket.getDateOfBook(), 
						ticket.isStatus(),
						ticket.getReturnLocationString().getStationNameString(),
						sendingPaymentDetails,
						details, 
						trainInfo,
						allTicketSeatsObj);
				resList.add(resObj);
			});
			return resList;
			/*
			 *get the booking row
			 *get the payment row --> booking row
			 *get train time row --> booking row
			 *get platform number --> train time
			 *station info --> platform row
			 *route details --> train time row
			 *route locations --> route row
			 *route locations (station name) --> route locations row
			 *train info (trains) --> booking row
			 *ticket seats --> booking row
			 *seat info --> ticket seats row 
			 *class info --> seats info
			 * */
		}catch (Exception e) {
			throw new Exception("Error occured when selecting tickets: " + e.toString());
		}
	}
}
