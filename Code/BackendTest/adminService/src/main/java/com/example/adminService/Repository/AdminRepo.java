package com.example.adminService.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adminService.Entity.Admin;

@Repository
public interface AdminRepo extends JpaRepository<Admin, Integer>{
	Optional<Admin> findByUsername(String username);
}
