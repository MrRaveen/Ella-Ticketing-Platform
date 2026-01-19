package com.example.admin.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@FeignClient(name = "USER-SERVICE")
public interface UserServiceClient {
    
    @GetMapping("/api/users")
    List<?> getAllUsers();
    
    @PostMapping("/api/users/admin")
    Object createAdminUser(@RequestBody Map<String, Object> adminUser);
}