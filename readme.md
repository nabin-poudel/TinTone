# TinTone

A Spotify-inspired, backend-only music streaming API built with Node.js, Express.js, and MongoDB.

TinTone is a mini project created to practice backend development, API design, authentication, database management, and file handling.

**Note:** TinTone does not include a frontend. All APIs were tested using Postman.

## Features

- User registration and authentication
- Artist authentication and authorization
- JWT-based authentication
- Password hashing using bcrypt
- Music upload using ImageKit
- Album creation and management
- Music retrieval and deletion
- MongoDB relationships using Mongoose `populate()`
- File upload handling using Multer
- Cookie-based authentication handling

## Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | MongoDB object modeling |
| JSON Web Token | Authentication |
| bcrypt | Password hashing |
| Multer | File upload handling |
| ImageKit | Music file storage |
| Postman | API testing |

### Other Dependencies

- `@imagekit/nodejs`
- `cookie-parser`
- `debug`
- `dotenv`
- `ejs`
- `nodemon`
- `path`

## Project Structure

```text
TinTone/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   └── musicController.js
├── middlewares/
│   └── authMiddleware.js
├── models/
│   ├── albumModel.js
│   ├── musicModel.js
│   ├── songModel.js
│   └── userModel.js
├── routes/
│   ├── authRoute.js
│   └── musicRoute.js
├── services/
│   └── storageService.js
├── src/
│   └── app.js
├── server.js
├── package.json
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB database
- ImageKit account
- Postman (for API testing)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nabin-poudel/TinTone.git
```

2. Navigate to the project directory:

```bash
cd TinTone
```

3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root directory and configure the required environment variables.

### Environment Variables

```env
# Server
PORT=

# Database
MONGO_DB_URI=

# Authentication
JWT_SECRET=

# ImageKit
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_FOLDER_NAME=
```

Add your own credentials to the environment variables. Never commit your `.env` file or expose secret keys publicly.

### Run the Project

Start the development server:

```bash
npm run dev
```

## API Documentation

All endpoints below are relative to your server's base URL.

### Authentication Routes

| Method | Endpoint | Access |
|---|---|---|
| POST | `/registerUser` | No route middleware |
| POST | `/loginUser` | No route middleware |
| GET | `/logout` | No route middleware |

### Music Routes

| Method | Endpoint | Access |
|---|---|---|
| POST | `/uploadMusic` | Artist |
| POST | `/createAlbum` | Artist |
| GET | `/getMusics` | Authenticated user |
| GET | `/getAlbum` | Authenticated user |
| GET | `/getAlbum/:albumId` | Authenticated user |
| GET | `/getMusic/:musicId` | Authenticated user |
| DELETE | `/deleteMusic/:musicId` | Artist |

**Additional details:**

- `/uploadMusic` accepts a music file through the `music` field using `multipart/form-data`.
- Artist-only routes use artist authentication middleware.
- User-only routes use user authentication middleware.
- Music files are uploaded to ImageKit.

## Project Purpose

TinTone is a personal backend learning project.

The main goal was to gain practical experience with:

- Building REST APIs using Express.js
- Implementing authentication and authorization
- Working with MongoDB and Mongoose
- Managing database relationships
- Handling file uploads and external storage
- Organizing backend code using routes, controllers, models, and services
- Testing APIs using Postman

## Repository

GitHub: https://github.com/nabin-poudel/TinTone

---

**TinTone** — A backend learning project by Nabin Poudel.