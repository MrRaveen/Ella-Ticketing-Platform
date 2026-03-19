package com.example.adminService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class AdminServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminServiceApplication.class, args);
	}
	@Bean
    public WebMvcConfigurer corsConfigurer() {
       return new WebMvcConfigurer() {
          @Override
          public void addCorsMappings(CorsRegistry reg){
             reg.addMapping("/**").allowedOrigins("*").allowedMethods("*");
          }
       };
    }

}
