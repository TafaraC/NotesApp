# 📓 Real-Time Note/Recipe Book

## 🌟 Overview

This project is a full-stack web application designed for managing simple text notes or recipes, focusing on real-time data persistence. It serves as a practical exercise in establishing a secure API gateway using **Node.js/Express** to interact with a **NoSQL database (Firebase Firestore)**, accessed by a modern **React Single Page Application (SPA)** frontend.

The core goal is to understand the secure separation of client-side and server-side database access using the Firebase Admin SDK on the backend.

---

## 🛠 Technology Stack

| Component | Technology | Role |
| :--- | :--- | :--- |
| **Frontend (Client)** | **React** | User Interface, using functional components and Hooks (`useState`, `useEffect`). |
| **Backend (API Server)** | **Node.js / Express** | Defines RESTful API endpoints, handles requests, and manages secure database access. |
| **Database** | **Firebase Firestore** | NoSQL document store for persistent data storage. |
| **Database Interaction** | **Firebase Admin SDK** | Used exclusively by the **Node.js server** for secure, privileged operations. |
| | **Firebase Client SDK** | *Optional:* Can be used in React for listening to real-time updates (outside the scope of basic CRUD endpoints). |

---

## 🏗 Conceptual Project Structure

This structure outlines the key directories and files for the full-stack application.

* **`/note-book-app`**
    * **`/client`** (⚛️ React Application - Frontend)
    * **`/server`** (⚙️ Node.js/Express API Server - Backend)
        * `index.js` (Main server initialization and configuration)
        * **`/routes`**
            * `notes.js` (CRUD route definitions for `/api/notes`)
        * `serviceAccountKey.json` (Firebase Admin SDK configuration)
    * `.gitignore` (Specifies intentionally untracked files to ignore)
    * `package.json` (Project dependencies and scripts)


---

## ⚛️ Frontend Requirements (React Client)

The React application handles the user experience and communicates with the Node.js API server using standard HTTP requests.

### 1. Components

| Component | Purpose | Key Action |
| :--- | :--- | :--- |
| **`NoteForm.js`** | Handles note creation. | Submits data via **HTTP `POST`** to `/api/notes`. |
| **`NoteList.js`** | Container for fetching and rendering all notes. | Fetches notes via **HTTP `GET`** from `/api/notes`. |
| **`NoteCard.js`** | Displays a single note. | Triggers **HTTP `DELETE`** and **HTTP `PUT`** requests to `/api/notes/:id`. |

### 2. Data Flow

* Utilize the **`useEffect`** hook within a parent component (likely `NoteList.js`) to fetch initial data upon component mount.
* Use the **`useState`** hook to manage the central list of notes, allowing the UI to re-render automatically upon successful API calls (Create, Update, Delete).

---

## ⚙️ Backend Requirements (Node.js/Express API)

The Express server serves as the secure interface between the client and the Firestore database.

### 1. Setup and Initialization

* **Security Focus:** Initialize and use the **Firebase Admin SDK** to ensure all database operations are handled securely on the server side.
* **Credentials:** The `serviceAccountKey.json` must be loaded at server startup to initialize the Admin SDK. **This file must be kept secret and added to `.gitignore`.**
* **CORS Configuration:** Configure the necessary **CORS middleware** in the Express server to permit requests originating from the React application's development/production URL.

### 2. API Endpoints (CRUD Operations)

The server must expose the following RESTful API endpoints:

| Method | Endpoint | Description | Firestore Method Used |
| :--- | :--- | :--- | :--- |
| **`GET`** | `/api/notes` | Retrieves all notes. | `db.collection('notes').get()` |
| **`POST`** | `/api/notes` | Creates a new note. | `db.collection('notes').add(data)` |
| **`PUT`** | `/api/notes/:id` | Updates an existing note by ID. | `db.collection('notes').doc(id).update(data)` |
| **`DELETE`** | `/api/notes/:id` | Deletes a note by ID. | `db.collection('notes').doc(id).delete()` |

---

## ☁️ Database (Firebase Firestore)

### 1. Data Structure

* **Collection:** `notes` (Single top-level collection).
* **Document Fields:**
    * `title` (String)
    * `content` (String)
    * `createdAt` (Timestamp) - *Automatically generated or server-set*

### 2. Key Concepts to Master

* **Authentication Distinction:** Understand and maintain the difference between using the **Client SDK** (public-facing, requires security rules) and the **Admin SDK** (server-facing, privileged access).
* **CORS:** Properly configure the server to prevent cross-origin request errors from the frontend.
