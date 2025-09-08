package com.example.adminService.Request;

import com.example.adminService.Entity.TrainClass;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

public class AddTrainInfoRequest {
	@JsonProperty("Name")
    private String name;
    @JsonProperty("ReportingNo")
    private String reportingNo;
    @JsonProperty("EngineCode")
    private String engineCode;
    @JsonProperty("ServiceStartedYear")
    private Integer serviceStartedYear;
    @JsonProperty("ManufacturedYear")
    private Integer manufacturedYear;
    @JsonProperty("AvgSpeed")
    private Double avgSpeed;
    @JsonProperty("TotOperationHours")
    private Double totOperationHours;
    @JsonProperty("AccidentCount")
    private Integer accidentsCount;
    @JsonProperty("TrainStatus")
    private com.example.adminService.Entity.trainStats trainStatus;
    @JsonProperty("TrainClass")
    private TrainClass trainClass;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getReportingNo() {
		return reportingNo;
	}
	public void setReportingNo(String reportingNo) {
		this.reportingNo = reportingNo;
	}
	public String getEngineCode() {
		return engineCode;
	}
	public void setEngineCode(String engineCode) {
		this.engineCode = engineCode;
	}
	public Integer getServiceStartedYear() {
		return serviceStartedYear;
	}
	public void setServiceStartedYear(Integer serviceStartedYear) {
		this.serviceStartedYear = serviceStartedYear;
	}
	public Integer getManufacturedYear() {
		return manufacturedYear;
	}
	public void setManufacturedYear(Integer manufacturedYear) {
		this.manufacturedYear = manufacturedYear;
	}
	public Double getAvgSpeed() {
		return avgSpeed;
	}
	public void setAvgSpeed(Double avgSpeed) {
		this.avgSpeed = avgSpeed;
	}
	public Double getTotOperationHours() {
		return totOperationHours;
	}
	public void setTotOperationHours(Double totOperationHours) {
		this.totOperationHours = totOperationHours;
	}
	public Integer getAccidentsCount() {
		return accidentsCount;
	}
	public void setAccidentsCount(Integer accidentsCount) {
		this.accidentsCount = accidentsCount;
	}
	public com.example.adminService.Entity.trainStats getTrainStatus() {
		return trainStatus;
	}
	public void setTrainStatus(com.example.adminService.Entity.trainStats trainStatus) {
		this.trainStatus = trainStatus;
	}
	public TrainClass getTrainClass() {
		return trainClass;
	}
	public void setTrainClass(TrainClass trainClass) {
		this.trainClass = trainClass;
	}
	public AddTrainInfoRequest(String name, String reportingNo, String engineCode, Integer serviceStartedYear,
			Integer manufacturedYear, Double avgSpeed, Double totOperationHours, Integer accidentsCount,
			com.example.adminService.Entity.trainStats trainStatus, TrainClass trainClass) {
		super();
		this.name = name;
		this.reportingNo = reportingNo;
		this.engineCode = engineCode;
		this.serviceStartedYear = serviceStartedYear;
		this.manufacturedYear = manufacturedYear;
		this.avgSpeed = avgSpeed;
		this.totOperationHours = totOperationHours;
		this.accidentsCount = accidentsCount;
		this.trainStatus = trainStatus;
		this.trainClass = trainClass;
	}
}
