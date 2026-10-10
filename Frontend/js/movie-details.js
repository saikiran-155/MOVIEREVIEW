/**
 * ==========================================================
 * Movie Review System - Movie Details Page Logic
 * ==========================================================
 */

let currentMovieId = null;
let currentMovie = null;
let selectedRating = 5;

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  currentMovieId = urlParams.get('id');

  if (!currentMovieId) {
    window.location.href = 'index.html';
    return;
  }

  // Setup inline star rating picker
  setupStarRating();

  // Load details and reviews
  await loadMovieDetails();
  await loadMovieReviews();

  // Review Form Submission Handler
  const reviewForm = document.getElementById('inline-review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleInlineReviewSubmit);
  }
});

/**
 * Fetches and displays details of the selected movie
 */
async function loadMovieDetails() {
  const container = document.getElementById('movie-details-hero');
  if (!container) return;

  try {
    currentMovie = await api.getMovieById(currentMovieId);

    document.title = `${currentMovie.title} - CineReview`;

    container.innerHTML = `
      <div class="details-poster-wrap">
        <img class="details-poster" src="${escapeHtml(currentMovie.imageUrl)}" alt="${escapeHtml(currentMovie.title)}"
             onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'">
      </div>
      <div class="details-content">
        <h1 class="details-title">${escapeHtml(currentMovie.title)}</h1>
        
        <div class="details-meta-bar">
          <span class="meta-pill highlight">${escapeHtml(currentMovie.genre || 'Action / Drama')}</span>
          ${currentMovie.releaseYear ? `<span class="meta-pill">📅 ${currentMovie.releaseYear}</span>` : ''}
          ${currentMovie.director ? `<span class="meta-pill">🎬 Dir: ${escapeHtml(currentMovie.director)}</span>` : ''}
        </div>

        <div class="rating-overview">
          <div class="score-box">
            <span class="score-number">${currentMovie.rating ? currentMovie.rating.toFixed(1) : '0.0'}</span>
            <span class="score-max">/ 5.0</span>
          </div>
          <div>
            <div class="stars-display">${renderStars(currentMovie.rating || 0)}</div>
            <div class="rating-count" id="rating-count-label">Community Rating</div>
          </div>
        </div>

        <div class="details-synopsis">
          <h3 style="color: #fff; margin-bottom: 8px;">Synopsis</h3>
          <p>${escapeHtml(currentMovie.description)}</p>
        </div>

        <div style="margin-top: auto; display: flex; gap: 14px;">
          <a href="#reviews-anchor" class="btn btn-gold">
            ⭐ Read Reviews
          </a>
          <a href="add-review.html?movieId=${currentMovie.id}" class="btn btn-primary">
            + Write Full Review
          </a>
        </div>
      </div>
    `;
  } catch (error) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #ef4444;">
        <h2>Movie Not Found</h2>
        <p style="margin: 12px 0 20px;">The requested movie could not be located in our database.</p>
        <a href="index.html" class="btn btn-secondary">← Back to Movies</a>
      </div>
    `;
  }
}

/**
 * Loads and renders all community reviews for this movie
 */
async function loadMovieReviews() {
  const reviewsList = document.getElementById('reviews-list');
  const reviewsCountBadge = document.getElementById('reviews-count');
  if (!reviewsList) return;

  try {
    const reviews = await api.getReviews(currentMovieId);

    if (reviewsCountBadge) {
      reviewsCountBadge.innerText = `(${reviews.length})`;
    }

    const countLabel = document.getElementById('rating-count-label');
    if (countLabel) {
      countLabel.innerText = `Based on ${reviews.length} user reviews`;
    }

    if (!reviews || reviews.length === 0) {
      reviewsList.innerHTML = `
        <div class="empty-reviews">
          <h3>No reviews yet for this movie!</h3>
          <p style="margin-top: 6px;">Be the first film critic to share your thoughts.</p>
        </div>
      `;
      return;
    }

    reviewsList.innerHTML = reviews.map(rev => {
      const name = rev.userName || 'Verified Cinephile';
      const initial = name.charAt(0).toUpperCase();
      const dateStr = rev.createdAt ? new Date(rev.createdAt).toLocaleDateString(undefined, {
        year: 'numeric', month: 'short', day: 'numeric'
      }) : 'Recently';

      return `
        <div class="review-card">
          <div class="review-top">
            <div class="reviewer-profile">
              <div class="user-avatar">${initial}</div>
              <div>
                <div class="reviewer-name">${escapeHtml(name)}</div>
                <div class="review-date">${dateStr}</div>
              </div>
            </div>
            <div class="review-rating-stars">
              ${renderStars(rev.rating)} <strong style="color: #fff; margin-left: 4px;">${rev.rating.toFixed(1)}</strong>
            </div>
          </div>
          <div class="review-comment">
            ${escapeHtml(rev.comment)}
          </div>
        </div>
      `;
    }).join('');

  } catch (error) {
    reviewsList.innerHTML = `
      <div class="empty-reviews" style="color: #ef4444;">
        <p>Could not load reviews at this moment.</p>
      </div>
    `;
  }
}

/**
 * Initializes interactive stars rating widget
 */
function setupStarRating() {
  const stars = document.querySelectorAll('#star-selector .star');
  const ratingText = document.getElementById('selected-rating-text');

  const ratingDescriptions = {
    1: '1/5 - Poor',
    2: '2/5 - Fair',
    3: '3/5 - Average',
    4: '4/5 - Very Good',
    5: '5/5 - Masterpiece!'
  };

  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      highlightStars(selectedRating);
      if (ratingText) {
        ratingText.innerText = ratingDescriptions[selectedRating];
      }
    });

    star.addEventListener('mouseenter', () => {
      const hoverVal = parseInt(star.getAttribute('data-value'));
      highlightStars(hoverVal);
    });
  });

  const selectorContainer = document.getElementById('star-selector');
  if (selectorContainer) {
    selectorContainer.addEventListener('mouseleave', () => {
      highlightStars(selectedRating);
    });
  }

  highlightStars(selectedRating);
}

function highlightStars(val) {
  const stars = document.querySelectorAll('#star-selector .star');
  stars.forEach(star => {
    const starVal = parseInt(star.getAttribute('data-value'));
    if (starVal <= val) {
      star.classList.add('active');
    } else {
      star.classList.remove('active');
    }
  });
}

/**
 * Handles fast inline review submission on the movie details page
 */
async function handleInlineReviewSubmit(e) {
  e.preventDefault();

  const user = auth.getUser();
  if (!user) {
    showToast('Please log in to submit a review!', 'error');
    setTimeout(() => {
      window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`;
    }, 1200);
    return;
  }

  const commentInput = document.getElementById('inline-review-comment');
  const comment = commentInput ? commentInput.value.trim() : '';

  if (!comment) {
    showToast('Please enter your review comments.', 'error');
    return;
  }

  const submitBtn = document.getElementById('submit-inline-review-btn');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';
  }

  try {
    const payload = {
      userId: user.id || 1,
      movieId: parseInt(currentMovieId),
      userName: user.name,
      comment: comment,
      rating: parseFloat(selectedRating)
    };

    await api.addReview(payload);
    showToast('Review submitted successfully!', 'success');

    // Reset form
    if (commentInput) commentInput.value = '';
    selectedRating = 5;
    highlightStars(5);

    // Refresh reviews and movie details to reflect new rating
    await loadMovieReviews();
    await loadMovieDetails();

  } catch (error) {
    showToast(error.message || 'Failed to submit review', 'error');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Submit Review';
    }
  }
}
