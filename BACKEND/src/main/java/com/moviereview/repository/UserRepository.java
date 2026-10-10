package com.moviereview.repository;

import com.moviereview.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository interface for User entity data operations.
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // Find a user by their unique email address
    Optional<User> findByEmail(String email);

    // Check if an email is already registered
    boolean existsByEmail(String email);
}
