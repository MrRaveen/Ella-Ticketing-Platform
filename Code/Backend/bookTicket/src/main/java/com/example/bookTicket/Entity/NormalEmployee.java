package com.example.bookTicket.Entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "NORMAL_EMPLOYEE")
public class NormalEmployee {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EMPLOYEE_ID")
    private int employeeID;
	@Column(name = "F_NAME")
	private String fnameString;
	@Column(name = "L_NAME")
	private String lnameString;
	@Column(name = "CONTACT")
	private String contactString;
	@Column(name = "JOINED_DATE")
	private LocalDate joinedDate;
	@Column(name = "ADDRESS")
	private String addreString;
	@Column(name = "EMAIL")
	private String emailString;
	@Column(name = "ROLE")
	private String roleString;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "STATION_ID", referencedColumnName = "STATION_ID", nullable = false)
    private Stations stations;
	public int getEmployeeID() {
		return employeeID;
	}
	public void setEmployeeID(int employeeID) {
		this.employeeID = employeeID;
	}
	public String getFnameString() {
		return fnameString;
	}
	public void setFnameString(String fnameString) {
		this.fnameString = fnameString;
	}
	public String getLnameString() {
		return lnameString;
	}
	public void setLnameString(String lnameString) {
		this.lnameString = lnameString;
	}
	public String getContactString() {
		return contactString;
	}
	public void setContactString(String contactString) {
		this.contactString = contactString;
	}
	public LocalDate getJoinedDate() {
		return joinedDate;
	}
	public void setJoinedDate(LocalDate joinedDate) {
		this.joinedDate = joinedDate;
	}
	public String getAddreString() {
		return addreString;
	}
	public void setAddreString(String addreString) {
		this.addreString = addreString;
	}
	public String getEmailString() {
		return emailString;
	}
	public void setEmailString(String emailString) {
		this.emailString = emailString;
	}
	public String getRoleString() {
		return roleString;
	}
	public void setRoleString(String roleString) {
		this.roleString = roleString;
	}
	public Stations getStations() {
		return stations;
	}
	public void setStations(Stations stations) {
		this.stations = stations;
	}
	public NormalEmployee(String fnameString, String lnameString, String contactString, LocalDate joinedDate,
			String addreString, String emailString, String roleString, Stations stations) {
		super();
		this.fnameString = fnameString;
		this.lnameString = lnameString;
		this.contactString = contactString;
		this.joinedDate = joinedDate;
		this.addreString = addreString;
		this.emailString = emailString;
		this.roleString = roleString;
		this.stations = stations;
	}
	public NormalEmployee() {
		super();
	}
	
}
