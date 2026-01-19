package com.example.bookTicket.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ROLES")
public class Roles {
	@Id
    @Column(name = "ROLE_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("roleID")
    private Long roleID;
    @Column(name = "ROLE_NAME")
    @JsonProperty("roleName")
    private String roleName;
    @Column(name = "DESCRIPTION")
    @JsonProperty("description")
    private String description;
    @Column(name = "ACCESS_LEVEL")
    @JsonProperty("accessLevel")
    private String accessLevel;
	public Long getRoleID() {
		return roleID;
	}
	public void setRoleID(Long roleID) {
		this.roleID = roleID;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAccessLevel() {
		return accessLevel;
	}
	public void setAccessLevel(String accessLevel) {
		this.accessLevel = accessLevel;
	}
	public Roles(String roleName, String description, String accessLevel) {
		this.roleName = roleName;
		this.description = description;
		this.accessLevel = accessLevel;
	}
	public Roles() {
	}   
}
