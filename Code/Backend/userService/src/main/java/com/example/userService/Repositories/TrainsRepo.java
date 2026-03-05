package com.example.userService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.Trains;
@Repository
public interface TrainsRepo extends JpaRepository<Trains, Integer> {

}
