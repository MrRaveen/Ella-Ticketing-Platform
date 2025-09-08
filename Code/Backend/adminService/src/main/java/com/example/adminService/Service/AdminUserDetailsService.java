package com.example.adminService.Service;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.style.ToStringCreator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Repository.AdminRepo;

import jakarta.transaction.Transactional;

@Service
public class AdminUserDetailsService implements UserDetailsService {
    
    @Autowired
    private AdminRepo adminRepo;
    @Autowired
    private AdminRBACImpl adminRBACImpl;
    @Override
    @Transactional // This ensures the entire method runs in a transaction
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
       try {
    	   Admin admin = adminRepo.findByUsername(username)
                   .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
           // Load authorities using the service
           Set<GrantedAuthority> authorities = adminRBACImpl.getRoles(username);
           admin.setAuthorities(authorities);
           return admin;
	} catch (Exception e) {
		return null;
	}
    }
}
