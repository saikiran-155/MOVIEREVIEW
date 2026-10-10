package com.moviereview.controller;

import com.moviereview.dto.ReviewRequest;
import com.moviereview.entity.Review;
import com.moviereview.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller handling reviews: Adding reviews and retrieving reviews for a movie.
 */
@RestController
@CrossOrigin(origins = "*")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    /**
     * POST /reviews and POST /api/reviews
     * Add a review for a movie.
     */
    @PostMapping({"/reviews", "/api/reviews"})
    public ResponseEntity<Review> addReview(@Valid @RequestBody ReviewRequest request) {
        Review createdReview = reviewService.addReview(request);
        return new ResponseEntity<>(createdReview, HttpStatus.CREATED);
    }

    /**
     * GET /reviews/{movieId} and GET /api/reviews/{movieId}
     * Get all reviews for a specific movie.
     */
    @GetMapping({"/reviews/{movieId}", "/api/reviews/{movieId}"})
    public ResponseEntity<List<Review>> getReviewsByMovieId(@PathVariable Long movieId) {
        List<Review> reviews = reviewService.getReviewsByMovieId(movieId);
        return ResponseEntity.ok(reviews);
    }
}
