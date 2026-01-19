package com.example.bookTicket.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TRAIN_SEAT_INFO")
public class TrainSeatInfo {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Long id;
	@Column(name = "SEAT_COUNT")
	private int seat_count;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "TRAIN_ID", referencedColumnName = "TRAIN_ID", nullable = false)
	private TrainInfo trainInfo;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "CLASS_ID", referencedColumnName = "CLASS_ID", nullable = false)
	private TrainSeatClass trainSeatClass;
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getSeat_count() {
		return seat_count;
	}

	public void setSeat_count(int seat_count) {
		this.seat_count = seat_count;
	}

	public TrainInfo getTrainInfo() {
		return trainInfo;
	}

	public void setTrainInfo(TrainInfo trainInfo) {
		this.trainInfo = trainInfo;
	}

	public TrainSeatClass getTrainClass() {
		return trainSeatClass;
	}

	public void setTrainClass(TrainSeatClass trainClass) {
		this.trainSeatClass = trainSeatClass;
	}

	public TrainSeatInfo(int seat_count, TrainInfo trainInfo, TrainSeatClass trainSeatClass) {
		super();
		this.seat_count = seat_count;
		this.trainInfo = trainInfo;
		this.trainSeatClass = trainSeatClass;
	}

	public TrainSeatInfo() {}
}
