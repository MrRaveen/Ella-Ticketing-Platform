package com.example.userService.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.style.ToStringCreator;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import com.example.userService.Model.UserAcc;
import com.example.userService.Repositories.UserAccRepo;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.StoredProcedureQuery;

@Service
public class LoginService {
	@Autowired
	private UserAccRepo userAccRepo;
	private AuthenticationManager authenticationManager;
	public LoginService(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;
	}
	public UserAcc loginProcess(String email,String password) throws Exception {
		try {
			Optional<UserAcc> output = userAccRepo.findByEmail(email);
			UserAcc conObjAcc = output.get();
			authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(
	                   email,
	                   password
	                )
	        );
		    return conObjAcc;
			
		} catch (Exception e) {
			throw new Exception("Error occured in LoginService : " + e.toString());
		}
	}
}
