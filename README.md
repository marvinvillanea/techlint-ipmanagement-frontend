# React JS Project Setup Guide

## 📌 Project Overview

This project is a React JS application built using **Vite**. This guide explains how to install dependencies, configure environment variables, and run the application locally.

---

## ⚙️ Prerequisites

Make sure you have the following installed:

* Node.js (Recommended: v18 or higher)
* npm or yarn package manager
* Git (optional)

Check installation:

```bash
node -v
npm -v
```

---

## 📥 Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

## 📦 Install Dependencies

Install all required packages:

```bash
npm install
```

or if using yarn:

```bash
yarn install
```

---

## 🔑 Environment Setup

Create a `.env` file in the root directory and add the following configuration:

```env
VITE_APP_NAME="IP - Management"
VITE_API_URL="http://127.0.0.1:8000/api/v1/"
VITE_CLIENT_NAME=000IP-TECHLINT000
VITE_CLIENT_TOKEN="St0uVEktCxF8kr3nRkeHCqFotKBLoqqGhMhRGvwiIA0DJcJeEj2VnauzjvzI"
VITE_DEFAULT_MODULE=dashboard
```

⚠️ Important:

* Ensure the backend API is running before starting the frontend.
* Do not commit `.env` to version control if it contains sensitive tokens.

---

## ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

or:

```bash
yarn dev
```

After running, open your browser:

```
http://localhost:5173
```

---

## 🏗 Build for Production

To create a production build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

---

## 🚨 Troubleshooting

### Node Modules Issues

If errors occur:

```bash
rm -rf node_modules package-lock.json
npm install
```

### API Not Working

* Confirm backend server is running.
* Check `.env` API URL.

---

## 📄 Notes

* Restart the dev server after changing `.env`.
* Make sure API CORS settings allow frontend access.

---

## 👨‍💻 Author

Techlint Development Team
