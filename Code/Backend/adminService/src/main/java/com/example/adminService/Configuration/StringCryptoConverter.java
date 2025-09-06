package com.example.adminService.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.style.ToStringCreator;

import com.example.adminService.Service.LogObject;

import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.slf4j.Logger;

@Converter
public class StringCryptoConverter implements AttributeConverter<String, String>{
    // Property name for the encryption password
    private static final String ENCRYPTION_PASSWORD_PROPERTY = "jasypt.encryptor.password";
    // Jasypt StringEncryptor for performing encryption and decryption
    private final StandardPBEStringEncryptor encryptor;
    LogObject obj1 = new LogObject(StringCryptoConverter.class);//logger class
    Logger logObj = null;
    public StringCryptoConverter(Environment environment) {
    	this.encryptor = new StandardPBEStringEncryptor();
    	this.encryptor.setPassword(environment.getProperty(ENCRYPTION_PASSWORD_PROPERTY));
    }
    @Override
	public String convertToDatabaseColumn(String attribute) {
    	try {
    		logObj = obj1.getLogObj();
    		return encryptor.encrypt(attribute);
    	}catch(Exception e) {
    		logObj.info("Error occured when encrypting (StringCryptoConverter) : " + e.toString());
    		return null;
    	}
	}
	@Override
	public String convertToEntityAttribute(String dbData) {
		try {
			logObj = obj1.getLogObj();
			return encryptor.decrypt(dbData);
		}catch(Exception e) {
			logObj.info("Error occured when decrypting (StringCryptoConverter) : " + e.toString());
			return null;
		}
	}
	
}
