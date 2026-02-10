# React Frontend Docker Setup

This project shows how to build and run a React frontend using Docker.

## Prerequisites

- Docker installed on your machine
- Node.js & npm (only needed for local dev, not for Docker)

## Build Docker Image

```bash
docker build -t my-react-app .
```

## Build Docker Image
```
docker run -d -p 3000:80 --name react-app my-react-app
```
---

✅ **How it works:**  
1. Docker builds the React app (`npm run build`).  
2. Then it serves the optimized static files using Nginx.  
3. You can access it via `http://localhost:3000`.

---

If you want, I can also make a **version that supports hot-reloading** for development, so you don’t have to rebuild every time you make a change. This is super convenient for React dev.  

Do you want me to do that too?
