package com.example.ticketManagement.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "USER_ACC", schema = "SYSTEM")
public class UserAcc {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ACCOUNTID")
    private int accountId;
    public int getAccountId() { return accountId; }
}


