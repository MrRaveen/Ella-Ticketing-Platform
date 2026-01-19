package com.example.bookTicket.Entity;
import java.time.LocalDate;


import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
@Entity
@Table(name = "USER_INFO", schema = "SYSTEM")
public class UserInfo {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto incrementing column
	    @Column(name = "USERID")
	    private int userId;

	    @Column(name = "FNAME", length = 800)
	    private String fname;

	    @Column(name = "LNAME", length = 800)
	    private String lname;

	    @Column(name = "ADDRESS", length = 800)
	    private String address;

	    @Column(name = "DOB")
	    private LocalDate dob;

	    @Column(name = "PROVIENCE", length = 800)
	    private String provience;

	    @Column(name = "CITY", length = 800)
	    private String city;

	    @Column(name = "NIC", length = 800)
	    private String nic;

	    @Column(name = "CONTACTNO", length = 800)
	    private String contactNo;

	    @Column(name = "STREETNAME", length = 800)
	    private String streetName;
		public UserInfo() {
		}
		public UserInfo(String fname, String lname, String address, LocalDate dob, String provience,
				String city, String nic, String contactNo, String streetName) {
			super();
			this.fname = fname;
			this.lname = lname;
			this.address = address;
			this.dob = dob;
			this.provience = provience;
			this.city = city;
			this.nic = nic;
			this.contactNo = contactNo;
			this.streetName = streetName;
		}

		public int getUserId() {
			return userId;
		}

		public void setUserId(int userId) {
			this.userId = userId;
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
	    
}
