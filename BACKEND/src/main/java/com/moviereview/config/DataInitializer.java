package com.moviereview.config;

import com.moviereview.entity.Movie;
import com.moviereview.entity.Review;
import com.moviereview.entity.User;
import com.moviereview.repository.MovieRepository;
import com.moviereview.repository.ReviewRepository;
import com.moviereview.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

/**
 * DataInitializer automatically populates sample movies and reviews into MySQL on application startup.
 */
@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository,
                                          MovieRepository movieRepository,
                                          ReviewRepository reviewRepository) {
        return args -> {
            // Seed Users if table is empty
            if (userRepository.count() == 0) {
                User user1 = new User("Rahul Sharma", "rahul@example.com", "password123");
                User user2 = new User("Priya Patel", "priya@example.com", "password123");
                User user3 = new User("Amit Verma", "amit@example.com", "password123");

                userRepository.saveAll(Arrays.asList(user1, user2, user3));
                System.out.println(">>> Sample Users Seeded Successfully.");
            }

            // Seed Movies if table is empty
            if (movieRepository.count() == 0) {
                Movie rrr = new Movie(
                        "RRR",
                        "A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in pre-independent India. Directed by S.S. Rajamouli, starring N.T. Rama Rao Jr. and Ram Charan.",
                        4.9,
                        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",
                        "Action, Drama, Historical",
                        2022,
                        "S.S. Rajamouli"
                );

                Movie kgf = new Movie(
                        "K.G.F: Chapter 2",
                        "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order. Directed by Prashanth Neel, starring Yash.",
                        4.8,
                        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
                        "Action, Crime, Thriller",
                        2022,
                        "Prashanth Neel"
                );

                Movie baahubali = new Movie(
                        "Baahubali 2: The Conclusion",
                        "When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
                        4.9,
                        "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&auto=format&fit=crop&q=80",
                        "Action, Fantasy, Epic",
                        2017,
                        "S.S. Rajamouli"
                );

                Movie interstellar = new Movie(
                        "Interstellar",
                        "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new home planet for humanity.",
                        4.9,
                        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80",
                        "Sci-Fi, Adventure, Drama",
                        2014,
                        "Christopher Nolan"
                );

                movieRepository.saveAll(Arrays.asList(rrr, kgf, baahubali, interstellar));
                System.out.println(">>> Sample Movies (RRR, KGF, etc.) Seeded Successfully.");

                // Seed Reviews for RRR & KGF
                Review r1 = new Review(1L, rrr.getId(), "Rahul Sharma",
                        "Mind-blowing action sequences and emotional storytelling! The Naatu Naatu dance and interval fight scene are absolute peak cinema.", 5.0);
                Review r2 = new Review(2L, rrr.getId(), "Priya Patel",
                        "S.S. Rajamouli has created another visual masterpiece. Ram Charan and Jr NTR gave career-defining performances!", 4.8);

                Review r3 = new Review(3L, kgf.getId(), "Amit Verma",
                        "Rocking Star Yash dominates every single second on screen. The background score by Ravi Basrur is electrifying and intense!", 5.0);
                Review r4 = new Review(1L, kgf.getId(), "Rahul Sharma",
                        "High octane mass action and incredible elevation scenes. An unforgettable theatrical cinematic experience.", 4.6);

                reviewRepository.saveAll(Arrays.asList(r1, r2, r3, r4));
                System.out.println(">>> Sample Reviews Seeded Successfully.");
            }
        };
    }
}
