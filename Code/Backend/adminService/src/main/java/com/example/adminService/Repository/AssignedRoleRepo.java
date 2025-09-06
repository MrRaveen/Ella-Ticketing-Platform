package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adminService.Entity.Admin;
import com.example.adminService.Entity.AssignedRoles;

@Repository
public interface AssignedRoleRepo extends JpaRepository<AssignedRoles, Integer> {

}
