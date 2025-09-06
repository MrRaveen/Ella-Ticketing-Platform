package com.example.adminService.Entity;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.adminService.Configuration.StringCryptoConverter;

import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ADMIN")
public class Admin implements UserDetails{
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ADMIN_ID")
    private Long adminID;
    @Column(name = "USERNAME")
    private String username;
    @Column(name = "PASSWORD")
    @Convert(converter = StringCryptoConverter.class)
    private String password;
    @Column(name = "F_NAME")
    @Convert(converter = StringCryptoConverter.class)
    private String fname;
    @Column(name = "L_NAME")
    @Convert(converter = StringCryptoConverter.class)
    private String lname;
    @Column(name = "CONTACT_NO")
    @Convert(converter = StringCryptoConverter.class)
    private String contactNo;
    @Column(name = "ADDRESS")
    @Convert(converter = StringCryptoConverter.class)
    private String address;
    @Column(name = "JOINED_DATE")
    private LocalDate joinedDate;
	public Long getAdminID() {
		return adminID;
	}
	public void setAdminID(Long adminID) {
		this.adminID = adminID;
	}
	public String getAdminUsername() {
		return username;
	}
	public void setAdminUsername(String username) {
		this.username = username;
	}
	public String getAdminPassword() {
		return password;
	}
	public void setAdminPassword(String password) {
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
	public LocalDate getJoinedDate() {
		return joinedDate;
	}
	public void setJoinedDate(LocalDate joinedDate) {
		this.joinedDate = joinedDate;
	}
	public Admin(String username, String password, String fname, String lname, String contactNo,
			String address, LocalDate joinedDate) {
		this.username = username;
		this.password = password;
		this.fname = fname;
		this.lname = lname;
		this.contactNo = contactNo;
		this.address = address;
		this.joinedDate = joinedDate;
	}
	public Admin() {}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of();
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}
	@Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
