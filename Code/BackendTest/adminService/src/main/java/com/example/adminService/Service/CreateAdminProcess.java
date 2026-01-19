package com.example.adminService.Service;
import java.time.LocalDate;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Entity.AssignedRoles;
import com.example.adminService.Entity.Roles;
import com.example.adminService.Repository.AdminRepo;
import com.example.adminService.Repository.AssignedRoleRepo;
import com.example.adminService.Request.AdminCreateAccReq;
@Service
public class CreateAdminProcess {
	@Autowired
	private AdminRepo adminRepo;
	@Autowired
	private AssignedRoleRepo assignedRoleRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	public Boolean createProcess(AdminCreateAccReq accReq, Roles role) throws Exception {
		LogObject obj = new LogObject(getClass());
		Logger logObj = obj.getLogObj();
		try {
			LocalDate today = LocalDate.now();
			//store encrypted data + encorded password
			Admin newAdmin = new Admin(accReq.getUsername(),passwordEncoder.encode(accReq.getPassword()),accReq.getFname(),accReq.getLname(),accReq.getContactNo(),accReq.getAddress(),today);
			Admin createdAdmin = adminRepo.save(newAdmin);
			AssignedRoles newRole = new AssignedRoles(today, role, createdAdmin);
			assignedRoleRepo.save(newRole);
			logObj.info("Admin account created");
			return true;
		} catch (Exception e) {
			throw new Exception("Error occured (CreateAdminProcess) : " + e.toString());
		}
	}
}
