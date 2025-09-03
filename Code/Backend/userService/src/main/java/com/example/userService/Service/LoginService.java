package com.example.userService.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.style.ToStringCreator;
import org.springframework.stereotype.Service;

import com.example.userService.Model.UserAcc;
import com.example.userService.Repositories.UserAccRepo;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;

@Service
public class LoginService {
	@Autowired
	private UserAccRepo repo1;
	public Boolean loginProcess(String email,String password) throws Exception {
		try {
			Optional<UserAcc> output = repo1.findByEmail(email);
			UserAcc conObjAcc = output.get();
			if(conObjAcc.getUserPassword().equals(password)) {
			    return true;
			//TODO: handle JWT
			}else {
				return false;
			}
		} catch (Exception e) {
			throw new Exception("Error occured in LoginService : " + e.toString());
		}
	}
}
