package com.example.userService.Repositories;
import java.lang.foreign.Linker.Option;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.VerificationCodes;
@Repository
public interface VerificationStoreRepo extends JpaRepository<VerificationCodes, Integer> {
	Optional<VerificationCodes>findByEmail(String email);
}
