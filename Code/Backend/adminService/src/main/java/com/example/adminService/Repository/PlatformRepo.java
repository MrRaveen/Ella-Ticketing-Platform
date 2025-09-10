package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.adminService.Entity.PlatformInfo;

public interface PlatformRepo extends JpaRepository<PlatformInfo, Integer>{

}
