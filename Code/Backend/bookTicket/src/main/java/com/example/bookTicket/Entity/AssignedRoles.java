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
@Table(name = "ASSIGNED_ROLES")
public class AssignedRoles {
	@Id
    @Column(name = "ASSIGNED_ID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignID;
	@Column(name = "JOINED_DATE")
    private LocalDate assignedDate;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID", referencedColumnName = "ROLE_ID", nullable = false)
	private Roles role;
	@OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ADMIN_ID", referencedColumnName = "ADMIN_ID", nullable = false)
	private Admin admin;
	public Long getAssignID() {
		return assignID;
	}
	public void setAssignID(Long assignID) {
		this.assignID = assignID;
	}
	public LocalDate getAssignedDate() {
		return assignedDate;
	}
	public void setAssignedDate(LocalDate assignedDate) {
		this.assignedDate = assignedDate;
	}
	public Roles getRole() {
		return role;
	}
	public void setRole(Roles role) {
		this.role = role;
	}
	public Admin getAdmin() {
		return admin;
	}
	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	public AssignedRoles(LocalDate assignedDate, Roles role, Admin admin) {
		this.assignedDate = assignedDate;
		this.role = role;
		this.admin = admin;
	}
	public AssignedRoles() {}
}
