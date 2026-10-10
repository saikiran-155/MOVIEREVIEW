/**
 * ==========================================================
 * Movie Review System - Authentication & Session Helper
 * ==========================================================
 */

const auth = {
  /**
   * Retrieves the currently logged-in user from localStorage.
   */
  getUser() {
    const raw = localStorage.getItem('movieReviewUser');
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  },

  /**
   * Saves user object to localStorage upon successful login/register.
   */
  setUser(user) {
    localStorage.setItem('movieReviewUser', JSON.stringify(user));
  },

  /**
   * Clears session and logs out user.
   */
  logout() {
    localStorage.removeItem('movieReviewUser');
    showToast('Logged out successfully', 'success');
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 800);
  },

  /**
   * Checks if user is authenticated; if not, redirects to login page.
   */
  requireAuth() {
    const user = this.getUser();
    if (!user) {
      const currentUrl = encodeURIComponent(window.location.href);
      window.location.href = `login.html?redirect=${currentUrl}`;
      return null;
    }
    return user;
  },

  /**
   * Dynamically renders user status in navbar on all pages.
   */
  renderNavbar() {
    const authContainer = document.getElementById('nav-auth-container');
    if (!authContainer) return;

    const user = this.getUser();

    if (user) {
      const initial = (user.name || 'U').charAt(0).toUpperCase();
      authContainer.innerHTML = `
        <div class="user-badge">
          <div class="user-avatar">${initial}</div>
          <span>${escapeHtml(user.name)}</span>
        </div>
        <button id="logout-btn" class="btn btn-secondary btn-sm" title="Log Out">
          Sign Out
        </button>
      `;

      document.getElementById('logout-btn')?.addEventListener('click', () => {
        auth.logout();
      });
    } else {
      authContainer.innerHTML = `
        <a href="login.html" class="btn btn-secondary btn-sm">Login</a>
        <a href="register.html" class="btn btn-primary btn-sm">Register</a>
      `;
    }
  }
};

/**
 * Escapes HTML characters to prevent XSS.
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Renders star rating HTML icons (e.g. ⭐⭐⭐⭐☆).
 */
function renderStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  let html = '';

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '★';
    } else if (i === fullStars + 1 && hasHalf) {
      html += '★';
    } else {
      html += '☆';
    }
  }
  return html;
}

/**
 * Global toast notification system.
 */
function showToast(message, type = 'success') {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }

  toast.className = `toast ${type} show`;
  const icon = type === 'success' ? '✓' : '⚠';
  toast.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Automatically initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  auth.renderNavbar();
});
