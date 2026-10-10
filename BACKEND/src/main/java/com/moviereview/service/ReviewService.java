package com.moviereview.service;

import com.moviereview.dto.ReviewRequest;
import com.moviereview.entity.Movie;
import com.moviereview.entity.Review;
import com.moviereview.entity.User;
import com.moviereview.exception.ResourceNotFoundException;
import com.moviereview.repository.MovieRepository;
import com.moviereview.repository.ReviewRepository;
import com.moviereview.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service class handling review business logic: adding reviews and calculating movie rating.
 */
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;
    private final UserRepository userRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, 
                         MovieRepository movieRepository, 
                         UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
    }

    /**
     * Adds a review for a movie and automatically recalculates the movie's average rating.
     */
    @Transactional
    public Review addReview(ReviewRequest request) {
        // 1. Verify Movie exists
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with ID: " + request.getMovieId()));

        // 2. Fetch User to populate userName if not provided in the request
        String reviewerName = request.getUserName();
        if (reviewerName == null || reviewerName.trim().isEmpty()) {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));
            reviewerName = user.getName();
        }

        // 3. Create and save the new Review entity
        Review review = new Review();
        review.setUserId(request.getUserId());
        review.setMovieId(request.getMovieId());
        review.setUserName(reviewerName);
        review.setComment(request.getComment().trim());
        review.setRating(request.getRating());

        Review savedReview = reviewRepository.save(review);

        // 4. Dynamically recalculate the movie's average rating
        Double avgRating = reviewRepository.calculateAverageRatingByMovieId(movie.getId());
        if (avgRating != null) {
            double rounded = Math.round(avgRating * 10.0) / 10.0;
            movie.setRating(rounded);
            movieRepository.save(movie);
        }

        return savedReview;
    }

    /**
     * Retrieves all reviews submitted for a specific movie.
     */
    public List<Review> getReviewsByMovieId(Long movieId) {
        // Verify movie exists
        if (!movieRepository.existsById(movieId)) {
            throw new ResourceNotFoundException("Movie not found with ID: " + movieId);
        }
        return reviewRepository.findByMovieIdOrderByCreatedAtDesc(movieId);
    }
}
