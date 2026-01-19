package com.example.userService.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.style.ToStringCreator;

public class LogObject {
	 private Logger log;
	 public LogObject(Class<?> cl) {
		 log = LoggerFactory.getLogger(cl.getClass());
	 }
	public Logger getLogObj() throws Exception {
		try {
			return this.log;
		}catch(Exception e) {
			throw new Exception("Error occured when returning loh obj : " + e.toString());
		}
	}
}
