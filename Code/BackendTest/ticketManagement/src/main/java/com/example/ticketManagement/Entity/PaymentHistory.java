package com.example.ticketManagement.Entity;

import java.time.LocalDate;
import jakarta.persistence.*;

@Entity
@Table(name = "PAYMENT_HISTORY")
public class PaymentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAYMENT_HIS_ID")
    private int paymentHisID;
    @Column(name = "STATUS")
    private boolean status;
    @Column(name = "PAYMENT_TYPE")
    private String paymentType;
    @Column(name = "PAYMENT_DATE")
    private LocalDate paymentDate;

    public int getPaymentHisID() { return paymentHisID; }
}


