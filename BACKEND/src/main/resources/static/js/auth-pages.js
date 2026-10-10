/**
 * ==========================================================
 * Movie Review System - Authentication Pages Logic (Login & Register)
 * ==========================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // If user is already logged in, redirect away from login/register
  const user = auth.getUser();
  if (user) {
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect');
    if (redirectUrl) {
      window.location.href = decodeURIComponent(redirectUrl);
      return;
    }
  }

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  // Register Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }
});

/**
 * Handles User Login
 */
async function handleLogin(e) {
  e.preventDefault();

  const emailInput = document.getElementById('login-email');
  const passwordInput = document.getElementById('login-password');
  const errorBox = document.getElementById('login-error');
  const submitBtn = document.getElementById('login-submit-btn');

  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';

  if (errorBox) errorBox.style.display = 'none';

  if (!email || !password) {
    displayError(errorBox, 'Please provide both email and password.');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Signing in...';
  }

  try {
    const response = await api.login({ email, password });
    
    // Save user state
    auth.setUser(response.user);
    showToast(`Welcome back, ${response.user.name}!`, 'success');

    // Redirect to requested page or home
    const urlParams = new URLSearchParams(window.location.search);
    const redirectUrl = urlParams.get('redirect');

    setTimeout(() => {
      if (redirectUrl) {
        window.location.href = decodeURIComponent(redirectUrl);
      } else {
        window.location.href = 'index.html';
      }
    }, 1000);

  } catch (error) {
    displayError(errorBox, error.message || 'Invalid email or password.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Sign In';
    }
  }
}

/**
 * Handles User Registration
 */
async function handleRegister(e) {
  e.preventDefault();

  const nameInput = document.getElementById('register-name');
  const emailInput = document.getElementById('register-email');
  const passwordInput = document.getElementById('register-password');
  const confirmPasswordInput = document.getElementById('register-confirm-password');
  const errorBox = document.getElementById('register-error');
  const submitBtn = document.getElementById('register-submit-btn');

  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value.trim() : '';
  const confirmPassword = confirmPasswordInput ? confirmPasswordInput.value.trim() : '';

  if (errorBox) errorBox.style.display = 'none';

  // Client-side validations
  if (!name || !email || !password || !confirmPassword) {
    displayError(errorBox, 'Please complete all required fields.');
    return;
  }

  if (name.length < 2) {
    displayError(errorBox, 'Name must be at least 2 characters.');
    return;
  }

  if (!isValidEmail(email)) {
    displayError(errorBox, 'Please enter a valid email address.');
    return;
  }

  if (password.length < 6) {
    displayError(errorBox, 'Password must be at least 6 characters long.');
    return;
  }

  if (password !== confirmPassword) {
    displayError(errorBox, 'Passwords do not match. Please verify.');
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Creating Account...';
  }

  try {
    const response = await api.register({ name, email, password });

    showToast('Registration successful! Please log in.', 'success');

    // Automatically set logged in or redirect to login page
    if (response.user) {
      auth.setUser(response.user);
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1200);
    } else {
      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1200);
    }

  } catch (error) {
    displayError(errorBox, error.message || 'Registration failed. Email might already exist.');
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Create Account';
    }
  }
}

function displayError(container, message) {
  if (container) {
    container.style.display = 'block';
    container.innerText = message;
  } else {
    showToast(message, 'error');
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
