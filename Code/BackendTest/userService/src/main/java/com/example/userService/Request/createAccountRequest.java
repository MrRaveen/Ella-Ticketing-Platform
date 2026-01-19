package com.example.userService.Request;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.example.userService.Model.UserInfo;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

public class createAccountRequest {
	    @JsonProperty("verificationCode")
	    private String verificationCode;
	    @JsonProperty("fname")
	    private String fname;
	    @JsonProperty("lname")
	    private String lname;
	    @JsonProperty("address")
	    private String address;
	    @JsonProperty("dob")
	    private LocalDate dob;
	    @JsonProperty("province")
	    private String provience;
	    @JsonProperty("city")
	    private String city;
	    @JsonProperty("nic")
	    private String nic;
	    @JsonProperty("contactNo")
	    private String contactNo;
	    @JsonProperty("streetName")
	    private String streetName;
	    @JsonProperty("email")
	    private String email;
	    @JsonProperty("userPassword")
	    private String userPassword;
		public String getVerificationCode() {
			return verificationCode;
		}
		public void setVerificationCode(String verificationCode) {
			this.verificationCode = verificationCode;
		}
		public String getFname() {
			return fname;
		}
		public void setFname(String fname) {
			this.fname = fname;
		}
		public String getLname() {
			return lname;
		}
		public void setLname(String lname) {
			this.lname = lname;
		}
		public String getAddress() {
			return address;
		}
		public void setAddress(String address) {
			this.address = address;
		}
		public LocalDate getDob() {
			return dob;
		}
		public void setDob(LocalDate dob) {
			this.dob = dob;
		}
		public String getProvience() {
			return provience;
		}
		public void setProvience(String provience) {
			this.provience = provience;
		}
		public String getCity() {
			return city;
		}
		public void setCity(String city) {
			this.city = city;
		}
		public String getNic() {
			return nic;
		}
		public void setNic(String nic) {
			this.nic = nic;
		}
		public String getContactNo() {
			return contactNo;
		}
		public void setContactNo(String contactNo) {
			this.contactNo = contactNo;
		}
		public String getStreetName() {
			return streetName;
		}
		public void setStreetName(String streetName) {
			this.streetName = streetName;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public String getUserPassword() {
			return userPassword;
		}
		public void setUserPassword(String userPassword) {
			this.userPassword = userPassword;
		}
		public createAccountRequest(String verificationCode,String fname, String lname, String address, LocalDate dob, String provience,
				String city, String nic, String contactNo, String streetName, String email, String userPassword) {
			super();
			this.verificationCode = verificationCode;
			this.fname = fname;
			this.lname = lname;
			this.address = address;
			this.dob = dob;
			this.provience = provience;
			this.city = city;
			this.nic = nic;
			this.contactNo = contactNo;
			this.streetName = streetName;
			this.email = email;
			this.userPassword = userPassword;
		}
		public createAccountRequest() {
		}
	    
}
