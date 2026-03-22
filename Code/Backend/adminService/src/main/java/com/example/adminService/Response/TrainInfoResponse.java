package com.example.adminService.Response;
import com.example.adminService.Entity.trainStats;

public class TrainInfoResponse {

    private int trainId;
    private String name;
    private String reportingNo;
    private String engineCode;
    private Integer serviceStartedYear;
    private Integer manufacturedYear;
    private Double avgSpeed;
    private Double totOperationHours;
    private Integer accidentsCount;
    private int trainSeatsCount;
    private trainStats trainStatus;
    private String trainClassName;

    public TrainInfoResponse() {
    }

    public TrainInfoResponse(int trainId, String name, String reportingNo, String engineCode,
                             Integer serviceStartedYear, Integer manufacturedYear, Double avgSpeed,
                             Double totOperationHours, Integer accidentsCount, int trainSeatsCount,
                             trainStats trainStatus, String trainClassName) {
        this.trainId = trainId;
        this.name = name;
        this.reportingNo = reportingNo;
        this.engineCode = engineCode;
        this.serviceStartedYear = serviceStartedYear;
        this.manufacturedYear = manufacturedYear;
        this.avgSpeed = avgSpeed;
        this.totOperationHours = totOperationHours;
        this.accidentsCount = accidentsCount;
        this.trainSeatsCount = trainSeatsCount;
        this.trainStatus = trainStatus;
        this.trainClassName = trainClassName;
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

    public int getTrainSeatsCount() {
        return trainSeatsCount;
    }

    public void setTrainSeatsCount(int trainSeatsCount) {
        this.trainSeatsCount = trainSeatsCount;
    }

    public trainStats getTrainStatus() {
        return trainStatus;
    }

    public void setTrainStatus(trainStats trainStatus) {
        this.trainStatus = trainStatus;
    }

    public String getTrainClassName() {
        return trainClassName;
    }

    public void setTrainClassName(String trainClassName) {
        this.trainClassName = trainClassName;
    }
}