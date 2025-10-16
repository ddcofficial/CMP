document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  const loginButton = loginForm.querySelector('button[type="submit"]');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const googleSignInButton = document.getElementById('google-signin');

  const signupButton = document.querySelector('.flex button:nth-child(2)');
  const loginTabButton = document.querySelector('.flex button:nth-child(1)');

  let isLogin = true;

  signupButton.addEventListener('click', () => {
    isLogin = false;
    loginButton.textContent = 'Sign Up';
    loginTabButton.classList.remove('bg-primary', 'text-white');
    loginTabButton.classList.add('text-[#4a5568]', 'dark:text-[#a0aec0]');
    signupButton.classList.add('bg-primary', 'text-white');
    signupButton.classList.remove('text-[#4a5568]', 'dark:text-[#a0aec0]');
  });

  loginTabButton.addEventListener('click', () => {
    isLogin = true;
    loginButton.textContent = 'Log In';
    signupButton.classList.remove('bg-primary', 'text-white');
    signupButton.classList.add('text-[#4a5568]', 'dark:text-[#a0aec0]');
    loginTabButton.classList.add('bg-primary', 'text-white');
    loginTabButton.classList.remove('text-[#4a5568]', 'dark:text-[#a0aec0]');
  });

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/dashboard.html';
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });

  googleSignInButton.addEventListener('click', () => {
      // Mock Google Sign-In
      localStorage.setItem('token', 'mock-google-token');
      window.location.href = '/dashboard.html';
  });
});