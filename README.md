# Call My Pods (CMP) Backend

This repository contains the backend server for the "Call My Pods" application. It's a Node.js application built with the Express.js framework and uses Firebase for authentication and database services.

## Project Overview

The backend is responsible for:
-   Handling user authentication (Sign Up and Login).
-   Serving the frontend HTML, CSS, and JavaScript files.
-   (Future) Managing EV pod data, trips, payments, and other core application logic as outlined in the project guide.

The application is containerized using Docker for easy and consistent deployment.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)
-   A Firebase project. If you don't have one, create one at the [Firebase Console](https://console.firebase.google.com/).

### 1. Installation

Clone the repository and install the dependencies.

```bash
git clone https://github.com/ddcofficial/CMP.git
cd CMP
npm install
```

### 2. Environment Configuration

This project uses environment variables to handle sensitive credentials securely. You will need to create a `.env` file in the root of the project.

**Step 1: Create the `.env` file**

Create a file named `.env` in the project's root directory.

**Step 2: Get Firebase Service Account Credentials**

1.  Go to your **Firebase project console**.
2.  Click the **gear icon** next to "Project Overview" and select **Project settings**.
3.  Go to the **Service accounts** tab.
4.  Click **"Generate new private key"**. A JSON file will be downloaded.

**Step 3: Populate the `.env` file**

Open the downloaded JSON file and your `.env` file. Copy the values from the JSON file into your `.env` file, following the format below.

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-client-x509-cert-url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

**IMPORTANT:** For the `FIREBASE_PRIVATE_KEY` value, you must replace all newline characters (`\n`) with the literal string `\\n`. The `.env` file format does not support multi-line values, so this is a necessary workaround.

### 3. Frontend Firebase Configuration

The frontend also needs to be configured to communicate with Firebase for authentication.

1.  In the Firebase Console, go to **Project settings**.
2.  Under the "General" tab, scroll down to "Your apps".
3.  If you haven't already, create a new **Web App**.
4.  Find and copy the `firebaseConfig` object.
5.  Open the `public/login.html` file and paste this configuration into the `<script>` tag at the bottom of the file.

It should look like this:
```html
<!-- public/login.html -->
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js"></script>
<script>
  // PASTE YOUR FIREBASE CONFIG OBJECT HERE
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
<script src="/js/auth.js"></script>
```

### 4. Running the Application

Once you have completed the configuration, you can start the server.

```bash
node src/index.js
```

The server will start, and you can access the application by opening your browser and navigating to `http://localhost:3000`.

### 5. Using Docker (Optional)

If you have [Docker](https://www.docker.com/) installed, you can build and run the application in a container.

```bash
# Build the Docker image
docker build -t cmp-backend .

# Run the container
docker run -p 3000:3000 -v $(pwd)/.env:/.env cmp-backend
```
This will start the server inside a Docker container and expose it on port 3000.