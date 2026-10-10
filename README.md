# 🎬 Movie Review System - Full-Stack Web Application

A complete, production-ready, full-stack **Movie Review & Rating Web Application** built with **Java (Spring Boot)**, **MySQL (JPA / Hibernate)**, and modern **HTML5, CSS3, & JavaScript (Fetch API)**.

---

## 🌟 Key Features

### 1. Frontend:
- **Home Page**: Displays featured and trending movies (like **RRR**, **K.G.F: Chapter 2**, **Baahubali 2**, **Interstellar**) with high-resolution posters, genres, release years, dynamic star rating badges, and instant search/filtering.
- **Movie Details Page**: Comprehensive view including large poster, director, genre tags, aggregate rating score, full synopsis, and community reviews. Includes an instant inline review box.
- **Dedicated Add Review Page**: Allows users to select any movie from a dropdown (or pre-selected via URL), pick an interactive 1–5 star rating with real-time feedback, and write a detailed review.
- **Authentication Pages (Login & Register)**: Clean glassmorphic UI with client-side validation, password matching, session persistence via `localStorage`, and dynamic navigation bar updates (User profile & Logout button).
- **Responsive Cinema Theme**: Sleek dark-mode aesthetic with custom animations, card hover effects, and toast alert notifications.

### 2. Backend (Spring Boot):
- **Layered Architecture**: Strict separation of concerns across `Controller`, `Service`, `Repository`, `Entity`, and `DTO` layers.
- **RESTful Endpoints**:
  - `POST /register` or `/api/register` → Register user
  - `POST /login` or `/api/login` → Authenticate user
  - `GET /movies` or `/api/movies` → Get all movies
  - `GET /movies/{id}` or `/api/movies/{id}` → Get movie details
  - `POST /reviews` or `/api/reviews` → Add review (and automatically update the movie's average rating)
  - `GET /reviews/{movieId}` or `/api/reviews/{movieId}` → Get reviews for a movie
- **Dynamic Rating Calculation**: Whenever a review is added, the backend automatically recalculates and updates the movie's average score in the database!
- **Data Seeding**: Automatically populates sample movies (**RRR**, **KGF**, etc.) and reviews on startup via `DataInitializer.java`.
- **Validation & Exception Handling**: `@Valid` input validation with structured error responses via `@RestControllerAdvice`.
- **CORS Configured**: Global Cross-Origin Resource Sharing enabled for seamless frontend-backend communication.

### 3. Database (MySQL):
- Normalized schema with `users`, `movies`, and `reviews` tables.
- Foreign key constraints with `ON DELETE CASCADE`.
- Spring Data JPA with `update` DDL auto-mode for automatic table generation and maintenance.

---

## 📁 Project Directory Structure

```
MOVIE REVIEW/
├── BACKEND/
│   ├── pom.xml
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/moviereview/
│   │   │   │   ├── MovieReviewApplication.java      # Main Spring Boot Entry Point
│   │   │   │   ├── config/
│   │   │   │   │   ├── CorsConfig.java               # Global CORS mapping
│   │   │   │   │   └── DataInitializer.java          # Auto-seeds RRR, KGF & sample reviews
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java           # Login & Registration REST APIs
│   │   │   │   │   ├── MovieController.java          # Movie listing & details REST APIs
│   │   │   │   │   └── ReviewController.java         # Review creation & fetching REST APIs
│   │   │   │   ├── dto/
│   │   │   │   │   ├── ApiResponse.java              # Generic response model
│   │   │   │   │   ├── AuthResponse.java             # Auth payload with user details
│   │   │   │   │   ├── LoginRequest.java             # Login request payload
│   │   │   │   │   ├── RegisterRequest.java          # Registration request payload
│   │   │   │   │   └── ReviewRequest.java            # Review submission payload
│   │   │   │   ├── entity/
│   │   │   │   │   ├── Movie.java                    # Movie JPA Entity
│   │   │   │   │   ├── Review.java                   # Review JPA Entity
│   │   │   │   │   └── User.java                     # User JPA Entity
│   │   │   │   ├── exception/
│   │   │   │   │   ├── GlobalExceptionHandler.java   # Centralized error handler
│   │   │   │   │   └── ResourceNotFoundException.java# 404 Exception
│   │   │   │   ├── repository/
│   │   │   │   │   ├── MovieRepository.java          # Movie JPA Repository
│   │   │   │   │   ├── ReviewRepository.java         # Review JPA Repository
│   │   │   │   │   └── UserRepository.java           # User JPA Repository
│   │   │   │   └── service/
│   │   │   │       ├── MovieService.java             # Movie business logic
│   │   │   │       ├── ReviewService.java            # Review & rating calculation logic
│   │   │   │       └── UserService.java              # User registration & login logic
│   │   │   └── resources/
│   │   │       ├── application.properties            # MySQL and JPA configuration
│   │   │       ├── schema.sql                        # Table definitions
│   │   │       ├── data.sql                          # Initial seed data
│   │   │       └── static/                           # Embedded frontend build for Spring Boot
│   │   └── test/
├── Frontend/
│   ├── index.html                                    # Home Page (Movie list & search)
│   ├── movie-details.html                            # Movie Details & Reviews Page
│   ├── add-review.html                               # Dedicated Add Review Page
│   ├── login.html                                    # User Login Page
│   ├── register.html                                 # User Registration Page
│   ├── css/
│   │   └── style.css                                 # Master Dark Theme Stylesheet
│   └── js/
│       ├── api.js                                    # Fetch API helper functions
│       ├── auth.js                                   # Session manager & toast notifications
│       ├── home.js                                   # Home page movie cards & search logic
│       ├── movie-details.js                          # Details & inline reviews logic
│       ├── add-review.js                             # Add review form & star rating logic
│       └── auth-pages.js                             # Login & Registration form handlers
├── database.sql                                      # Standalone MySQL script
└── README.md                                         # Documentation & Setup Guide
```

---

## 🚀 Getting Started

### Step 1: Database Setup (MySQL)
1. Start your **MySQL Server** (via MySQL Workbench, XAMPP, or command line).
2. Open `database.sql` located in the project root and execute it in **MySQL Workbench**, **phpMyAdmin**, or the **MySQL CLI**:
   ```sql
   source /path/to/MOVIE REVIEW/database.sql;
   ```
   *(Note: Spring Boot's `application.properties` also has `createDatabaseIfNotExist=true` and JPA auto-update, so it can initialize automatically!)*

3. Verify or update your database credentials in `BACKEND/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/movie_review_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
   spring.datasource.username=root
   spring.datasource.password=root
   ```
   *(Change `root` to your MySQL password if different).*

---

### Step 2: Run the Spring Boot Backend

#### Option A: Using Maven CLI
Navigate to the `BACKEND` directory and run:
```bash
cd BACKEND
mvn spring-boot:run
```

#### Option B: Using an IDE (IntelliJ IDEA / Eclipse / VS Code)
1. Open the `BACKEND` directory in your favorite IDE as a Maven project.
2. Locate `com.moviereview.MovieReviewApplication.java`.
3. Right-click and choose **Run 'MovieReviewApplication'**.
4. The server will start on `http://localhost:8080`.

---

### Step 3: Run the Frontend

You have two easy options to view and test the frontend:

#### Option A: Direct Browser / Live Server (Recommended)
1. Navigate to the `Frontend` folder.
2. Double-click `index.html` to open it in your browser (Chrome, Edge, Firefox, etc.) or right-click and choose **Open with Live Server** in VS Code.
3. The frontend will communicate directly with the Spring Boot backend at `http://localhost:8080`.

#### Option B: Direct via Spring Boot
Because the frontend files are also placed in `BACKEND/src/main/resources/static`, once the backend is running, you can simply visit:
```
http://localhost:8080/index.html
```

---

## 📡 REST API Reference

### 1. User Authentication

#### Register User
- **Method:** `POST`
- **Path:** `/register` or `/api/register`
- **Request Body:**
  ```json
  {
    "name": "Abhiram Pujari",
    "email": "abhiram@example.com",
    "password": "password123"
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Registration successful! You can now log in.",
    "user": {
      "id": 4,
      "name": "Abhiram Pujari",
      "email": "abhiram@example.com"
    }
  }
  ```

#### Login User
- **Method:** `POST`
- **Path:** `/login` or `/api/login`
- **Request Body:**
  ```json
  {
    "email": "rahul@example.com",
    "password": "password123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful! Welcome back, Rahul Sharma",
    "user": {
      "id": 1,
      "name": "Rahul Sharma",
      "email": "rahul@example.com"
    }
  }
  ```

---

### 2. Movies

#### Get All Movies
- **Method:** `GET`
- **Path:** `/movies` or `/api/movies`
- **Response (200 OK):**
  ```json
  [
    {
      "id": 1,
      "title": "RRR",
      "description": "A fearless warrior on a perilous mission...",
      "rating": 4.9,
      "imageUrl": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80",
      "genre": "Action, Drama, Historical",
      "releaseYear": 2022,
      "director": "S.S. Rajamouli"
    },
    {
      "id": 2,
      "title": "K.G.F: Chapter 2",
      "description": "In the blood-soaked Kolar Gold Fields...",
      "rating": 4.8,
      "imageUrl": "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80",
      "genre": "Action, Crime, Thriller",
      "releaseYear": 2022,
      "director": "Prashanth Neel"
    }
  ]
  ```

#### Get Movie by ID
- **Method:** `GET`
- **Path:** `/movies/{id}` or `/api/movies/{id}`
- **Response (200 OK):** Movie object.

---

### 3. Reviews

#### Add Review
- **Method:** `POST`
- **Path:** `/reviews` or `/api/reviews`
- **Request Body:**
  ```json
  {
    "userId": 1,
    "movieId": 1,
    "userName": "Rahul Sharma",
    "comment": "Electrifying theatre experience with incredible action sequences!",
    "rating": 5.0
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": 5,
    "userId": 1,
    "movieId": 1,
    "userName": "Rahul Sharma",
    "comment": "Electrifying theatre experience with incredible action sequences!",
    "rating": 5.0,
    "createdAt": "2026-10-03T14:00:00"
  }
  ```
  *(Note: The movie's average rating in the database is automatically recalculated!)*

#### Get Reviews for a Movie
- **Method:** `GET`
- **Path:** `/reviews/{movieId}` or `/api/reviews/{movieId}`
- **Response (200 OK):** Array of review objects sorted with latest reviews first.

---

## 👥 Sample Test Credentials

| Name | Email | Password |
|---|---|---|
| Rahul Sharma | `rahul@example.com` | `password123` |
| Priya Patel | `priya@example.com` | `password123` |
| Amit Verma | `amit@example.com` | `password123` |

---

## 🛠️ Testing Without Backend (Demo Fallback)
If you want to immediately explore the UI before starting MySQL or Spring Boot:
- Simply open `Frontend/index.html`.
- The centralized `js/api.js` automatically includes high-fidelity fallback demo data for **RRR**, **KGF**, and interactive reviews so you can test all UI workflows immediately!
