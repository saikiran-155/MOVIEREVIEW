package com.moviereview.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Global CORS configuration to ensure frontend (HTML/CSS/JS or React) 
 * can seamlessly communicate with Spring Boot REST APIs from any port or domain.
 */
@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*") // Allows any origin pattern
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false) // Set to false when using wildcard pattern to avoid conflicts
                .maxAge(3600); // 1 hour cache for pre-flight requests
    }
}
