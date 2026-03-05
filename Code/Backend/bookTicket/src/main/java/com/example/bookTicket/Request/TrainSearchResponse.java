package com.example.bookTicket.Request;

import java.time.LocalTime;
import java.util.List;
/*
 * {
  "trainDetails": [
    {
      "trainName": "Express InterCity 402",
      "startStation":"str",
      "endStation":"str",
      "departureTime": "08:30",
      "arrivalTime": "11:15",
      "stops": [
        "Ragama",
        "Gampaha",
        "Veyangoda",
        "Polgahawela",
        "Peradeniya"
      ],
      "availableClasses": [
        {
          "className": "First Class",
          "price": 1500,
          "seatsLeft": 12,
          "totalCapacity": 40
        },
        {
          "className": "Second Class",
          "price": 800,
          "seatsLeft": 45,
          "totalCapacity": 80
        },
        {
          "className": "Third Class",
          "price": 400,
          "seatsLeft": 120,
          "totalCapacity": 200
        }
      ]
    }
  ]
}
 * */
public class TrainSearchResponse {
    private List<TrainDetail> trainDetails;

    public TrainSearchResponse() {
    }

    public TrainSearchResponse(List<TrainDetail> trainDetails) {
        this.trainDetails = trainDetails;
    }

    public List<TrainDetail> getTrainDetails() {
        return trainDetails;
    }

    public void setTrainDetails(List<TrainDetail> trainDetails) {
        this.trainDetails = trainDetails;
    }

    // Nested TrainDetail Class
    public static class TrainDetail {
        private String trainName;
        private String startStation;
        private String endStation;
        private LocalTime departureTime;
        private LocalTime arrivalTime;
        private List<String> stops;
        private List<AvailableClass> availableClasses;

        public TrainDetail() {
        }

        public TrainDetail(String trainName, String startStation, String endStation, LocalTime departureTime, LocalTime arrivalTime, List<String> stops, List<AvailableClass> availableClasses) {
            this.trainName = trainName;
            this.startStation = startStation;
            this.endStation = endStation;
            this.departureTime = departureTime;
            this.arrivalTime = arrivalTime;
            this.stops = stops;
            this.availableClasses = availableClasses;
        }

        public String getTrainName() {
            return trainName;
        }

        public void setTrainName(String trainName) {
            this.trainName = trainName;
        }

        public String getStartStation() {
            return startStation;
        }

        public void setStartStation(String startStation) {
            this.startStation = startStation;
        }

        public String getEndStation() {
            return endStation;
        }

        public void setEndStation(String endStation) {
            this.endStation = endStation;
        }

        public LocalTime getDepartureTime() {
            return departureTime;
        }

        public void setDepartureTime(LocalTime departureTime) {
            this.departureTime = departureTime;
        }

        public LocalTime getArrivalTime() {
            return arrivalTime;
        }

        public void setArrivalTime(LocalTime arrivalTime) {
            this.arrivalTime = arrivalTime;
        }

        public List<String> getStops() {
            return stops;
        }

        public void setStops(List<String> stops) {
            this.stops = stops;
        }

        public List<AvailableClass> getAvailableClasses() {
            return availableClasses;
        }

        public void setAvailableClasses(List<AvailableClass> availableClasses) {
            this.availableClasses = availableClasses;
        }
    }

    // Nested AvailableClass Class
    public static class AvailableClass {
        private String className;
        private double price;
        private int seatsLeft;
        private int totalCapacity;

        public AvailableClass() {
        }

        public AvailableClass(String className, double price, int seatsLeft, int totalCapacity) {
            this.className = className;
            this.price = price;
            this.seatsLeft = seatsLeft;
            this.totalCapacity = totalCapacity;
        }

        public String getClassName() {
            return className;
        }

        public void setClassName(String className) {
            this.className = className;
        }

        public double getPrice() {
            return price;
        }

        public void setPrice(double price) {
            this.price = price;
        }

        public int getSeatsLeft() {
            return seatsLeft;
        }

        public void setSeatsLeft(int seatsLeft) {
            this.seatsLeft = seatsLeft;
        }

        public int getTotalCapacity() {
            return totalCapacity;
        }

        public void setTotalCapacity(int totalCapacity) {
            this.totalCapacity = totalCapacity;
        }
    }
}
