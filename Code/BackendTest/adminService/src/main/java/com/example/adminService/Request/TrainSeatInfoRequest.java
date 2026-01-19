package com.example.adminService.Request;

import com.example.adminService.Entity.TrainClass;
import com.example.adminService.Entity.TrainInfo;
import com.example.adminService.Entity.TrainSeatClass;
import com.fasterxml.jackson.annotation.JsonProperty;


public class TrainSeatInfoRequest {
	@JsonProperty("seat_count")
	private int seat_count;
	@JsonProperty("trainClass")
	private TrainSeatClass trainSeatClass;
	
	public TrainSeatInfoRequest(int seat_count, TrainSeatClass trainSeatClass) {
		super();
		this.seat_count = seat_count;
		this.trainSeatClass = trainSeatClass;
	}

	public int getSeat_count() {
		return seat_count;
	}

	public void setSeat_count(int seat_count) {
		this.seat_count = seat_count;
	}

	public TrainSeatClass getTrainSeatClass() {
		return trainSeatClass;
	}

	public void setTrainSeatClass(TrainSeatClass trainSeatClass) {
		this.trainSeatClass = trainSeatClass;
	}

	public TrainSeatInfoRequest() {
		// TODO Auto-generated constructor stub
	}
}
