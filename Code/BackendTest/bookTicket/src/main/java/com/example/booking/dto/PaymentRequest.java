package com.example.booking.dto;

import com.example.booking.model.Payment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentRequest {
    private Long ticketId;
    private Payment.PaymentMethod paymentMethod;
}