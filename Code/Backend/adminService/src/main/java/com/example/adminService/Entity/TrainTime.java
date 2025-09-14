package com.example.adminService.Entity;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TRAIN_TIME")
public class TrainTime {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TIME_ID")
    private int timeID;
	@Column(name = "DEPART_TIME")
	private LocalTime deparTime;
	@Column(name = "DATE_OF_TRAIN")
	private LocalDate dateOfTrain;
	@Column(name = "ARRIVAL_DATE_OF_TRAIN")
	private LocalDate arrivalDateOfTrain;
	@Column(name = "ARRIVAL_TIME")
	private LocalTime arrivaLocalTime;
	@Enumerated(EnumType.STRING)
	@Column(name = "STATUS")
	private trainTimeStatus status;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROUTE_ID", referencedColumnName = "ROUTE_ID", nullable = false)
    private Route route;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAIN_ID", referencedColumnName = "TRAIN_ID", nullable = false)
    private Trains trains;
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PLATFORM_ID", referencedColumnName = "PLATFORM_ID", nullable = false)
    private PlatformInfo platformInfo;
	
	public LocalDate getDateOfTrain() {
		return dateOfTrain;
	}
	public void setDateOfTrain(LocalDate dateOfTrain) {
		this.dateOfTrain = dateOfTrain;
	}
	public LocalDate getArrivalDateOfTrain() {
		return arrivalDateOfTrain;
	}
	public void setArrivalDateOfTrain(LocalDate arrivalDateOfTrain) {
		this.arrivalDateOfTrain = arrivalDateOfTrain;
	}
	public int getTimeID() {
		return timeID;
	}
	public void setTimeID(int timeID) {
		this.timeID = timeID;
	}
	public LocalTime getDeparTime() {
		return deparTime;
	}
	public void setDeparTime(LocalTime deparTime) {
		this.deparTime = deparTime;
	}
	public LocalDate getDate() {
		return dateOfTrain;
	}
	public void setDate(LocalDate dateOfTrain) {
		this.dateOfTrain = dateOfTrain;
	}
	public LocalTime getArrivaLocalTime() {
		return arrivaLocalTime;
	}
	public void setArrivaLocalTime(LocalTime arrivaLocalTime) {
		this.arrivaLocalTime = arrivaLocalTime;
	}
	public trainTimeStatus getStatus() {
		return status;
	}
	public void setStatus(trainTimeStatus status) {
		this.status = status;
	}
	public Route getRoute() {
		return route;
	}
	public void setRoute(Route route) {
		this.route = route;
	}
	public Trains getTrains() {
		return trains;
	}
	public void setTrains(Trains trains) {
		this.trains = trains;
	}
	public PlatformInfo getPlatformInfo() {
		return platformInfo;
	}
	public void setPlatformInfo(PlatformInfo platformInfo) {
		this.platformInfo = platformInfo;
	}
	
	public TrainTime(LocalTime deparTime, LocalDate dateOfTrain, LocalDate arrivalDateOfTrain,
			LocalTime arrivaLocalTime, trainTimeStatus status, Route route, Trains trains, PlatformInfo platformInfo) {
		super();
		this.deparTime = deparTime;
		this.dateOfTrain = dateOfTrain;
		this.arrivalDateOfTrain = arrivalDateOfTrain;
		this.arrivaLocalTime = arrivaLocalTime;
		this.status = status;
		this.route = route;
		this.trains = trains;
		this.platformInfo = platformInfo;
	}
	public TrainTime() {
		super();
	}
	
	
}
