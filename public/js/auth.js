document.addEventListener('DOMContentLoaded', () => {
  // IMPORTANT: You need to include the Firebase SDKs in your login.html file
  // and initialize Firebase with your project's configuration.
  // Example:
  // <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js"></script>
  // <script src="https://www.gstatic.com/firebasejs/8.10.1/firebase-auth.js"></script>
  // <script>
  //   const firebaseConfig = { ... };
  //   firebase.initializeApp(firebaseConfig);
  // </script>

  const auth = firebase.auth();
  const loginForm = document.querySelector('form');
  const loginButton = loginForm.querySelector('button[type="submit"]');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const signupButton = document.querySelector('.flex button:nth-child(2)');
  const loginTabButton = document.querySelector('.flex button:nth-child(1)');
  const googleSignInButton = document.getElementById('google-signin');

  let isLogin = true;

  googleSignInButton.addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await auth.signInWithPopup(provider);
      const idToken = await result.user.getIdToken();

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        window.location.href = '/dashboard.html';
      } else {
        const data = await response.json();
        alert(`Google Sign-In failed: ${data.error}`);
      }
    } catch (error) {
      alert(`Google Sign-In error: ${error.message}`);
    }
  });

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

    if (isLogin) {
      // Handle Login
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const idToken = await userCredential.user.getIdToken();

        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        if (response.ok) {
          window.location.href = '/dashboard.html';
        } else {
          const data = await response.json();
          alert(`Login failed: ${data.error}`);
        }
      } catch (error) {
        alert(`Login error: ${error.message}`);
      }
    } else {
      // Handle Sign Up
      try {
        const response = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          alert('Sign up successful! Please log in.');
          // Switch to login tab
          loginTabButton.click();
        } else {
          alert(`Sign up failed: ${data.error}`);
        }
      } catch (error) {
        alert(`Sign up error: ${error.message}`);
      }
    }
  });
});