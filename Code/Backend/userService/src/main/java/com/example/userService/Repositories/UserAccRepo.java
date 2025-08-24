package com.example.userService.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.userService.Model.UserAcc;
import com.example.userService.Model.UserInfo;

@Repository
public interface UserAccRepo extends JpaRepository<UserAcc, Integer> {
}
