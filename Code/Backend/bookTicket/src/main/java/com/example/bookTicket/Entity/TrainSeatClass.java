package com.example.bookTicket.Entity;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
@Entity
@Table(name = "TRAIN_SEAT_CLASSES")
public class TrainSeatClass {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CLASS_ID")
	@JsonProperty("classID")
    private int classID;
	@Column(name = "PRICE_PERSON")
	@JsonProperty("pricePerson")
	private double pricePerson;
	@Column(name = "CLASS_NAME")
	@JsonProperty("classNameString")
	private String classNameString;
	public int getClassID() {
		return classID;
	}
	public void setClassID(int classID) {
		this.classID = classID;
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
	public TrainSeatClass(double pricePerson, String classNameString) {
		super();
		this.pricePerson = pricePerson;
		this.classNameString = classNameString;
	}
	public TrainSeatClass() {
		super();
	}
	
}
