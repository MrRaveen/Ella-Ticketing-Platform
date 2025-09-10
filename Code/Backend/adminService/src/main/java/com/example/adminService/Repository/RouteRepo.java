package com.example.adminService.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.adminService.Entity.Route;

@Repository
public interface RouteRepo extends JpaRepository<Route, Integer>{
}
