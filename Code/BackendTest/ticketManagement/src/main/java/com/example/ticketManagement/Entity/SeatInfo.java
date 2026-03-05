package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "SEAT_INFO")
public class SeatInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SEAT_ID")
    private Long seatID;
    @Column(name = "OCCUPATION_STAT")
    private boolean occupationStat;
    @Column(name = "SEAT_CODE")
    private String seatCode;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CLASS_ID", referencedColumnName = "CLASS_ID", nullable = false)
    private TrainSeatClass trainSeatClass;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TIME_ID", referencedColumnName = "TIME_ID", nullable = false)
    private TrainTime trainTime;

    public Long getSeatID() { return seatID; }
    public boolean isOccupationStat() { return occupationStat; }
    public void setOccupationStat(boolean occ) { this.occupationStat = occ; }
    public String getSeatCode() { return seatCode; }
    public TrainTime getTrainTime() { return trainTime; }
}


