package com.example.bookTicket.Configuration;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends GenericFilterBean {
	@Value("${app.api.key}")
	private String secretKey;
	@Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
           final HttpServletRequest request = (HttpServletRequest) servletRequest;
           final HttpServletResponse response = (HttpServletResponse) servletResponse;
           final String authHeader = request.getHeader("authorization");
           if ("OPTIONS".equals(request.getMethod())) {
               response.setStatus(HttpServletResponse.SC_OK);
               filterChain.doFilter(request, response);
           } else {
               if(authHeader == null || !authHeader.startsWith("Bearer ")){
                   throw new ServletException("An exception occurred");
               }  
           }
           final String token = authHeader.substring(7);
           Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody();
           request.setAttribute("claims", claims);
           filterChain.doFilter(request, response);
    }
}
