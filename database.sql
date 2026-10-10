-- ==========================================================
-- Movie Review System - Database Schema & Initial Data
-- Database: MySQL
-- ==========================================================

-- 1. Create Database if it doesn't already exist
CREATE DATABASE IF NOT EXISTS movie_review_db;
USE movie_review_db;

-- 2. Drop existing tables if needed (order matters due to foreign keys)
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS movies;
DROP TABLE IF EXISTS users;

-- 3. Create Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create Movies Table
CREATE TABLE movies (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    rating DOUBLE DEFAULT 0.0,
    image_url VARCHAR(500) NOT NULL,
    genre VARCHAR(100),
    release_year INT,
    director VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Create Reviews Table
CREATE TABLE reviews (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    movie_id BIGINT NOT NULL,
    user_name VARCHAR(100),
    comment TEXT NOT NULL,
    rating DOUBLE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_review_movie FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE
);

-- ==========================================================
-- Seed Initial Sample Data
-- ==========================================================

-- Insert Sample Users (Passwords are simple plain/hash for beginner-friendly setup)
INSERT INTO users (id, name, email, password) VALUES
(1, 'Rahul Sharma', 'rahul@example.com', 'password123'),
(2, 'Priya Patel', 'priya@example.com', 'password123'),
(3, 'Amit Verma', 'amit@example.com', 'password123');

-- Insert Sample Movies (RRR, KGF, Baahubali 2, Interstellar)
INSERT INTO movies (id, title, description, rating, image_url, genre, release_year, director) VALUES
(1, 'RRR', 
    'A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in pre-independent India. Directed by S.S. Rajamouli, starring N.T. Rama Rao Jr. and Ram Charan.', 
    4.9, 
    'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80', 
    'Action, Drama, Historical', 
    2022, 
    'S.S. Rajamouli'),

(2, 'K.G.F: Chapter 2', 
    'In the blood-soaked Kolar Gold Fields, Rocky\'s name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order. Directed by Prashanth Neel, starring Yash.', 
    4.8, 
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80', 
    'Action, Crime, Thriller', 
    2022, 
    'Prashanth Neel'),

(3, 'Baahubali 2: The Conclusion', 
    'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.', 
    4.9, 
    'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&auto=format&fit=crop&q=80', 
    'Action, Fantasy, Epic', 
    2017, 
    'S.S. Rajamouli'),

(4, 'Interstellar', 
    'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new home planet for humanity.', 
    4.9, 
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80', 
    'Sci-Fi, Adventure, Drama', 
    2014, 
    'Christopher Nolan');

-- Insert Sample Reviews for RRR and KGF
INSERT INTO reviews (user_id, movie_id, user_name, comment, rating) VALUES
(1, 1, 'Rahul Sharma', 'Mind-blowing action sequences and emotional storytelling! The Naatu Naatu dance and interval fight scene are absolute peak cinema.', 5.0),
(2, 1, 'Priya Patel', 'S.S. Rajamouli has created another visual masterpiece. Ram Charan and Jr NTR gave career-defining performances!', 4.8),
(3, 2, 'Amit Verma', 'Rocking Star Yash dominates every single second on screen. The background score by Ravi Basrur is electrifying and intense!', 5.0),
(1, 2, 'Rahul Sharma', 'High octane mass action and incredible elevation scenes. An unforgettable theatrical cinematic experience.', 4.6);
