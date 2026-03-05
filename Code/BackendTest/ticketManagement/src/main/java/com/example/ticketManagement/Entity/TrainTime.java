package com.example.ticketManagement.Entity;

import java.time.LocalDate;
import java.time.LocalTime;
import jakarta.persistence.*;

@Entity
@Table(name = "TRAIN_TIME")
public class TrainTime {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TIME_ID")
    private int timeID;
    @Column(name = "DEPART_TIME")
    private LocalTime deparTime;
    @Column(name = "ARRIVAL_TIME")
    private LocalTime arrivaLocalTime;
    @Column(name = "DATE_OF_TRAIN")
    private LocalDate dateOfTrain;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROUTE_ID", referencedColumnName = "ROUTE_ID", nullable = false)
    private Route route;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAIN_ID", referencedColumnName = "TRAIN_ID", nullable = false)
    private Trains trains;

    public int getTimeID() { return timeID; }
    public LocalTime getDeparTime() { return deparTime; }
    public LocalTime getArrivaLocalTime() { return arrivaLocalTime; }
    public LocalDate getDateOfTrain() { return dateOfTrain; }
    public Route getRoute() { return route; }
    public Trains getTrains() { return trains; }
}


