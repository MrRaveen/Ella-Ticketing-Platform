package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "SEAT_COUNT")
public class SeatCount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEAT_CONT_ID")
    private int seatCountID;
    @Column(name = "SEAT_REMAINING_COUNT")
    private int seatRemainingCount;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TIME_ID", referencedColumnName = "TIME_ID", nullable = false)
    private TrainTime trainTime;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLASS_ID", referencedColumnName = "CLASS_ID", nullable = false)
    private TrainSeatClass trainSeatClass;

    public int getSeatRemainingCount() { return seatRemainingCount; }
    public void setSeatRemainingCount(int v) { seatRemainingCount = v; }
    public TrainTime getTrainTime() { return trainTime; }
    public TrainSeatClass getTrainSeatClass() { return trainSeatClass; }
}


