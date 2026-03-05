package com.example.bookTicket.Response;

public class AvailabilityClassDTO {
    private int classId;
    private String className;
    private double pricePerPerson;
    private int seatsAvailable;

    public AvailabilityClassDTO() {}
    public AvailabilityClassDTO(int classId, String className, double pricePerPerson, int seatsAvailable) {
        this.classId = classId;
        this.className = className;
        this.pricePerPerson = pricePerPerson;
        this.seatsAvailable = seatsAvailable;
    }
    public int getClassId() { return classId; }
    public void setClassId(int classId) { this.classId = classId; }
    public String getClassName() { return className; }
    public void setClassName(String className) { this.className = className; }
    public double getPricePerPerson() { return pricePerPerson; }
    public void setPricePerPerson(double pricePerPerson) { this.pricePerPerson = pricePerPerson; }
    public int getSeatsAvailable() { return seatsAvailable; }
    public void setSeatsAvailable(int seatsAvailable) { this.seatsAvailable = seatsAvailable; }
}


