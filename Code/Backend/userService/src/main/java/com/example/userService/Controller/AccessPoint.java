package com.example.userService.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.userService.Model.UserInfo;
import com.example.userService.Request.loginRequest;
import com.example.userService.Service.loginProcess;

@RestController
public class AccessPoint {
	@Autowired
    private loginProcess service;
    
    @GetMapping("/login")
    public ResponseEntity<?> login() {
        try {
            List<UserInfo> users = service.test();
            return ResponseEntity.ok(users);
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
}
