package com.moviereview.service;

import com.moviereview.entity.Movie;
import com.moviereview.exception.ResourceNotFoundException;
import com.moviereview.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service class handling movie business logic.
 */
@Service
public class MovieService {

    private final MovieRepository movieRepository;

    @Autowired
    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    /**
     * Retrieves all movies available in the database.
     */
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    /**
     * Retrieves a single movie by its ID, or throws ResourceNotFoundException.
     */
    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Movie not found with ID: " + id));
    }

    /**
     * Adds a new movie to the catalog.
     */
    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    /**
     * Updates a movie's average rating.
     */
    public void updateMovieRating(Long movieId, Double newRating) {
        Movie movie = getMovieById(movieId);
        // Round to 1 decimal place e.g. 4.8
        double roundedRating = Math.round(newRating * 10.0) / 10.0;
        movie.setRating(roundedRating);
        movieRepository.save(movie);
    }
}
