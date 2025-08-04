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
  credentials: true
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
  // Serve Next.js static files
  const nextStaticPath = path.join(__dirname, '../.next/static');
  const publicPath = path.join(__dirname, '../public');
  
  // Serve static files
  app.use('/_next/static', express.static(nextStaticPath));
  app.use('/static', express.static(publicPath));
  
  // For all non-API routes, serve the Next.js app
  app.get('*', async (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API endpoint not found' });
    }
    
    try {
      // Try to serve the Next.js built page
      const { createServer } = await import('http');
      const { parse } = await import('url');
      const next = (await import('next')).default;
      
      const nextApp = next({ 
        dev: false, 
        dir: path.join(__dirname, '../') 
      });
      const handle = nextApp.getRequestHandler();
      
      await nextApp.prepare();
      handle(req, res, parse(req.url, true));
    } catch (error) {
      console.error('Next.js serving error:', error);
      // Fallback to your existing HTML response
      res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>SamoGuru - Loading...</title>
          <meta http-equiv="refresh" content="5">
        </head>
        <body>
          <h1>🚀 SamoGuru is starting up...</h1>
          <p>Please wait while the application loads.</p>
        </body>
        </html>
      `);
    }
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log("Server starting on port:", PORT);
  connectDB();
  console.log("Server is running on port:", PORT);
});