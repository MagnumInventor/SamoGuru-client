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
  // Correct paths for Next.js build
  const nextBuildPath = path.join(__dirname, '../.next');
  const nextStaticPath = path.join(__dirname, '../.next/static');
  const publicPath = path.join(__dirname, '../public');
  
  console.log('Checking build paths:');
  console.log('Next build path:', nextBuildPath);
  console.log('Static path:', nextStaticPath);
  
  try {
    const fs = await import('fs');
    
    // Serve Next.js static assets
    if (fs.existsSync(nextStaticPath)) {
      app.use('/_next/static', express.static(nextStaticPath));
      console.log('✅ Serving Next.js static files');
    }
    
    if (fs.existsSync(publicPath)) {
      app.use(express.static(publicPath));
      console.log('✅ Serving public files');
    }
    
    // Check if Next.js server build exists
    const serverBuildPath = path.join(__dirname, '../.next/server');
    if (fs.existsSync(serverBuildPath)) {
      console.log('✅ Next.js server build found');
      
      // For all non-API routes, try to serve Next.js pages
      app.get('*', async (req, res) => {
        if (req.path.startsWith('/api/')) {
          return res.status(404).json({ error: 'API endpoint not found' });
        }
        
        try {
          // Import and start Next.js server
          const next = (await import('next')).default;
          const nextApp = next({ 
            dev: false,
            dir: path.join(__dirname, '../'),
            conf: {
              distDir: '.next'
            }
          });
          
          const handle = nextApp.getRequestHandler();
          await nextApp.prepare();
          
          console.log(`📄 Serving Next.js page: ${req.path}`);
          return handle(req, res);
          
        } catch (nextError) {
          console.error('❌ Next.js server error:', nextError);
          // Fallback - redirect to a specific route
          return res.redirect('/signup');
        }
      });
    } else {
      console.log('❌ Next.js server build not found, using fallback');
    }
    
  } catch (error) {
    console.error('❌ Production setup error:', error);
  }
}

app.listen(PORT, '0.0.0.0', () => {
  console.log("Server starting on port:", PORT);
  connectDB();
  console.log("Server is running on port:", PORT);
});