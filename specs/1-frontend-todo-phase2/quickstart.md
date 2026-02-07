# Quickstart: Frontend Todo App

This guide explains how to set up and run the new frontend application locally.

## Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

## 1. Installation

Navigate to the new `frontend` directory and install the dependencies.

```bash
cd frontend
npm install
```

## 2. Environment Variables

Create a `.env.local` file in the `frontend` directory. This file will store your local environment variables.

```bash
# Example .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
```

-   `NEXT_PUBLIC_API_BASE_URL`: The base URL for the backend API.

## 3. Running the Development Server

Once the dependencies are installed and the environment variables are set, you can start the development server.

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 4. Building for Production

To create a production-ready build, run:

```bash
npm run build
```
