package com.moviereview.controller;

import com.moviereview.entity.Movie;
import com.moviereview.service.MovieService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller handling movie endpoints: Fetching all movies, movie details, and adding movies.
 */
@RestController
@CrossOrigin(origins = "*")
public class MovieController {

    private final MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    /**
     * GET /movies and GET /api/movies
     * Retrieve list of all movies.
     */
    @GetMapping({"/movies", "/api/movies"})
    public ResponseEntity<List<Movie>> getAllMovies() {
        List<Movie> movies = movieService.getAllMovies();
        return ResponseEntity.ok(movies);
    }

    /**
     * GET /movies/{id} and GET /api/movies/{id}
     * Retrieve single movie by its ID.
     */
    @GetMapping({"/movies/{id}", "/api/movies/{id}"})
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        Movie movie = movieService.getMovieById(id);
        return ResponseEntity.ok(movie);
    }

    /**
     * POST /movies and POST /api/movies
     * Add a new movie to the system.
     */
    @PostMapping({"/movies", "/api/movies"})
    public ResponseEntity<Movie> addMovie(@Valid @RequestBody Movie movie) {
        Movie savedMovie = movieService.saveMovie(movie);
        return new ResponseEntity<>(savedMovie, HttpStatus.CREATED);
    }
}
