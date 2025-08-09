//backend/index.js
import cookieParser from 'cookie-parser';
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./db.js";
import authRoutes from "./routes/auth.route.js";


dotenv.config();

// Check required environment variables
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

// Debug environment variables
console.log('Environment check:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CLIENT_URL:', process.env.CLIENT_URL);
console.log('PORT:', process.env.PORT);

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://www.samoguru.run.place', 'https://samoguru.run.place']
    : 'http://localhost:3000',
  credentials: true, // для cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'SamoGuru API Server is running' });
});


// Register routes
app.use("/api/auth", authRoutes);

// Handle API 404s
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

if (process.env.NODE_ENV === 'production') {
  // Check if Next.js build exists
  const nextBuildPath = path.join(__dirname, '../.next/server/app');
  const nextStaticPath = path.join(__dirname, '../.next/static');
  const indexPath = path.join(nextBuildPath, 'index.html');
  
  // Check if the build files exist
  try {
    const fs = await import('fs');
    if (fs.existsSync(nextBuildPath) && fs.existsSync(indexPath)) {
      // Serve static files from Next.js build
      app.use(express.static(nextStaticPath));
      app.use(express.static(nextBuildPath));
      
      // For all other requests, serve the Next.js app
      app.get('*', (req, res) => {
        res.sendFile(indexPath);
      });
    } else {
      // Fallback: serve a simple message if Next.js build is not available
      app.get('*', (req, res) => {
        if (!req.path.startsWith('/api/')) {
          res.send(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>SamoGuru - API Server</title>
              <style>
                body { font-family: Arial, sans-serif; margin: 40px; }
                .container { max-width: 600px; margin: 0 auto; }
                .api-info { background: #f5f5f5; padding: 20px; border-radius: 8px; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>🚀 SamoGuru API Server</h1>
                <p>The API server is running successfully!</p>
                <div class="api-info">
                  <h3>Available API Endpoints:</h3>
                  <ul>
                    <li><strong>POST</strong> /api/auth/signup - User registration</li>
                    <li><strong>POST</strong> /api/auth/login - User login</li>
                    <li><strong>POST</strong> /api/auth/logout - User logout</li>
                    <li><strong>POST</strong> /api/auth/verify-email - Email verification</li>
                    <li><strong>POST</strong> /api/auth/forgot-password - Password reset request</li>
                    <li><strong>POST</strong> /api/auth/reset-password/:token - Password reset</li>
                    <li><strong>GET</strong> /api/auth/check-auth - Check authentication</li>
                  </ul>
                </div>
                <p><em>Frontend application is being built or is not available.</em></p>
              </div>
            </body>
            </html>
          `);
        }
      });
    }
  } catch (error) {
    console.error('Error checking Next.js build:', error);
    // Fallback response
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api/')) {
        res.send('SamoGuru API Server is running. Frontend is being built.');
      }
    });
  }
}

app.listen(PORT, () => {
  console.log("Server starting on port:", PORT);
  connectDB();
  console.log("Server is running on port:", PORT);
});