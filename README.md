# MovieNest Angular Client

An Angular web application allowing users to browse movie information (genres, directors, synopses) and manage their favorite movies. Users can register, log in, and update their profiles. This project is paired with a Node.js/Express backend (MovieNest API) that interfaces with a MongoDB database.

---

## Table of Contents

1. [Overview & Features](#overview--features)
2. [Technology Stack](#technology-stack)  
3. [User Stories](#user-stories)  
4. [Prerequisites](#prerequisites)  
5. [Setting up the Development Environment](#setting-up-the-development-environment)  
6. [Database Configuration](#database-configuration)  
7. [Installation](#installation)  
8. [Running the App](#running-the-app)  
9. [Building for Production](#building-for-production)    
10. [Documentation](#documentation)  

---

## Overview & Features

**MovieNest Angular Client** is a single-page application (SPA) built with Angular and Angular Material. It allows users to:

- **Browse Movies**: View a list of all movies fetched from the MovieNest API.  
- **View Movie Details**: Access information about genre, director, and synopsis via dialogs.  
- **User Authentication**: Register a new account or log in with existing credentials.  
- **Manage Favorites**: Add or remove movies from a user’s list of favorite movies.  
- **Profile Management**: View and update user profile information (username, email, birth date, password).

---

## Technology Stack

- **Angular** (v15)
- **Angular Material** for UI components
- **RxJS** for async operations
- **TypeScript**
- **Node.js / npm**
- **MongoDB** (on the server side, via the MovieNest API)

---

## User Stories

1. **As a user**, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
2. **As a user**, I want to be able to create a profile so I can save data about my favorite movies.

**Key Features:**
- **Welcome View:** Log in or register.
- **All Movies View:** Once authenticated, view all movies.
- **Additional Details:** A button for **Director** info, **Genre** info, and **Synopsis** on each movie card.

---

## Prerequisites

- **Node.js** (version 14+ recommended)  
- **npm** (comes with Node.js; version 6+ recommended)  
- **Angular CLI** (optional, but recommended to easily run commands)
  ```bash
  npm install -g @angular/cli
  ```
Your **MovieNest API** (Node/Express server) should also be running, or you have the deployed version available.

---

## Setting up the Development Environment

1. Clone/download this repository to your local machine.
2. Install Node.js and npm if you haven’t already.
3. (Optional) Install Angular CLI:
  ```bash
  npm install -g @angular/cli
  ```

---

## Database Configuration

This Angular client consumes the MovieNest API, which uses a **MongoDB** database. The database credentials and environment variables are typically set on the server side. For local development:

- Clone or set up the **MovieNest API** repository (Node.js/Express).
- Configure your **MongoDB** connection in the server (e.g., CONNECTION_URI environment variable).
- Run npm install and npm start (or however your server is set up) in that server project.
- Confirm the API is listening on its port (e.g., localhost:8080 or your chosen port).

In the Angular client, if you need to change the **base URL** for the API, edit `apiUrl` in `fetch-api-data.service.ts`:
  ```ts
  // Example:
  const apiUrl = 'https://movie-nest-app-xxxx.herokuapp.com/';
  ```

---

## Installation

From your local copy of MovieNest-Angular-Client:

1. Install dependencies:
```bash
npm install
```
2. Optional: If you’re using the Angular CLI, you can run ng version to verify the CLI is properly installed.

---

## Running the App

1. **Development server:**

```bash
  npm start
```

  or
  
```bash
  ng serve
```
- Navigate to `http://localhost:4200/` in your browser.
- The app will automatically reload if you change any source files.
  
2. **Connect to the API:**
- Ensure the MovieNest API is running locally (e.g., `http://localhost:8080`) or is deployed (e.g., Heroku).
- The Angular client will make requests to that API.

---

## Building for Production

Run: 
```bash
npm run build
```
This will create a production build in the dist/ folder. You can deploy the built files to your chosen web server or service.

---



## Documentation

- **TypeDoc:** This project includes TypeDoc comments in the `.ts` files. Generate docs via:
```bash
npm run docs
```
The output is in `docs/`.

- **JSDoc:** The related **MovieNest API** uses JSDoc to document server endpoints.

- **Comments:** The codebase contains comments explaining key logic and usage.
