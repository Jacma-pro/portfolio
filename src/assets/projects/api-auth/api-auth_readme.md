# API Auth Favorites (Portfolio Project)

A backend REST API built with Node.js, Express, and SQLite.

This project is a **learning playground** designed to deepen my understanding of backend authentication flows. The main goal is to practice concepts I've encountered in professional environments, such as JWT strategies and secure password handling, by building them from scratch.

## 🚀 Learning Objectives
- Understanding the full **JWT (JSON Web Token)** authentication cycle.
- Implementing secure password storage with **bcrypt** (hashing & salting).
- Building protected routes using custom **Express middleware**.
- Managing a lightweight relational database using **SQLite**.
- Structuring a clean, scalable Node.js architecture.

## 🛠️ Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Security:** Helmet, bcryptjs, jsonwebtoken
- **Dev Tools:** Nodemon

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository_url>
   cd api-auth-favoris
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   The project uses a `.env` file (already included for this portfolio demo).
   *Note: In a real production app, `.env` would never be committed.*

4. **Run the server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Standard start
   npm start
   ```
   The server will start on `http://localhost:3000`.

## 🧪 Testing the API
A built-in test interface is available directly in the browser.
Simply navigate to: **http://localhost:3000**

You can also use tools like **Postman** or **cURL**.

### Endpoints

| Method | Endpoint             | Description                | Body Params              | Auth Required |
| :----- | :------------------- | :------------------------- | :----------------------- | :-----------: |
| POST   | `/api/auth/register` | Create a new account       | `{ "email", "password" }`| ❌            |
| POST   | `/api/auth/login`    | Login & receive JWT        | `{ "email", "password" }`| ❌            |
| GET    | `/api/users/profile` | Get current user info      | -                        | ✅ (Bearer)   |

## 🔒 Security Notes
- **Passwords** are never stored in plain text. They are hashed using `bcryptjs` with salt.
- **JWT Tokens** are signed with a secret key and expire after 24 hours.
- **Helmet** is used to set various HTTP headers for basic security protections.

---
*Created by Dorian Jacolin - 2026*