package com.example.bookTicket.Entity;

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
@Table(name = "SEAT_INFO")
public class SeatInfo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEAT_ID")
    private Long seatID;
	@Column(name = "OCCUPATION_STAT")
	private boolean occupationStat;
	@Column(name = "EXPIERY_STAT")
	private boolean expieryStat;
	@Column(name = "SEAT_CODE")
	private String seatCode;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CLASS_ID", referencedColumnName = "CLASS_ID", nullable = false)
	private TrainSeatClass trainSeatClass;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TIME_ID", referencedColumnName = "TIME_ID", nullable = false)
	private TrainTime trainTime;
	public SeatInfo() {
		// TODO Auto-generated constructor stub
	}
	public SeatInfo(Long seatID, boolean occupationStat, boolean expieryStat, String seatCode,
			TrainSeatClass trainSeatClass, TrainTime trainTime) {
		super();
		this.seatID = seatID;
		this.occupationStat = occupationStat;
		this.expieryStat = expieryStat;
		this.seatCode = seatCode;
		this.trainSeatClass = trainSeatClass;
		this.trainTime = trainTime;
	}
	public Long getSeatID() {
		return seatID;
	}
	public void setSeatID(Long seatID) {
		this.seatID = seatID;
	}
	public boolean isOccupationStat() {
		return occupationStat;
	}
	public void setOccupationStat(boolean occupationStat) {
		this.occupationStat = occupationStat;
	}
	public boolean isExpieryStat() {
		return expieryStat;
	}
	public void setExpieryStat(boolean expieryStat) {
		this.expieryStat = expieryStat;
	}
	public String getSeatCode() {
		return seatCode;
	}
	public void setSeatCode(String seatCode) {
		this.seatCode = seatCode;
	}
	public TrainSeatClass getTrainSeatClass() {
		return trainSeatClass;
	}
	public void setTrainSeatClass(TrainSeatClass trainSeatClass) {
		this.trainSeatClass = trainSeatClass;
	}
	public TrainTime getTrainTime() {
		return trainTime;
	}
	public void setTrainTime(TrainTime trainTime) {
		this.trainTime = trainTime;
	}
}
