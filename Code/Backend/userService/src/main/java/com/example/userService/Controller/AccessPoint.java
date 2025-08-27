package com.example.userService.Controller;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.userService.Model.UserAcc;
import com.example.userService.Model.UserInfo;
import com.example.userService.Request.createAccountRequest;
import com.example.userService.Service.CreateAccProcess;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
public class AccessPoint {
	private Logger log = LoggerFactory.getLogger(AccessPoint.class); 
	@Autowired
    private CreateAccProcess service;
    @PostMapping("/createAcc")
    public ResponseEntity<?> createAccount(@RequestBody createAccountRequest accountDetails) {
        try {
           UserInfo userInfoObjInfo = new UserInfo(
        		    accountDetails.getFname(),accountDetails.getLname(), accountDetails.getAddress(), accountDetails.getDob(), accountDetails.getProvience(),
   				    accountDetails.getCity(), accountDetails.getNic(), accountDetails.getContactNo(), accountDetails.getStreetName()
        		    );
           UserAcc accDetailsObjAcc = new UserAcc(
        		  LocalDateTime.now(),"ONLINE","ACTIVE",
        		  LocalDateTime.now(), accountDetails.getEmail(), accountDetails.getUserPassword(),userInfoObjInfo
        		  );
            service.createProcess(accDetailsObjAcc, userInfoObjInfo);
           return ResponseEntity.status(200).body("Data saved");
        } catch(Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }
    @GetMapping("/test")
    public String test() {
    	log.info("hallow world");
    	return "log wrote";
    }
}
