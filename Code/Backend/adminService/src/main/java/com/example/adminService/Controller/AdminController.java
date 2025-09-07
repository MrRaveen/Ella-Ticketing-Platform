package com.example.adminService.Controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@GetMapping("test1")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	public String test() {
		return "Only admin";
	}
	@GetMapping("test2")
	@PreAuthorize("hasAnyRole('ROLE_EMPLOYEE')")
	public String test2() {
		return "Only employee";
	}
}
