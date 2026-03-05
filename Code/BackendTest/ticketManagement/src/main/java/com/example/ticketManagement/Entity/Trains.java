package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "TRAINS")
public class Trains {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TRAIN_ID")
    private int trainID;
    @Column(name = "TRAIN_NAME")
    private String trainNameString;

    public int getTrainID() { return trainID; }
    public String getTrainNameString() { return trainNameString; }
}


