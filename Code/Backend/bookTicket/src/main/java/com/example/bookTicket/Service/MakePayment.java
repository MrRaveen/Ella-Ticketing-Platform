package com.example.bookTicket.Service;

import org.slf4j.Logger;

public class MakePayment {
	LogObject logObject = new LogObject(MakePayment.class);
	public boolean makePaymentProcess() throws Exception {
		try {
			Logger lgObj = logObject.getLogObj();
			lgObj.info("Payment completed");
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured in (MakePayment : makePaymentProcess) : " + e.toString());
		}
	}
}
