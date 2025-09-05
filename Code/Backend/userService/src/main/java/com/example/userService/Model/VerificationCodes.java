package com.example.userService.Model;

import com.example.userService.Configuration.StringCryptoConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "VERIFICATION", schema = "SYSTEM")
public class VerificationCodes {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "CODE_ID")
	private int codeID;
	@Column(name = "EMAIL")
	private String email;
	@Column(name = "CODE")
	@Convert(converter = StringCryptoConverter.class)
	private String code;
	public int getCodeID() {
		return codeID;
	}
	public void setCodeID(int codeID) {
		this.codeID = codeID;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public VerificationCodes(String email, String code) {
		this.email = email;
		this.code = code;
	}
	public VerificationCodes() {}
}
