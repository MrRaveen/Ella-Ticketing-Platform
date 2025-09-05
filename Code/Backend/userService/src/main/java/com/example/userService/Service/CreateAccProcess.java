package com.example.userService.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.userService.Configuration.StringCryptoConverter;
import com.example.userService.Model.EmailDetails;
import com.example.userService.Model.UserAcc;
import com.example.userService.Model.UserInfo;
import com.example.userService.Model.VerificationCodes;
import com.example.userService.Repositories.UserAccRepo;
import com.example.userService.Repositories.VerificationStoreRepo;
import com.example.userService.Repositories.userInfoRepository;

@Service
public class CreateAccProcess {
    @Autowired
    private userInfoRepository userInfoObj;   
    @Autowired
    private UserAccRepo userAccObj;
    @Autowired
    private UserAccRepo accRepo;    
    @Autowired
    private EmailService emailService;
    @Autowired
    private VerificationStoreRepo verificationStoreRepo;
    @Autowired
    private VerificationStoreRepo repo;
    private LogObject obj1 = new LogObject(CreateAccProcess.class);//logger class
    private Logger logObj = null;
    public Boolean sendVerificationMail(String email) throws Exception {
    	try {
		   //TODO: Check existance
    		Optional<UserAcc> objAcc = accRepo.findByEmail(email);
    		if (objAcc.isPresent()) {
				return true;
			}else {
				Random rand = new Random();
		        int randomInt = rand.nextInt(300);
				String msgBodyString = "Verification code : " + randomInt;
				EmailDetails emailDetails = new EmailDetails(email,msgBodyString,"Verify your email","");
				Boolean emailStat = emailService.sendEmail(emailDetails);
				//save part
				VerificationCodes newCodes = new VerificationCodes(email,String.valueOf(randomInt));
				verificationStoreRepo.save(newCodes);
				return false;
			}
		}
    	catch (Exception e) {
		     throw new Exception("Error occured in CreateAccProcess : " + e.toString());
		}
    }
    public String createProcess(UserAcc accInfo,UserInfo userInfo,String email,String code) throws Exception {
    	try {
    		//check
    		Optional<VerificationCodes> selectedCode = repo.findByEmail(email);
    		if (selectedCode.isPresent()) {
				if(selectedCode.get().getCode().equals(code)) {
					logObj = obj1.getLogObj();
		    		userInfoObj.save(userInfo);
		    		userAccObj.save(accInfo);
		    		logObj.info("Data saved (CreateAccService.java)");
		    		return "Data saved";
				}else {
					return "Invalid verification code";
				}
			}else {
				return "Verification code cannot find";
			}
    	}catch(Exception e) {
    		logObj.info("Error occured when savind data (createAccProcess) : " + e.toString());
    		throw new Exception("Error occured when saving data (CreateAccProcess) : " + e.toString());
    	}
    }
}
