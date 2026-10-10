/**
 * ==========================================================
 * Movie Review System - Centralized API Service (Fetch API)
 * ==========================================================
 * Connects frontend client to Spring Boot REST backend endpoints.
 */

const API_BASE_URL = 'http://localhost:8080';

// Fallback demo data in case backend is not yet started or database is initializing
const DEMO_MOVIES = [
  {
    id: 1,
    title: 'RRR',
    description: 'A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in pre-independent India. Directed by S.S. Rajamouli, starring N.T. Rama Rao Jr. and Ram Charan.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80',
    genre: 'Action, Drama, Historical',
    releaseYear: 2022,
    director: 'S.S. Rajamouli'
  },
  {
    id: 2,
    title: 'K.G.F: Chapter 2',
    description: 'In the blood-soaked Kolar Gold Fields, Rocky\'s name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order. Directed by Prashanth Neel, starring Yash.',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80',
    genre: 'Action, Crime, Thriller',
    releaseYear: 2022,
    director: 'Prashanth Neel'
  },
  {
    id: 3,
    title: 'Baahubali 2: The Conclusion',
    description: 'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&auto=format&fit=crop&q=80',
    genre: 'Action, Fantasy, Epic',
    releaseYear: 2017,
    director: 'S.S. Rajamouli'
  },
  {
    id: 4,
    title: 'Interstellar',
    description: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new home planet for humanity.',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80',
    genre: 'Sci-Fi, Adventure, Drama',
    releaseYear: 2014,
    director: 'Christopher Nolan'
  }
];

const DEMO_REVIEWS = {
  1: [
    {
      id: 101,
      userId: 1,
      movieId: 1,
      userName: 'Rahul Sharma',
      rating: 5.0,
      comment: 'Mind-blowing action sequences and emotional storytelling! The Naatu Naatu dance and interval fight scene are absolute peak cinema.',
      createdAt: '2026-10-01T12:00:00'
    },
    {
      id: 102,
      userId: 2,
      movieId: 1,
      userName: 'Priya Patel',
      rating: 4.8,
      comment: 'S.S. Rajamouli has created another visual masterpiece. Ram Charan and Jr NTR gave career-defining performances!',
      createdAt: '2026-10-02T15:30:00'
    }
  ],
  2: [
    {
      id: 103,
      userId: 3,
      movieId: 2,
      userName: 'Amit Verma',
      rating: 5.0,
      comment: 'Rocking Star Yash dominates every single second on screen. The background score by Ravi Basrur is electrifying and intense!',
      createdAt: '2026-10-02T18:10:00'
    },
    {
      id: 104,
      userId: 1,
      movieId: 2,
      userName: 'Rahul Sharma',
      rating: 4.6,
      comment: 'High octane mass action and incredible elevation scenes. An unforgettable theatrical cinematic experience.',
      createdAt: '2026-10-03T10:15:00'
    }
  ]
};

const api = {
  /**
   * GET /movies - Retrieve list of all movies
   */
  async getMovies() {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable at', API_BASE_URL, '- using demo movies data.', error.message);
      return DEMO_MOVIES;
    }
  },

  /**
   * GET /movies/{id} - Retrieve details of a single movie
   */
  async getMovieById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`);
      if (!response.ok) {
        throw new Error(`Movie not found (status ${response.status})`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Backend fetch failed for movie id ${id} - checking demo fallback.`, error.message);
      const found = DEMO_MOVIES.find(m => m.id === parseInt(id));
      if (found) return found;
      throw error;
    }
  },

  /**
   * GET /reviews/{movieId} - Retrieve all reviews for a movie
   */
  async getReviews(movieId) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews/${movieId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.warn(`Backend fetch failed for reviews of movie ${movieId} - checking demo fallback.`);
      return DEMO_REVIEWS[movieId] || [];
    }
  },

  /**
   * POST /reviews - Submit a new movie review
   * Payload: { userId, movieId, userName, comment, rating }
   */
  async addReview(reviewData) {
    try {
      const response = await fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit review');
      }
      return data;
    } catch (error) {
      console.warn('Backend unavailable, simulating local review storage:', error.message);
      // Fallback local simulation so user flow doesn't break
      const localReview = {
        id: Date.now(),
        ...reviewData,
        createdAt: new Date().toISOString()
      };
      if (!DEMO_REVIEWS[reviewData.movieId]) {
        DEMO_REVIEWS[reviewData.movieId] = [];
      }
      DEMO_REVIEWS[reviewData.movieId].unshift(localReview);
      return localReview;
    }
  },

  /**
   * POST /register - Register a new user
   * Payload: { name, email, password }
   */
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      return data;
    } catch (error) {
      // If server unreachable, check if network error or validation error
      if (error.message.includes('HTTP error') || error.message.includes('Registration failed')) {
        throw error;
      }
      // Demo mock fallback if backend is offline
      console.warn('Backend offline, simulating registration for:', userData.email);
      return {
        success: true,
        message: 'Registration successful! (Demo Mode)',
        user: { id: Date.now(), name: userData.name, email: userData.email }
      };
    }
  },

  /**
   * POST /login - Authenticate existing user
   * Payload: { email, password }
   */
  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }
      return data;
    } catch (error) {
      if (error.message.includes('Invalid credentials') || error.message.includes('HTTP error')) {
        throw error;
      }
      // Demo mock login fallback
      console.warn('Backend offline, simulating login for:', credentials.email);
      return {
        success: true,
        message: 'Login successful! (Demo Mode)',
        user: {
          id: 1,
          name: credentials.email.split('@')[0],
          email: credentials.email
        }
      };
    }
  }
};
