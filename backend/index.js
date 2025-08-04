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


// Add this before your production check
app.get('/debug-build', async (req, res) => {
  const fs = await import('fs');
  const nextPath = path.join(__dirname, '../.next');
  
  function listDir(dirPath) {
    try {
      if (!fs.existsSync(dirPath)) return 'Directory does not exist';
      return fs.readdirSync(dirPath, { withFileTypes: true }).map(dirent => ({
        name: dirent.name,
        isDirectory: dirent.isDirectory()
      }));
    } catch (error) {
      return `Error reading directory: ${error.message}`;
    }
  }
  
  res.json({
    cwd: process.cwd(),
    __dirname: __dirname,
    nextExists: fs.existsSync(nextPath),
    nextContents: listDir(nextPath),
    serverContents: listDir(path.join(nextPath, 'server')),
    pagesContents: listDir(path.join(nextPath, 'server/pages')),
    staticContents: listDir(path.join(nextPath, 'static'))
  });
});


if (process.env.NODE_ENV === 'production') {
  // Paths for Next.js static build
  const nextStaticPath = path.join(__dirname, '../.next/static');
  const nextServerPath = path.join(__dirname, '../.next/server/pages');
  const publicPath = path.join(__dirname, '../public');
  
  console.log('Checking build paths:');
  console.log('Next static path:', nextStaticPath);
  console.log('Next server path:', nextServerPath);
  
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
    
    // Check if Next.js server pages exist
    if (fs.existsSync(nextServerPath)) {
      console.log('✅ Next.js server pages found');
      
      // Define your route mappings
      const routeMap = {
        '/': '/signup/page',
        '/signup': '/signup/page',
        '/login': '/login/page',
        '/forgot-password': '/forgot-password/page',
        '/reset-password': '/reset-password',
        '/verify-email': '/verify-email/page',
        '/menu': '/menu/page',
        '/dashboard': '/DashboardPage',
        '/admin': '/admin/page'
      };
      
      // Handle specific routes
      Object.entries(routeMap).forEach(([route, htmlFile]) => {
        app.get(route, (req, res) => {
          const htmlPath = path.join(nextServerPath, `${htmlFile}.html`);
          if (fs.existsSync(htmlPath)) {
            console.log(`📄 Serving: ${route} -> ${htmlFile}`);
            res.sendFile(htmlPath);
          } else {
            console.log(`❌ File not found: ${htmlPath}`);
            res.status(404).send('Page not found');
          }
        });
      });
      
      // Catch-all for other routes
      app.get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
          return res.status(404).json({ error: 'API endpoint not found' });
        }
        
        // Try to find the corresponding HTML file
        let htmlPath = path.join(nextServerPath, `${req.path}/page.html`);
        
        if (!fs.existsSync(htmlPath)) {
          // Fallback to signup page
          htmlPath = path.join(nextServerPath, '/signup/page.html');
        }
        
        if (fs.existsSync(htmlPath)) {
          console.log(`📄 Serving catch-all: ${req.path} -> ${htmlPath}`);
          res.sendFile(htmlPath);
        } else {
          console.log(`❌ No page found for: ${req.path}`);
          res.status(404).send('Page not found');
        }
      });
      
    } else {
      console.log('❌ Next.js server pages not found');
      
      // Fallback routing
      app.get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
          return res.status(404).json({ error: 'API endpoint not found' });
        }
        
        // Your existing fallback HTML
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
      });
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