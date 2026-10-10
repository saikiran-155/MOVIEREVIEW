package com.moviereview.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

/**
 * Movie Entity representing movies stored in the database.
 */
@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Movie title is required")
    @Column(nullable = false, length = 255)
    private String title;

    @NotBlank(message = "Movie description is required")
    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private Double rating = 0.0;

    @NotBlank(message = "Movie image URL is required")
    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 100)
    private String genre;

    @Column(name = "release_year")
    private Integer releaseYear;

    @Column(length = 100)
    private String director;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    // Default No-Args Constructor (Required by JPA)
    public Movie() {
    }

    // Parameterized Constructor
    public Movie(String title, String description, Double rating, String imageUrl, String genre, Integer releaseYear, String director) {
        this.title = title;
        this.description = description;
        this.rating = rating;
        this.imageUrl = imageUrl;
        this.genre = genre;
        this.releaseYear = releaseYear;
        this.director = director;
        this.createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Integer getReleaseYear() {
        return releaseYear;
    }

    public void setReleaseYear(Integer releaseYear) {
        this.releaseYear = releaseYear;
    }

    public String getDirector() {
        return director;
    }

    public void setDirector(String director) {
        this.director = director;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
