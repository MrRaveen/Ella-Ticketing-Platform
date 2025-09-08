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
@Table(name = "PLATFORM_INFO")
public class PlatformInfo {
	public enum platformStatus{
		ACTIVE,
		INACTIVE
	}
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PLATFORM_ID")
    private int platformID;
	@Column(name = "PLATFORM_NO")
	private int platforNo;
	@Column(name = "STATUS")
	private platformStatus status;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
	private Stations trainClass;
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
	public platformStatus getStatus() {
		return status;
	}
	public void setStatus(platformStatus status) {
		this.status = status;
	}
	public Stations getTrainClass() {
		return trainClass;
	}
	public void setTrainClass(Stations trainClass) {
		this.trainClass = trainClass;
	}
	public PlatformInfo(int platforNo, platformStatus status, Stations trainClass) {
		super();
		this.platforNo = platforNo;
		this.status = status;
		this.trainClass = trainClass;
	}
	public PlatformInfo() {
		super();
	}
	
}
