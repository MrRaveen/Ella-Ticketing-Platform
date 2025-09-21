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

import com.fasterxml.jackson.databind.ObjectMapper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.http.MediaType;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.http.HttpStatus;

@Component
public class JwtAuthenticationFilter extends GenericFilterBean {
	@Value("${app.api.key}")
	private String secretKey;
	@Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
		 final HttpServletRequest request = (HttpServletRequest) servletRequest;
         final HttpServletResponse response = (HttpServletResponse) servletResponse;
         final String authHeader = request.getHeader("authorization");   
		try {
        	  
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
		} catch (Exception e) {
			// Handle the exception and create a custom error response
	        response.setStatus(HttpStatus.UNAUTHORIZED.value());
	        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
	        Map<String, Object> errorDetails = new HashMap<>();
	        errorDetails.put("timestamp", new java.util.Date());
	        errorDetails.put("status", HttpStatus.UNAUTHORIZED.value());
	        errorDetails.put("error", "Unauthorized");
	        errorDetails.put("message", e.getMessage());
	        errorDetails.put("path", request.getRequestURI());
	        // Use ObjectMapper to convert the map to a JSON string
	        ObjectMapper mapper = new ObjectMapper();
	        mapper.writeValue(response.getWriter(), errorDetails);
		}
    }
}
