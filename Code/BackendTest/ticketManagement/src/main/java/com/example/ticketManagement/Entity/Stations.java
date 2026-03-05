package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "STATIONS")
public class Stations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "STATION_ID")
    private int stationID;
    @Column(name = "STATION_NAME")
    private String stationNameString;

    public int getStationID() { return stationID; }
    public String getStationNameString() { return stationNameString; }
}


