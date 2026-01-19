package com.example.adminService.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Repository.AdminRepo;

@Service
public class AdminLogin {
	@Autowired
	private AdminRepo adminRepo;
	private AuthenticationManager authenticationManager;
	public AdminLogin(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	public Admin loginProcessAdmin(String username,String password) throws Exception {
		try {
			Optional<Admin> adminObj = adminRepo.findByUsername(username);
			authenticationManager.authenticate(
		    new UsernamePasswordAuthenticationToken(username, password)
			);
			return adminObj.get();
		} catch (Exception e) {
			throw new Exception("Error occured when admin login (AdminLogin) : " + e.toString());
		}
	}
}
