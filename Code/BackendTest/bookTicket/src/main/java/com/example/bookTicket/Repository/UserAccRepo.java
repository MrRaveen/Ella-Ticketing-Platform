package com.example.bookTicket.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.bookTicket.Entity.UserAcc;


@Repository
public interface UserAccRepo extends JpaRepository<UserAcc, Integer> {
	Optional<UserAcc> findByEmail(String email);
}
