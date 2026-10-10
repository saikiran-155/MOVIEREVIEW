package com.moviereview;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Entry Point for Movie Review System Spring Boot Backend.
 */
@SpringBootApplication
public class MovieReviewApplication {

    public static void main(String[] args) {
        SpringApplication.run(MovieReviewApplication.class, args);
        System.out.println("=================================================");
        System.out.println(" 🎬 Movie Review System Backend Started Successfully!");
        System.out.println(" Server running on: http://localhost:8080");
        System.out.println("=================================================");
    }
}
