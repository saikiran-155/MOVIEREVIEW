package com.moviereview.repository;

import com.moviereview.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Review entity data operations.
 */
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    // Fetch all reviews for a specific movie, latest first
    List<Review> findByMovieIdOrderByCreatedAtDesc(Long movieId);

    // Calculate the average rating score for a movie
    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.movieId = :movieId")
    Double calculateAverageRatingByMovieId(@Param("movieId") Long movieId);

    // Count how many reviews exist for a movie
    long countByMovieId(Long movieId);
}
