package com.example.userService.Service;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    private Logger log = LoggerFactory.getLogger(CreateAccProcess.class); 
    public boolean createProcess(UserAcc accInfo,UserInfo userInfo) throws Exception {
    	try {
    		userInfoObj.save(userInfo);
    		userAccObj.save(accInfo);
    		log.info("Data saved (CreateAccService.java)");
    		return true;
    	}catch(Exception e) {
    		log.info("Error occured when savind data (createAccProcess) : " + e.toString());
    		throw new Exception("Error occured when saving data (CreateAccProcess) : " + e.toString());
    	}
    }
}
