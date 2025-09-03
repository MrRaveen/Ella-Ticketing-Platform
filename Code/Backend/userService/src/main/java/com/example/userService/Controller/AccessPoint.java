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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.userService.Model.UserAcc;
import com.example.userService.Model.UserInfo;
import com.example.userService.Repositories.UserAccRepo;
import com.example.userService.Repositories.userInfoRepository;
import com.example.userService.Request.createAccountRequest;
import com.example.userService.Request.loginRequest;
import com.example.userService.Service.CreateAccProcess;
import com.example.userService.Service.LoginService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@RestController
public class AccessPoint {
	private Logger log = LoggerFactory.getLogger(AccessPoint.class); 
	@Autowired
    private CreateAccProcess service;
	@Autowired
	private userInfoRepository repo1;
	@Autowired
	private LoginService loginService;
	@Autowired
	private UserAccRepo accRepoAcc;
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
    @GetMapping("/logIn")
    public ResponseEntity<?> loginProcess(@RequestBody loginRequest request) {
    	try {
    		return ResponseEntity.status(200).body(loginService.loginProcess(request.getMail(),request.getPassword()));
    	}catch(Exception e) {
    		return ResponseEntity.status(500).body("Error occured in controller (AccessPoint) : " + e.toString());
    	}
    }
    //testing only
    @GetMapping("/getAllData")
    public List<UserAcc> getPrcess(){
    	return accRepoAcc.findAll();
    }
//    @GetMapping("/test")
//    public String test() {
//    	log.info("Hello world");
//    	return "log wrote";
//    }
}
