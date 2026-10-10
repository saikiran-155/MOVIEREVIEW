/**
 * ==========================================================
 * Movie Review System - Home Page Logic
 * ==========================================================
 */

let allMovies = [];

document.addEventListener('DOMContentLoaded', async () => {
  loadMovies();

  // Search input handler
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      filterMovies(e.target.value);
    });
  }
});

/**
 * Loads movies from the backend REST API
 */
async function loadMovies() {
  const movieGrid = document.getElementById('movie-grid');
  if (!movieGrid) return;

  movieGrid.innerHTML = `
    <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
      <div style="font-size: 1.5rem; margin-bottom: 10px;">⏳</div>
      Loading blockbuster movies...
    </div>
  `;

  try {
    allMovies = await api.getMovies();
    renderMovies(allMovies);
  } catch (error) {
    movieGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #ef4444;">
        <p>⚠️ Unable to fetch movies from server.</p>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 8px;">Ensure Spring Boot backend is active on http://localhost:8080</p>
      </div>
    `;
  }
}

/**
 * Renders an array of movies into the card grid
 */
function renderMovies(movies) {
  const movieGrid = document.getElementById('movie-grid');
  if (!movieGrid) return;

  if (!movies || movies.length === 0) {
    movieGrid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px; color: var(--text-muted);">
        <h3>No movies found</h3>
        <p>Try searching with another keyword.</p>
      </div>
    `;
    return;
  }

  movieGrid.innerHTML = movies.map(movie => `
    <div class="movie-card">
      <div class="poster-container">
        <img class="movie-poster" src="${escapeHtml(movie.imageUrl)}" alt="${escapeHtml(movie.title)}" loading="lazy" 
             onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'">
        <div class="rating-badge">
          ★ ${movie.rating ? movie.rating.toFixed(1) : 'New'}
        </div>
      </div>
      <div class="movie-info">
        <div class="movie-meta">
          <span class="movie-tag">${escapeHtml(movie.genre ? movie.genre.split(',')[0] : 'Feature')}</span>
          ${movie.releaseYear ? `<span>• ${movie.releaseYear}</span>` : ''}
        </div>
        <h3 class="movie-title">${escapeHtml(movie.title)}</h3>
        <p class="movie-desc">${escapeHtml(movie.description)}</p>
        <div class="card-actions">
          <a href="movie-details.html?id=${movie.id}" class="btn btn-secondary btn-sm">
            Details & Reviews
          </a>
          <a href="add-review.html?movieId=${movie.id}" class="btn btn-primary btn-sm">
            ★ Review
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Filters movies in real-time as user types in search box
 */
function filterMovies(query) {
  const term = query.toLowerCase().trim();
  if (!term) {
    renderMovies(allMovies);
    return;
  }

  const filtered = allMovies.filter(movie => 
    movie.title.toLowerCase().includes(term) ||
    (movie.genre && movie.genre.toLowerCase().includes(term)) ||
    (movie.director && movie.director.toLowerCase().includes(term)) ||
    (movie.description && movie.description.toLowerCase().includes(term))
  );

  renderMovies(filtered);
}
