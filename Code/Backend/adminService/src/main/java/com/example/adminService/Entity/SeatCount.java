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
@Table(name = "SEAT_COUNT")
public class SeatCount {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEAT_CONT_ID")
    private int seatCountID;
	@Column(name = "SEAT_REMAINING_COUNT")
	private int seatRemainingCount;
	@Column(name = "TOT_CAPACITY")
	private int totCapacity;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TIME_ID", referencedColumnName = "TIME_ID", nullable = false)
	private TrainTime trainTime;
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CLASS_ID", referencedColumnName = "CLASS_ID", nullable = false)
	private TrainSeatClass trainSeatClass;
	public int getSeatCountID() {
		return seatCountID;
	}
	public void setSeatCountID(int seatCountID) {
		this.seatCountID = seatCountID;
	}
	public int getSeatRemainingCount() {
		return seatRemainingCount;
	}
	public void setSeatRemainingCount(int seatRemainingCount) {
		this.seatRemainingCount = seatRemainingCount;
	}
	public int getTotCapacity() {
		return totCapacity;
	}
	public void setTotCapacity(int totCapacity) {
		this.totCapacity = totCapacity;
	}
	public TrainTime getTrainTime() {
		return trainTime;
	}
	public void setTrainTime(TrainTime trainTime) {
		this.trainTime = trainTime;
	}
	public TrainSeatClass getTrainSeatClass() {
		return trainSeatClass;
	}
	public void setTrainSeatClass(TrainSeatClass trainSeatClass) {
		this.trainSeatClass = trainSeatClass;
	}
	public SeatCount(int seatRemainingCount, int totCapacity, TrainTime trainTime, TrainSeatClass trainSeatClass) {
		super();
		this.seatRemainingCount = seatRemainingCount;
		this.totCapacity = totCapacity;
		this.trainTime = trainTime;
		this.trainSeatClass = trainSeatClass;
	}
	public SeatCount() {
		super();
	}
	
}
