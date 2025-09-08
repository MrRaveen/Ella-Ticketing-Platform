package com.example.adminService.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TRAINS")
public class Trains {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRAIN_ID")
    private int trainID;
	@Column(name = "DRIVER_NAME")
	private String driverNameString;
	@Column(name = "STATUS")
	private boolean status;
	@Column(name = "TRAIN_NAME")
	private String trainNameString;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAIN_ID", referencedColumnName = "TRAIN_ID", nullable = false)
    private TrainInfo trainInfo;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "EMPLOYEE_ID", referencedColumnName = "EMPLOYEE_ID", nullable = false)
    private NormalEmployee emIDEmployee;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
    private Stations stations;
	public Trains(String driverNameString, boolean status, String trainNameString, TrainInfo trainInfo,
			NormalEmployee emIDEmployee, Stations stations) {
		super();
		this.driverNameString = driverNameString;
		this.status = status;
		this.trainNameString = trainNameString;
		this.trainInfo = trainInfo;
		this.emIDEmployee = emIDEmployee;
		this.stations = stations;
	}
	public int getTrainID() {
		return trainID;
	}
	public void setTrainID(int trainID) {
		this.trainID = trainID;
	}
	public String getDriverNameString() {
		return driverNameString;
	}
	public void setDriverNameString(String driverNameString) {
		this.driverNameString = driverNameString;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getTrainNameString() {
		return trainNameString;
	}
	public void setTrainNameString(String trainNameString) {
		this.trainNameString = trainNameString;
	}
	public TrainInfo getTrainInfo() {
		return trainInfo;
	}
	public void setTrainInfo(TrainInfo trainInfo) {
		this.trainInfo = trainInfo;
	}
	public NormalEmployee getEmIDEmployee() {
		return emIDEmployee;
	}
	public void setEmIDEmployee(NormalEmployee emIDEmployee) {
		this.emIDEmployee = emIDEmployee;
	}
	public Stations getStations() {
		return stations;
	}
	public void setStations(Stations stations) {
		this.stations = stations;
	}
	public Trains() {
		super();
	}
	
}
