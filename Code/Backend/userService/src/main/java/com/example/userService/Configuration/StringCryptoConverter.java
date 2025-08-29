package com.example.userService.Configuration;

import org.springframework.core.env.Environment;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class StringCryptoConverter implements AttributeConverter<String, String>{
    // Property name for the encryption password
    private static final String ENCRYPTION_PASSWORD_PROPERTY = "jasypt.encryptor.password";
    // Jasypt StringEncryptor for performing encryption and decryption
    private final StandardPBEStringEncryptor encryptor;
    public StringCryptoConverter(Environment environment) {
    	this.encryptor = new StandardPBEStringEncryptor();
    	this.encryptor.setPassword(environment.getProperty(ENCRYPTION_PASSWORD_PROPERTY));
    }
    @Override
	public String convertToDatabaseColumn(String attribute) {
    	return encryptor.encrypt(attribute);
	}
	@Override
	public String convertToEntityAttribute(String dbData) {
		return encryptor.decrypt(dbData);
	}
	
}
