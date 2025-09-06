package com.example.adminService.Controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.adminService.Request.AdminCreateAccReq;
import com.example.adminService.Service.CreateAdminProcess;
@RestController
@RequestMapping("/auth")
public class AccessPoint {
	@Autowired
	private CreateAdminProcess createAdminProcess;
	@PostMapping("/CreateAdmin")
	public ResponseEntity<?> createAdmin(@RequestBody AdminCreateAccReq requestAccReq) {
		try {
			boolean result = createAdminProcess.createProcess(requestAccReq, requestAccReq.getRole());
			return ResponseEntity.status(200).body("Account created");
		} catch (Exception e) {
			return ResponseEntity.status(500).body("Error occured (AccessPoint) : " + e.toString());
		}
	}
	//test section
	@GetMapping("test1")
	public String test() {
		return "passed";
	}
}
