package com.example.bookTicket.Entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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
	@ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAIN_INFO_ID", referencedColumnName = "TRAIN_ID")
    private TrainInfo trainInfo;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADMIN_ID", referencedColumnName = "ADMIN_ID", nullable = false)
    private Admin admin;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
    private Stations stations;
	
	@OneToMany(mappedBy = "trains")
    private Set<TrainTime> trainTimes;
	public Trains(String driverNameString, boolean status, String trainNameString, TrainInfo trainInfo,
			Admin admin, Stations stations) {
		super();
		this.driverNameString = driverNameString;
		this.status = status;
		this.trainNameString = trainNameString;
		this.trainInfo = trainInfo;
		this.admin = admin;
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
	public Admin getEmIDEmployee() {
		return admin;
	}
	public void setEmIDEmployee(Admin admin) {
		this.admin = admin;
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
