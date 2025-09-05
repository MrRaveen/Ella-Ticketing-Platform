package com.example.userService.Repositories;
import java.lang.foreign.Linker.Option;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.userService.Model.VerificationCodes;

public interface VerificationStoreRepo extends JpaRepository<VerificationCodes, Integer> {
	Optional<VerificationCodes>findByEmail(String email);
}
