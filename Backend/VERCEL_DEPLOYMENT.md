# Vercel Deployment Guide

## Prerequisites

- Vercel account (https://vercel.com)
- GitHub repository with this code
- MongoDB Atlas account for database
- Cloudinary account for image uploads

## Deployment Steps

### 1. Prepare Your Repository

- Ensure `.env` file is NOT committed (it's in `.gitignore`)
- The `.env.example` file documents all required environment variables
- `vercel.json` is configured to use `src/server.js` as the entry point

### 2. Connect to Vercel

- Go to https://vercel.com/dashboard
- Click "Add New" → "Project"
- Import your GitHub repository
- Select the root folder as the project root (or Backend folder as root if deploying only backend)

### 3. Set Environment Variables

In Vercel Project Settings → Environment Variables, add:

- `PORT` = 3000 (optional, defaults to 3000)
- `DB_URI` = Your MongoDB Atlas connection string
- `JWT_SECRET` = Your JWT secret key
- `CLOUDINARY_CLOUD_NAME` = Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` = Your Cloudinary API key
- `CLOUDINARY_API_SECRET` = Your Cloudinary API secret

### 4. Configure Build Settings (if needed)

- **Framework Preset**: Other
- **Build Command**: `npm install` (default, already in package.json)
- **Output Directory**: Not needed for Node.js

### 5. Deploy

Click "Deploy" and Vercel will:

- Install dependencies from `package.json`
- Start the server using `src/server.js`
- Route all requests to your API

### 6. Update Frontend API URL

After deployment, update your frontend's API base URL to the Vercel deployment URL (e.g., `https://your-backend.vercel.app/api`)

## File Structure

```
Backend/
├── src/
│   ├── server.js (Entry point)
│   ├── app.js (Express app configuration)
│   ├── package.json (Dependencies)
├── .env (NOT committed - LOCAL ONLY)
├── .env.example (Template for env variables)
├── .gitignore (Ensures .env is not committed)
└── vercel.json (Vercel configuration)
```

## Notes

- Make sure your `package.json` has `"type": "module"` for ES6 imports ✓
- The `start` script is configured to run `node src/server.js` ✓
- CORS is enabled in the Express app ✓
- All required packages are listed in dependencies ✓
