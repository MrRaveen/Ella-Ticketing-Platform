package com.example.bookTicket.Configuration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
@Configuration
public class SecurityConfiguration {
	 @Bean
	    public FilterRegistrationBean<JwtAuthenticationFilter> jwtFilter(JwtAuthenticationFilter filter) {
	        FilterRegistrationBean<JwtAuthenticationFilter> registrationBean = new FilterRegistrationBean<>();
	        registrationBean.setFilter(filter); 
	        registrationBean.addUrlPatterns("/test/*");
	        registrationBean.addUrlPatterns("/bookTrain", "/bookTrain/*");
	        registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
	        return registrationBean;
	    }

	 @Bean
	 public FilterRegistrationBean<RateLimitingFilter> rateLimitFilter(RateLimitingFilter filter) {
	     FilterRegistrationBean<RateLimitingFilter> registrationBean = new FilterRegistrationBean<>();
	     registrationBean.setFilter(filter);
	     registrationBean.addUrlPatterns("/bookTrain", "/bookTrain/*");
	     registrationBean.setOrder(Ordered.HIGHEST_PRECEDENCE + 1);
	     return registrationBean;
	 }
}
