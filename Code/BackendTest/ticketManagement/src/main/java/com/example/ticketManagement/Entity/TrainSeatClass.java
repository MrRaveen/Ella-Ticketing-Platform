package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TRAIN_SEAT_CLASSES")
public class TrainSeatClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CLASS_ID")
    private int classID;
    @Column(name = "PRICE_PERSON")
    private double pricePerson;
    @Column(name = "CLASS_NAME")
    private String classNameString;

    public int getClassID() { return classID; }
    public double getPricePerson() { return pricePerson; }
    public String getClassNameString() { return classNameString; }
}


