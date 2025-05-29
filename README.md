# Blog Application
# Live Link -  https://blogwebrevol.netlify.app/blogs/
A full-stack blog application with React for the frontend and Node.js/Express/MongoDB for the backend.

## Features

- Rich text editor for writing blogs
- Auto-save drafts (every 5 seconds of inactivity)
- Visual indication when content is saved
- Separate views for drafts and published articles
- Tag system for blog categorization
- Responsive design for all devices

## Tech Stack

### Frontend
- React
- React Router
- React Quill (rich text editor)
- Axios for API calls
- TailwindCSS for styling
- Lodash debounce for auto-save

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- CORS for cross-origin requests

## Getting Started

### Prerequisites
- Node.js
- MongoDB (local installation or MongoDB Atlas)

### Installation

1. Clone the repository
```
git clone <repository-url>
cd blog-application
```

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog_app
```

4. Start the development server
```
npm run dev:all
```
This will start both the frontend (Vite) and backend servers concurrently.

## API Endpoints

- `POST /api/blogs/save-draft` - Save or update a draft
- `POST /api/blogs/publish` - Save and publish an article
- `GET /api/blogs` - Retrieve all blogs
- `GET /api/blogs/:id` - Retrieve a blog by ID

## Project Structure

```
blog-application/
├── public/            # Static files
├── src/               # Frontend source code
│   ├── components/    # React components
│   ├── context/       # React context for state management
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Entry point
├── server/            # Backend source code
│   ├── controllers/   # Route controllers
│   ├── models/        # Mongoose models
│   ├── routes/        # Express routes
│   └── index.js       # Server entry point
└── package.json       # Project dependencies and scripts
```
