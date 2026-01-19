package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "ROUTE")
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ROUTE_ID")
    private int routeId;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "END_STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
    private Stations startStation;
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "START_STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
    private Stations endingStation;

    public int getRouteId() { return routeId; }
    public Stations getStartStation() { return startStation; }
    public Stations getEndingStation() { return endingStation; }
}


