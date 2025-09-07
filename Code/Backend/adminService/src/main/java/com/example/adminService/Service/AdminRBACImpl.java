package com.example.adminService.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Entity.AssignedRoles;
import com.example.adminService.Repository.AdminRepo;
import com.example.adminService.Repository.AssignedRoleRepo;
@Service
public class AdminRBACImpl{
	@Autowired
	private AdminRepo adminRepo;
	@Autowired
	private AssignedRoleRepo assignedRoleRepo;
//UserDetailsService
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		Admin admin = adminRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//		List<AssignedRoles> roles = assignedRoleRepo.findByAdmin(admin);
//		Set<AssignedRoles>convertedSet = new HashSet<AssignedRoles>(roles);
//		return new org.springframework.security.core.userdetails.User(
//	            admin.getAdminUsername(), admin.getAdminPassword(), getAuthorities(convertedSet));
//	}
//	private Set<GrantedAuthority> getAuthorities(Set<AssignedRoles> roles) {
//		return roles.stream()
//				.map(role -> new SimpleGrantedAuthority("ROLE_"+role.getRole().getRoleName())).collect(Collectors.toSet());
//    }
	
//	public Set<GrantedAuthority> getRoles(String username) throws Exception {
//		try {
//		     Admin admin = adminRepo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
//			 List<AssignedRoles> roles = assignedRoleRepo.findByAdmin(admin);
//			Set<AssignedRoles>convertedSet = new HashSet<AssignedRoles>(roles);
//			return roles.stream()
//					.map(role -> new SimpleGrantedAuthority("ROLE_"+role.getRole().getRoleName())).collect(Collectors.toSet());
//		} catch (Exception e) {
//			throw new Exception("Error occured in RBAC imple : " + e.toString());
//		}
//	}
	 @Transactional(readOnly = true) // Add transactional annotation
	    public Set<GrantedAuthority> getRoles(String username) throws Exception {
	        try {
	            Admin admin = adminRepo.findByUsername(username)
	                    .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
	            
	            List<AssignedRoles> roles = assignedRoleRepo.findByAdmin(admin);
	            roles.forEach(element_value -> {
		            System.out.println("TEST : " + element_value.getRole().getRoleName());
	            });
	            return roles.stream()
	                    .map(role -> new SimpleGrantedAuthority("ROLE_"+role.getRole().getRoleName()))
	                    .collect(Collectors.toSet());
	        } catch (Exception e) {
	            throw new Exception("Error occurred in RBAC implementation: " + e.toString());
	        }
	    }
	
}
