package com.example.userService.Response;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.example.userService.Model.trainTimeStatus;
/*
 * {
  "bookedTicketID":"int",
  "reservedSeatCount":"int",
  "price":"double",
  "timeStamp":"timeStamp",
  "status":"bool",
  "returnLocation":"str",
  "paymentDetails":{
    "id":"int",
    "date":"timestamp",
    "paymentType":"str",
    "service":"str"
  },
  "joneryDetails":{
    "arrivalTime":"datetime",
    "departTime":"datetime",
    "date":"datetime",
    "status":"str",
    "stationName":"str",
    "platformNumber":"int",
    "routeDetails":{
      "routeID":"int",
      "routeName":"str",
      "startingStation":"str",
      "endingStation":"str",
      "routeLocations":[
        {
          "districtName":"str",
          "provience":"str",
          "locationName":"str",
          "stationName":"str"
        }
      ]
    }
  },
  "trainInfo":{
    "id":"int",
    "name":"str"
  },
  "ticketSeats":[
    {
      "seatID":"int",
      "occupation":"bool",
      "expieryStat":"bool",
      "seatCode":"str",
      "className":"str",
      "pricePerson":"str"
    }
  ]
}
 * 
 * */
public class BookedTicketResponse {
    
    private int bookedTicketID;
    private int reservedSeatCount;
    private double price;
    private LocalDate timeStamp;
    private boolean status;
    private String returnLocation;
    private PaymentDetails paymentDetails;
    private JourneyDetails joneryDetails; 
    private TrainInfo trainInfo;
    private List<TicketSeat> ticketSeats;
    
    // Standard Getters and Setters omitted for brevity

    public BookedTicketResponse(int bookedTicketID, int reservedSeatCount, double price, LocalDate localDate,
			boolean status, String returnLocation, PaymentDetails paymentDetails, JourneyDetails joneryDetails,
			TrainInfo trainInfo, List<TicketSeat> ticketSeats) {
		super();
		this.bookedTicketID = bookedTicketID;
		this.reservedSeatCount = reservedSeatCount;
		this.price = price;
		this.timeStamp = localDate;
		this.status = status;
		this.returnLocation = returnLocation;
		this.paymentDetails = paymentDetails;
		this.joneryDetails = joneryDetails;
		this.trainInfo = trainInfo;
		this.ticketSeats = ticketSeats;
	}

	public int getBookedTicketID() {
		return bookedTicketID;
	}

	public void setBookedTicketID(int bookedTicketID) {
		this.bookedTicketID = bookedTicketID;
	}

	public int getReservedSeatCount() {
		return reservedSeatCount;
	}

	public void setReservedSeatCount(int reservedSeatCount) {
		this.reservedSeatCount = reservedSeatCount;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public LocalDate getTimeStamp() {
		return timeStamp;
	}

	public void setTimeStamp(LocalDate timeStamp) {
		this.timeStamp = timeStamp;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getReturnLocation() {
		return returnLocation;
	}

	public void setReturnLocation(String returnLocation) {
		this.returnLocation = returnLocation;
	}

	public PaymentDetails getPaymentDetails() {
		return paymentDetails;
	}

	public void setPaymentDetails(PaymentDetails paymentDetails) {
		this.paymentDetails = paymentDetails;
	}

	public JourneyDetails getJoneryDetails() {
		return joneryDetails;
	}

	public void setJoneryDetails(JourneyDetails joneryDetails) {
		this.joneryDetails = joneryDetails;
	}

	public TrainInfo getTrainInfo() {
		return trainInfo;
	}

	public void setTrainInfo(TrainInfo trainInfo) {
		this.trainInfo = trainInfo;
	}

	public List<TicketSeat> getTicketSeats() {
		return ticketSeats;
	}

	public void setTicketSeats(List<TicketSeat> ticketSeats) {
		this.ticketSeats = ticketSeats;
	}

	public static class PaymentDetails {
        private int id;
        private LocalDate date; 
        private String paymentType;
        private String service;
		public PaymentDetails(int id, LocalDate localDate, String paymentType, String service) {
			super();
			this.id = id;
			this.date = localDate;
			this.paymentType = paymentType;
			this.service = service;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public LocalDate getDate() {
			return date;
		}
		public void setDate(LocalDate date) {
			this.date = date;
		}
		public String getPaymentType() {
			return paymentType;
		}
		public void setPaymentType(String paymentType) {
			this.paymentType = paymentType;
		}
		public String getService() {
			return service;
		}
		public void setService(String service) {
			this.service = service;
		}
    }

    public static class JourneyDetails {
        private LocalTime arrivalTime;
        private LocalTime departTime;
        private LocalDate date;
        private trainTimeStatus status;
        private String stationName;
        private int platformNumber;
        private RouteDetails routeDetails;
		public LocalTime getArrivalTime() {
			return arrivalTime;
		}
		public void setArrivalTime(LocalTime arrivalTime) {
			this.arrivalTime = arrivalTime;
		}
		public LocalTime getDepartTime() {
			return departTime;
		}
		public void setDepartTime(LocalTime departTime) {
			this.departTime = departTime;
		}
		public LocalDate getDate() {
			return date;
		}
		public void setDate(LocalDate date) {
			this.date = date;
		}
		public trainTimeStatus getStatus() {
			return status;
		}
		public void setStatus(trainTimeStatus status) {
			this.status = status;
		}
		public String getStationName() {
			return stationName;
		}
		public void setStationName(String stationName) {
			this.stationName = stationName;
		}
		public int getPlatformNumber() {
			return platformNumber;
		}
		public void setPlatformNumber(int platformNumber) {
			this.platformNumber = platformNumber;
		}
		public RouteDetails getRouteDetails() {
			return routeDetails;
		}
		public void setRouteDetails(RouteDetails routeDetails) {
			this.routeDetails = routeDetails;
		}
		public JourneyDetails(LocalTime localTime, LocalTime departTime, LocalDate date, trainTimeStatus trainTimeStatus,
				String stationName, int platformNumber, RouteDetails routeDetails) {
			super();
			this.arrivalTime = localTime;
			this.departTime = departTime; 
			this.date = date;
			this.status = trainTimeStatus;
			this.stationName = stationName;
			this.platformNumber = platformNumber;
			this.routeDetails = routeDetails;
		}
    }

    public static class RouteDetails {
        private int routeID;
        private String routeName;
        private String startingStation;
        private String endingStation;
        private List<RouteLocation> routeLocations;
		public int getRouteID() {
			return routeID;
		}
		public void setRouteID(int routeID) {
			this.routeID = routeID;
		}
		public String getRouteName() {
			return routeName;
		}
		public void setRouteName(String routeName) {
			this.routeName = routeName;
		}
		public String getStartingStation() {
			return startingStation;
		}
		public void setStartingStation(String startingStation) {
			this.startingStation = startingStation;
		}
		public String getEndingStation() {
			return endingStation;
		}
		public void setEndingStation(String endingStation) {
			this.endingStation = endingStation;
		}
		public List<RouteLocation> getRouteLocations() {
			return routeLocations;
		}
		public void setRouteLocations(List<RouteLocation> routeLocations) {
			this.routeLocations = routeLocations;
		}
		public RouteDetails(int routeID, String routeName, String startingStation, String endingStation,
				List<RouteLocation> routeLocations) {
			super();
			this.routeID = routeID;
			this.routeName = routeName;
			this.startingStation = startingStation;
			this.endingStation = endingStation;
			this.routeLocations = routeLocations;
		}

        // Standard Getters and Setters
    }

    public static class RouteLocation {
        private String districtName;
        private String provience; 
        private String locationName;
        private String stationName;
		public String getDistrictName() {
			return districtName;
		}
		public void setDistrictName(String districtName) {
			this.districtName = districtName;
		}
		public String getProvience() {
			return provience;
		}
		public void setProvience(String provience) {
			this.provience = provience;
		}
		public String getLocationName() {
			return locationName;
		}
		public void setLocationName(String locationName) {
			this.locationName = locationName;
		}
		public String getStationName() {
			return stationName;
		}
		public void setStationName(String stationName) {
			this.stationName = stationName;
		}
		public RouteLocation(String districtName, String provience, String locationName, String stationName) {
			super();
			this.districtName = districtName;
			this.provience = provience;
			this.locationName = locationName;
			this.stationName = stationName;
		}
        
        // Standard Getters and Setters
    }

    public static class TrainInfo {
        private int id;
        private String name;
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public TrainInfo(int id, String name) {
			super();
			this.id = id;
			this.name = name;
		}
    }

    public static class TicketSeat {
        private int seatID;
        private boolean occupation;
        private boolean expieryStat;
        private String seatCode;
        private String className;
        private double pricePerson;
		public int getSeatID() {
			return seatID;
		}
		public void setSeatID(int seatID) {
			this.seatID = seatID;
		}
		public boolean isOccupation() {
			return occupation;
		}
		public void setOccupation(boolean occupation) {
			this.occupation = occupation;
		}
		public boolean isExpieryStat() {
			return expieryStat;
		}
		public void setExpieryStat(boolean expieryStat) {
			this.expieryStat = expieryStat;
		}
		public String getSeatCode() {
			return seatCode;
		}
		public void setSeatCode(String seatCode) {
			this.seatCode = seatCode;
		}
		public String getClassName() {
			return className;
		}
		public void setClassName(String className) {
			this.className = className;
		}
		public double getPricePerson() {
			return pricePerson;
		}
		public void setPricePerson(double pricePerson) {
			this.pricePerson = pricePerson;
		}
		public TicketSeat(int seatID, boolean occupation, boolean expieryStat, String seatCode, String className,
				double d) {
			super();
			this.seatID = seatID;
			this.occupation = occupation;
			this.expieryStat = expieryStat;
			this.seatCode = seatCode;
			this.className = className;
			this.pricePerson = d;
		}

        
    }
}
