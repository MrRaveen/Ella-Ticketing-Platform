package com.example.userService.Service;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.userService.Configuration.StringCryptoConverter;
import com.example.userService.Model.UserAcc;
import com.example.userService.Model.UserInfo;
import com.example.userService.Repositories.UserAccRepo;
import com.example.userService.Repositories.userInfoRepository;

@Service
public class CreateAccProcess {
    @Autowired
    private userInfoRepository userInfoObj;   
    @Autowired
    private UserAccRepo userAccObj;
    
    private LogObject obj1 = new LogObject(CreateAccProcess.class);//logger class
    private Logger logObj = null;
    public void sendVerificationMail(String email) {
    	try {
		   
		} catch (Exception e) {
			// TODO: handle exception
		}
    }
    public boolean verifyEmail(String email, String verificationCode) {
    	return false;
    }
    public boolean createProcess(UserAcc accInfo,UserInfo userInfo) throws Exception {
    	try {
    		logObj = obj1.getLogObj();
    		userInfoObj.save(userInfo);
    		userAccObj.save(accInfo);
    		logObj.info("Data saved (CreateAccService.java)");
    		return true;
    	}catch(Exception e) {
    		logObj.info("Error occured when savind data (createAccProcess) : " + e.toString());
    		throw new Exception("Error occured when saving data (CreateAccProcess) : " + e.toString());
    	}
    }
}
