package com.example.adminService.Entity;

import java.time.LocalTime;

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
@Table(name = "AUTO_DAY_SETTINGS")
public class AutoDaySettings {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SETTINGS_ID")
    private int settingsID;
	@Column(name = "START_TIME")
	private LocalTime time;
	@Column(name = "END_TIME")
	private LocalTime endRLocalTime;
	@Column(name = "DAY_NAME")
	private String dayNameString;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TRAIN_ID", referencedColumnName = "TRAIN_ID", nullable = false)
    private Trains trains;
	public int getSettingsID() {
		return settingsID;
	}
	public void setSettingsID(int settingsID) {
		this.settingsID = settingsID;
	}
	public LocalTime getTime() {
		return time;
	}
	public void setTime(LocalTime time) {
		this.time = time;
	}
	public LocalTime getEndRLocalTime() {
		return endRLocalTime;
	}
	public void setEndRLocalTime(LocalTime endRLocalTime) {
		this.endRLocalTime = endRLocalTime;
	}
	public String getDayNameString() {
		return dayNameString;
	}
	public void setDayNameString(String dayNameString) {
		this.dayNameString = dayNameString;
	}
	public Trains getTrains() {
		return trains;
	}
	public void setTrains(Trains trains) {
		this.trains = trains;
	}
	public AutoDaySettings(LocalTime time, LocalTime endRLocalTime, String dayNameString, Trains trains) {
		super();
		this.time = time;
		this.endRLocalTime = endRLocalTime;
		this.dayNameString = dayNameString;
		this.trains = trains;
	}
	public AutoDaySettings() {
		super();
	}
	
}
