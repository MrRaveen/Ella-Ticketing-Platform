package com.example.adminService.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "PAYMENT_HISTORY")
public class PaymentHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "PAYMENT_HIS_ID")
    private Long id;

    @Column(name = "STATUS")
    private boolean status;

    @Column(name = "PAYMENT_TYPE")
    private String paymentType;
	@Column(name = "SERVICE_NAME")
    private String serviceName;

    @Column(name = "TIME_DATE")
    private LocalDate timeDate;
    @Column(name = "PAYMENT_STATUS_NUM")
    private String paymentStatNumString;
    
    public String getPaymentStatNumString() {
		return paymentStatNumString;
	}

	public void setPaymentStatNumString(String paymentStatNumString) {
		this.paymentStatNumString = paymentStatNumString;
	}

	public PaymentHistory() {
		super();
	}

	public PaymentHistory(boolean status, String paymentType, String serviceName, LocalDate timeDate, String paymentStatNumString) {
		super();
		this.status = status;
		this.paymentType = paymentType;
		this.serviceName = serviceName;
		this.timeDate = timeDate;
		this.paymentStatNumString = paymentStatNumString;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public String getPaymentType() {
		return paymentType;
	}

	public void setPaymentType(String paymentType) {
		this.paymentType = paymentType;
	}

	public String getServiceName() {
		return serviceName;
	}

	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	public LocalDate getTimeDate() {
		return timeDate;
	}

	public void setTimeDate(LocalDate timeDate) {
		this.timeDate = timeDate;
	}
}
