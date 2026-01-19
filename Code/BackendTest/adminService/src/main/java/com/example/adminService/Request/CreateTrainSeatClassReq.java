package com.example.adminService.Request;

import com.fasterxml.jackson.annotation.JsonProperty;

public class CreateTrainSeatClassReq {
	@JsonProperty("pricePerson")
	private double pricePerson;
	@JsonProperty("classNameString")
	private String classNameString;	
	public CreateTrainSeatClassReq(double pricePerson, String classNameString) {
		super();
		this.pricePerson = pricePerson;
		this.classNameString = classNameString;
	}
	public double getPricePerson() {
		return pricePerson;
	}

	public void setPricePerson(double pricePerson) {
		this.pricePerson = pricePerson;
	}

	public String getClassNameString() {
		return classNameString;
	}

	public void setClassNameString(String classNameString) {
		this.classNameString = classNameString;
	}

	public CreateTrainSeatClassReq() {}
}
