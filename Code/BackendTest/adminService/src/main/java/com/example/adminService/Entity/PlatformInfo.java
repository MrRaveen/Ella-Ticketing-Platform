package com.example.adminService.Entity;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "PLATFORM_INFO")
public class PlatformInfo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PLATFORM_ID")
    private int platformID;
	@Column(name = "PLATFORM_NO")
	private int platforNo;
	@Column(name = "STATUS")
	private String status;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
	private Stations trainClass;
	@OneToMany(mappedBy = "platformInfo")
    private Set<TrainTime> trainTimes;
	public int getPlatformID() {
		return platformID;
	}
	public void setPlatformID(int platformID) {
		this.platformID = platformID;
	}
	public int getPlatforNo() {
		return platforNo;
	}
	public void setPlatforNo(int platforNo) {
		this.platforNo = platforNo;
	}
	public Stations getTrainClass() {
		return trainClass;
	}
	public void setTrainClass(Stations trainClass) {
		this.trainClass = trainClass;
	}
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public PlatformInfo(int platforNo, String status, Stations trainClass) {
		super();
		this.platforNo = platforNo;
		this.status = status;
		this.trainClass = trainClass;
	}
	public PlatformInfo() {
		super();
	}
	
}
