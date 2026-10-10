/**
 * ==========================================================
 * Movie Review System - Add Review Page Logic
 * ==========================================================
 */

let selectedRating = 5;
let moviesList = [];

document.addEventListener('DOMContentLoaded', async () => {
  // Check if user is logged in
  const user = auth.getUser();
  const authPrompt = document.getElementById('auth-prompt-banner');
  const reviewForm = document.getElementById('add-review-form');

  if (!user) {
    if (authPrompt) authPrompt.style.display = 'block';
  } else {
    if (authPrompt) authPrompt.style.display = 'none';
    const reviewerNameInput = document.getElementById('reviewer-name');
    if (reviewerNameInput) reviewerNameInput.value = user.name;
  }

  // Setup Star Selector
  setupStarPicker();

  // Populate Movies Dropdown
  await loadMovieOptions();

  // Form submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', handleAddReviewSubmit);
  }

  // Comment character count
  const commentInput = document.getElementById('review-comment');
  const charCounter = document.getElementById('char-count');
  if (commentInput && charCounter) {
    commentInput.addEventListener('input', () => {
      charCounter.innerText = `${commentInput.value.length} characters`;
    });
  }
});

/**
 * Loads movies into the dropdown and selects current movie if movieId is in URL
 */
async function loadMovieOptions() {
  const selectElem = document.getElementById('movie-select');
  if (!selectElem) return;

  const urlParams = new URLSearchParams(window.location.search);
  const preselectedMovieId = urlParams.get('movieId');

  try {
    moviesList = await api.getMovies();

    selectElem.innerHTML = '<option value="">-- Choose a Movie to Review --</option>' + 
      moviesList.map(m => `
        <option value="${m.id}" ${preselectedMovieId == m.id ? 'selected' : ''}>
          ${escapeHtml(m.title)} (${m.releaseYear || 'N/A'})
        </option>
      `).join('');

    if (preselectedMovieId) {
      updateMoviePreview(preselectedMovieId);
    }

    selectElem.addEventListener('change', (e) => {
      updateMoviePreview(e.target.value);
    });

  } catch (error) {
    selectElem.innerHTML = '<option value="">Failed to load movies</option>';
  }
}

/**
 * Updates small movie preview badge below select dropdown
 */
function updateMoviePreview(movieId) {
  const previewBox = document.getElementById('selected-movie-preview');
  if (!previewBox) return;

  const movie = moviesList.find(m => m.id == movieId);
  if (movie) {
    previewBox.style.display = 'flex';
    previewBox.innerHTML = `
      <img src="${escapeHtml(movie.imageUrl)}" alt="${escapeHtml(movie.title)}" style="width: 50px; height: 70px; object-fit: cover; border-radius: 6px;"
           onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop&q=80'">
      <div style="font-size: 0.9rem;">
        <div style="font-weight: 700; color: #fff;">${escapeHtml(movie.title)}</div>
        <div style="color: var(--accent-gold); font-size: 0.85rem;">Current Rating: ★ ${movie.rating ? movie.rating.toFixed(1) : 'New'}</div>
        <div style="color: var(--text-dim); font-size: 0.8rem;">${escapeHtml(movie.genre || '')}</div>
      </div>
    `;
  } else {
    previewBox.style.display = 'none';
  }
}

/**
 * Sets up 5-star interactive rating component
 */
function setupStarPicker() {
  const stars = document.querySelectorAll('#full-star-selector .star');
  const ratingText = document.getElementById('full-rating-text');

  const ratingDescriptions = {
    1: '1/5 - Poor 👎',
    2: '2/5 - Fair 😐',
    3: '3/5 - Average 🙂',
    4: '4/5 - Very Good! 👍',
    5: '5/5 - Masterpiece! 🌟'
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

  const selectorContainer = document.getElementById('full-star-selector');
  if (selectorContainer) {
    selectorContainer.addEventListener('mouseleave', () => {
      highlightStars(selectedRating);
    });
  }

  highlightStars(selectedRating);
}

function highlightStars(val) {
  const stars = document.querySelectorAll('#full-star-selector .star');
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
 * Handles Form Submission
 */
async function handleAddReviewSubmit(e) {
  e.preventDefault();

  const user = auth.getUser();
  if (!user) {
    showToast('Please login to post your review!', 'error');
    setTimeout(() => {
      window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`;
    }, 1200);
    return;
  }

  const movieSelect = document.getElementById('movie-select');
  const commentInput = document.getElementById('review-comment');
  const submitBtn = document.getElementById('submit-review-btn');

  const movieId = movieSelect ? movieSelect.value : null;
  const comment = commentInput ? commentInput.value.trim() : '';

  if (!movieId) {
    showToast('Please select a movie to review.', 'error');
    movieSelect.focus();
    return;
  }

  if (!comment) {
    showToast('Please write a review comment.', 'error');
    commentInput.focus();
    return;
  }

  if (comment.length < 10) {
    showToast('Your review comment should be at least 10 characters long.', 'error');
    commentInput.focus();
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Publishing Review...';
  }

  try {
    const payload = {
      userId: user.id || 1,
      movieId: parseInt(movieId),
      userName: user.name,
      comment: comment,
      rating: parseFloat(selectedRating)
    };

    await api.addReview(payload);
    showToast('Review submitted successfully! Redirecting...', 'success');

    setTimeout(() => {
      window.location.href = `movie-details.html?id=${movieId}`;
    }, 1500);

  } catch (error) {
    showToast(error.message || 'Error submitting review', 'error');
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Submit Review';
    }
  }
}
