# Call My Pods (CMP) - Functional Prototype

This repository contains a functional prototype for the "Call My Pods" application. It includes a frontend application, backend microservices, and an API gateway, all orchestrated with Docker Compose to provide a one-command startup experience.

## Project Overview

This prototype demonstrates a complete, end-to-end user flow:
-   A user can visit the web application, sign up, and log in.
-   The dashboard displays a list of nearby pods with their current status, powered by a backend service that provides mock data.

The architecture includes:
-   **Frontend:** A static web application built with HTML, CSS, and JavaScript.
-   **Backend Microservices:**
    -   `auth-service`: Handles user authentication.
    -   `pod-service`: Manages pod data.
-   **API Gateway:** An NGINX server that routes traffic to the appropriate service.
-   **Databases:** MongoDB and Redis, running in Docker containers.

## Domain Model

### What is a "Pod"?

In the context of the CMP project, a **Pod** represents a single electric vehicle in the fleet. It is the core entity of the system and contains all the information related to a specific vehicle, including its hardware specifications, battery status, location, and maintenance history.

## Service Responsibilities

-   **`auth-service`**: Handles all user authentication and authorization logic, including user registration, login, and token management.
-   **`pod-service`**: Manages the core "Pod" entity, including all CRUD operations and business logic related to the vehicle fleet.
-   **`frontend/web-app`**: A static web application that provides the user interface for the CMP platform.
-   **`nginx`**: The API gateway that routes incoming traffic to the appropriate service.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

-   [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/)

### 1. Environment Configuration

The project uses an `.env` file to manage environment variables.

1.  **Create the `.env` file:**
    -   Copy the example file: `cp .env.example .env`
2.  **Update Firebase Configuration (for login page):**
    -   Open `frontend/web-app/login.html`.
    -   Find the `firebaseConfig` object and replace the placeholder values with your actual Firebase web app credentials. You can find these in your Firebase project settings.
3.  **Update JWT Secret:**
    -   In the `.env` file, change the `JWT_SECRET` to a long, random string of your choice.

### 3. Important: Firebase Security Rules

Since the frontend application connects directly to Firebase for authentication, it is **critical** that you configure Firestore/Firebase security rules in the Firebase Console. This prevents unauthorized users from reading or writing data to your database.

A basic set of rules to get started would be to ensure only authenticated users can read/write their own data.

**Example (rules.firestore):**
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read and write only their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    // Pods can be read by any authenticated user, but only written by admins/operators
    match /pods/{podId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'operator'];
    }
  }
}
```

**Always test your security rules thoroughly before deploying to production.**

### 4. Running the Application

With Docker and Docker Compose installed, you can start the entire application with a single command from the root of the project:

```bash
make dev
```

Alternatively, you can use Docker Compose directly:
```bash
docker-compose up --build
```

This command will:
1.  Build the Docker images for the frontend and all backend services.
2.  Start all the containers (NGINX, frontend, auth-service, pod-service, MongoDB, Redis).

Once all the services are running, you can access the application by opening your browser and navigating to:

**http://localhost**

The NGINX gateway will automatically route you to the frontend application.

### Makefile Commands

This project includes a `Makefile` to simplify common development tasks:

-   `make dev`: Starts all services in development mode with hot-reloading.
-   `make up`: Starts all services in detached (background) mode.
-   `make down`: Stops all running services.
-   `make logs`: Tails the logs from all running services.
-   `make test`: Runs the test suites for all backend services.
-   `make lint`: Lints the code for all backend services.