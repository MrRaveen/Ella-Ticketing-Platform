package com.example.adminService.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

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
@Table(name = "TRAIN_INFO")
public class TrainInfo {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRAIN_ID")
	@JsonProperty("trainId")
    private int trainId;

    @Column(name = "NAME")
    @JsonProperty("name")
    private String name;

    @Column(name = "REPORTING_NO")
    @JsonProperty("reportingNo")
    private String reportingNo;

    @Column(name = "ENGINE_CODE")
    @JsonProperty("engineCode")
    private String engineCode;

    @Column(name = "SERVICE_STARTED_YEAR")
    @JsonProperty("serviceStartedYear")
    private Integer serviceStartedYear;

    @Column(name = "MANUFACTURED_YEAR")
    @JsonProperty("manufacturedYear")
    private Integer manufacturedYear;

    @Column(name = "AVG_SPEED")
    @JsonProperty("avgSpeed")
    private Double avgSpeed;

    @Column(name = "TOT_OPERATION_H")
    @JsonProperty("totOperationHours")
    private Double totOperationHours;

    @Column(name = "ACCIDENT_COUNT")
    @JsonProperty("accidentsCount")
    private Integer accidentsCount;
    
    @Column(name = "TRAIN_SEATS")
    @JsonProperty("trainSeats")
    private int trainSeatsCount;
    
    @Column(name = "TRAIN_STAT")
    @JsonProperty("trainStatus")
    private trainStats trainStatus;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLASS_ID", referencedColumnName = "CLASS_ID", nullable = false)
    @JsonProperty("trainClass")
    private TrainClass trainClass;
    
	public int getTrainSeatsCount() {
		return trainSeatsCount;
	}

	public void setTrainSeatsCount(int trainSeatsCount) {
		this.trainSeatsCount = trainSeatsCount;
	}

	public int getTrainId() {
		return trainId;
	}

	public void setTrainId(int trainId) {
		this.trainId = trainId;
	}

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

	public trainStats getTrainStatus() {
		return trainStatus;
	}

	public void setTrainStatus(trainStats trainStatus) {
		this.trainStatus = trainStatus;
	}

	public TrainClass getTrainClass() {
		return trainClass;
	}

	public void setTrainClass(TrainClass trainClass) {
		this.trainClass = trainClass;
	}

	public TrainInfo(String name, String reportingNo, String engineCode, Integer serviceStartedYear,
			Integer manufacturedYear, Double avgSpeed, Double totOperationHours, Integer accidentsCount,
			trainStats trainStatus, TrainClass trainClass, int trainSeatsCount) {
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
		this.trainSeatsCount = trainSeatsCount;
	}
	public TrainInfo() {
		super();
	}
}
