package com.example.bookTicket.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.PaymentHistory;
@Repository
public interface PaymentHistoryRepo extends JpaRepository<PaymentHistory, Integer> {

}
