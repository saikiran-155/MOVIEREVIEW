package com.moviereview.repository;

import com.moviereview.entity.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Movie entity data operations.
 */
@Repository
public interface MovieRepository extends JpaRepository<Movie, Long> {

    // Retrieve all movies ordered by release year or creation date
    List<Movie> findAllByOrderByCreatedAtDesc();

    // Search movies by title containing keyword (case-insensitive)
    List<Movie> findByTitleContainingIgnoreCase(String keyword);
}
