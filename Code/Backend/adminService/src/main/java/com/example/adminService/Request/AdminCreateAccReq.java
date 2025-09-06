package com.example.adminService.Request;

import java.time.LocalDate;

import com.example.adminService.Configuration.StringCryptoConverter;
import com.example.adminService.Entity.AssignedRoles;
import com.example.adminService.Entity.Roles;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

public class AdminCreateAccReq {
	@JsonProperty("username")
    private String username;
	@JsonProperty("password")
    private String password;
	@JsonProperty("fname")
    private String fname;
	@JsonProperty("lname")
    private String lname;
	@JsonProperty("contactNo")
    private String contactNo;
	@JsonProperty("address")
    private String address;
	@JsonProperty("role")
    private Roles role;
	
	public AdminCreateAccReq(String username, String password, String fname, String lname, String contactNo,
			String address, Roles role) {
		super();
		this.username = username;
		this.password = password;
		this.fname = fname;
		this.lname = lname;
		this.contactNo = contactNo;
		this.address = address;
		this.role = role;
	}
	public Roles getRole() {
		return role;
	}
	public void setRole(Roles role) {
		this.role = role;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
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
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public AdminCreateAccReq() {}
}
