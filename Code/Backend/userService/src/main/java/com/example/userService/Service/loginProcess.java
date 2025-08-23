package com.example.userService.Service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.userService.Model.UserInfo;
import com.example.userService.Repositories.userInfoRepository;

@Service
public class loginProcess {
    @Autowired
    private userInfoRepository repo1;
    
    public List<UserInfo> test(){
        List<UserInfo> users = repo1.findAll();
        System.out.println("out1 : " + users);
        return users;
    }
}
