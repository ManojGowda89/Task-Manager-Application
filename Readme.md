
# Task-Manager-Application

A full-stack task management application using React, Firebase for client-side state and authentication, and Express with MongoDB for server-side operations.

**Live Website**: [https://task.manojgowda.in/](https://task.manojgowda.in/)

---

## Getting Started

### Clone the Repository

To get started, clone the repository:

```bash
git clone https://github.com/ManojGowda89/Task-Manager-Application.git
cd Task-Manager-Application
```

### Install Dependencies and Start Application

This project uses a mono repo structure with separate `client` and `server` directories. To install all dependencies for both `client` and `server` in a single step and start both applications, run:

```bash
npm run dev
```

This command:
1. Installs root dependencies.
2. Installs all dependencies inside both the `client` and `server` folders.
3. Starts both the client and server concurrently, allowing you to develop and test both parts together.

### Running Client and Server Independently

If you want to run the client and server independently, use the following steps.

#### Running the Client Independently

To install dependencies and start the client application alone, navigate to the `client` directory:

```bash
cd client
npm install
npm run dev
```

#### Running the Server Independently

To install dependencies and start the server application alone, navigate to the `server` directory:

```bash
cd server
npm install
npm run dev
```

---

## Project Structure

### Client

The client is built with React and Firebase, leveraging Context API for state management and routing setup in `App.js`.

- **`src/store`**: Manages global state, API calls, and Firebase authentication context.
- **`src/layout`**: Contains layout components, including Navbar and Footer, which are consistent across the application.
- **`src/Auth`**: Includes authentication components like `Login`, `Signup`, and `Forgot Password` pages.
- **`src/pages`**: Contains the main pages of the app, such as `Home`, which displays tasks and manages task state.
- **`App.js`**: Manages routing, including secure routes and guest routes, to control access to various parts of the app.

### Server

The server is built with Express.js, using MongoDB as the database and `mb64-connect` for database connectivity and schema definitions.

- **`index.js`**: Sets up the Express server, handles CORS, and connects to MongoDB via `mb64-connect`.
- **`middlewares`**: Contains middleware for JWT authentication and other security-related checks.
- **`routes/authRoute.js`**: Manages authentication using Firebase, storing authenticated users in MongoDB, and issuing JWT tokens.
- **`routes/taskRoute.js`**: Provides CRUD routes for task management, including APIs for creating, reading, updating, and deleting tasks.

---

## Key Dependencies

- **Client**: React, Firebase, Context API
- **Server**: Express, MongoDB (with `mb64-connect`), JWT for secure access, CORS for cross-origin handling

---

With the live website link now added, users can directly access the application at [https://task.manojgowda.in/](https://task.manojgowda.in/).