package com.example.userService.Model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.userService.Configuration.StringCryptoConverter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
@Entity
@Table(name = "USER_ACC", schema = "SYSTEM")
public class UserAcc implements UserDetails{
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY) // works for Oracle 12c+ with IDENTITY
	    @Column(name = "ACCOUNTID")
	    private int accountId;

	    @Column(name = "CREATEDDATETIME")
	    private LocalDateTime createdDateTime;

	    @Column(name = "STATUS", length = 10, nullable = false)
	    private String status;  // allowed values: ONLINE / OFLINE

	    @Column(name = "ACCSTATUS", length = 10, nullable = false)
	    private String accStatus; // allowed values: ACTIVE / REMOVED / PAUSED

	    @Column(name = "LASTACTIVETIME")
	    private LocalDateTime lastActiveTime;

	    @Column(name = "EMAIL", length = 800)
	    private String email;
	    
	    @Column(name = "USER_PASSWORD", length = 800)
	    @Convert(converter = StringCryptoConverter.class)
	    private String userPassword;
	    // Many accounts belong to one user
	    @OneToOne(fetch = FetchType.LAZY)
	    @JoinColumn(name = "USERID", referencedColumnName = "USERID", nullable = false)
	    @JsonIgnore
	    private UserInfo user;

		public UserAcc(LocalDateTime createdDateTime, String status, String accStatus,
				LocalDateTime lastActiveTime, String email, String userPassword, UserInfo user) {
			super();
			this.createdDateTime = createdDateTime;
			this.status = status;
			this.accStatus = accStatus;
			this.lastActiveTime = lastActiveTime;
			this.email = email;
			this.userPassword = userPassword;
			this.user = user;
		}

		public int getAccountId() {
			return accountId;
		}

		public void setAccountId(int accountId) {
			this.accountId = accountId;
		}

		public LocalDateTime getCreatedDateTime() {
			return createdDateTime;
		}

		public void setCreatedDateTime(LocalDateTime createdDateTime) {
			this.createdDateTime = createdDateTime;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getAccStatus() {
			return accStatus;
		}

		public void setAccStatus(String accStatus) {
			this.accStatus = accStatus;
		}

		public LocalDateTime getLastActiveTime() {
			return lastActiveTime;
		}

		public void setLastActiveTime(LocalDateTime lastActiveTime) {
			this.lastActiveTime = lastActiveTime;
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

		public UserInfo getUser() {
			return user;
		}

		public void setUser(UserInfo user) {
			this.user = user;
		}

		public UserAcc() {
			
		}
		/*
		 * returns the user’s roles list; it is helpful to manage permissions.
		 * */
		@Override
		public Collection<? extends GrantedAuthority> getAuthorities() {
			// TODO Auto-generated method stub
			return List.of();
		}

		@Override
		public String getPassword() {
			// TODO Auto-generated method stub
			return userPassword;
		}
		/*
		 * returns the email address because it is unique information about the user.
		 * */
		@Override
		public String getUsername() {
			// TODO Auto-generated method stub
			return email;
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
