package com.example.userService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.Route;
@Repository
public interface RouteRepo extends JpaRepository<Route, Integer> {

}
