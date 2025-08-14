# Render Deployment Guide for SamoGuru

## Overview

This guide provides the optimal setup for deploying your Next.js + Express.js monorepo on Render hosting.

## Prerequisites

- Render account
- MongoDB database (Atlas recommended)
- Email service (Resend or Mailtrap)

## Environment Variables Required

Set these in your Render dashboard:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/samoguru?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
BREVO_API_KEY=your-brevo-api-key
MAILTRAP_TOKEN=your-mailtrap-token
```

## Render Configuration

### Build Command

```bash
npm install && npm run build
```

### Start Command

```bash
npm start
```

### Environment

- **Runtime**: Node.js
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Health Check Path**: `/`

## Deployment Steps

1. **Connect Repository**

   - Connect your GitHub repository to Render
   - Select the main branch

2. **Configure Environment**

   - Set all required environment variables
   - Ensure `NODE_ENV=production`

3. **Deploy**
   - Render will automatically build and deploy
   - Monitor the build logs for any issues

## Architecture

This deployment uses a **single service approach**:

- Next.js frontend builds to `.next` directory
- Express.js backend serves both API and frontend
- All traffic goes through the Express server
- CORS configured for production domains

## Benefits of This Setup

✅ **Cost-effective**: Single service instead of two
✅ **Simplified**: One deployment, one URL
✅ **Optimized**: Server-side rendering enabled
✅ **Secure**: Proper CORS configuration
✅ **Scalable**: Easy to scale on Render

## Troubleshooting

### Build Issues

- Ensure all dependencies are in root `package.json`
- Check that TypeScript compilation passes
- Verify environment variables are set

### Runtime Issues

- Check MongoDB connection
- Verify JWT secret is set
- Monitor application logs in Render dashboard

### Performance

- Enable Render's auto-scaling if needed
- Monitor memory usage
- Consider upgrading instance type if needed

## Custom Domain Setup

1. Add custom domain in Render dashboard
2. Configure DNS records
3. Update CORS origins in `backend/index.js`
4. Update `NEXT_PUBLIC_API_URL` if needed

## Monitoring

- Use Render's built-in logging
- Set up health checks
- Monitor MongoDB connection
- Track API response times
