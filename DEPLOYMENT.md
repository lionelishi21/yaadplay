# Deployment Guide for YaadPlay

This guide covers deploying your Next.js application that uses Appwrite as the backend.

## Understanding the Architecture

- **Appwrite**: Backend service (database, authentication, storage) - Already hosted at `https://nyc.cloud.appwrite.io`
- **Your Next.js App**: Frontend application - Needs to be deployed to a hosting service

## Option 1: Deploy to Vercel (Recommended for Next.js)

Vercel is the creators of Next.js and offers the best integration.

### Step 1: Prepare Your Code

1. Make sure all your changes are committed:
```bash
git add .
git commit -m "Ready for deployment"
```

2. Push to GitHub/GitLab/Bitbucket (if not already):
```bash
git push origin main
```

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js settings
5. **Important**: Add your environment variables:
   - `NEXT_PUBLIC_APPWRITE_ENDPOINT` = `https://nyc.cloud.appwrite.io/v1`
   - `NEXT_PUBLIC_APPWRITE_PROJECT_ID` = `692a4a6f0011eb101475`
   - `NEXT_PUBLIC_APPWRITE_DATABASE_ID` = `[YOUR_DATABASE_ID]` (if you have one)
   - `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` = `products` (if you have one)

6. Click **"Deploy"**

### Step 3: Configure Appwrite CORS

After deployment, you'll get a URL like `https://yaadplay.vercel.app`

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Select your project (`yaadplay`)
3. Go to **Settings** → **Platforms**
4. Click **Add Platform** → **Web App**
5. Add your production domain:
   - Hostname: `yaadplay.vercel.app` (or your custom domain)
   - **Don't include** `https://` or trailing slashes
6. Click **Save**

### Step 4: Update Environment Variables (if needed)

If you need to update environment variables after deployment:
1. Go to your Vercel project dashboard
2. **Settings** → **Environment Variables**
3. Add/update variables
4. Redeploy (or wait for automatic redeploy)

## Option 2: Deploy to Netlify

### Step 1: Build Configuration

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Step 2: Deploy

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables (same as Vercel)
6. Click **"Deploy site"**

### Step 3: Configure Appwrite CORS

Same as Vercel - add your Netlify domain to Appwrite platforms.

## Option 3: Deploy to Other Platforms

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy

### Render
1. Create new Web Service
2. Connect repository
3. Add environment variables
4. Deploy

### Self-Hosted (VPS)
1. Build: `npm run build`
2. Start: `npm start`
3. Use PM2 or similar for process management
4. Set up reverse proxy (Nginx)

## Pre-Deployment Checklist

- [ ] All environment variables are set
- [ ] `.env.local` is in `.gitignore` (should not be committed)
- [ ] Appwrite CORS configured for production domain
- [ ] Database and collections created in Appwrite
- [ ] Products added to Appwrite (or fallback data will be used)
- [ ] Test locally: `npm run build && npm start`

## Environment Variables for Production

Make sure these are set in your hosting platform:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT_ID=692a4a6f0011eb101475
NEXT_PUBLIC_APPWRITE_PROJECT_NAME=yaadplay
NEXT_PUBLIC_APPWRITE_DATABASE_ID=[YOUR_DATABASE_ID]
NEXT_PUBLIC_APPWRITE_COLLECTION_ID=products
```

**Important**: All `NEXT_PUBLIC_*` variables are exposed to the browser. Never put secrets in them!

## Post-Deployment

1. **Test your site**: Visit your deployed URL
2. **Check console**: Open browser DevTools → Console for errors
3. **Verify Appwrite connection**: Products should load from Appwrite (or fallback)
4. **Monitor**: Check Vercel/Netlify logs for any issues

## Troubleshooting

### Products not loading?
- Check environment variables are set correctly
- Verify Appwrite CORS includes your domain
- Check browser console for errors
- Verify database/collection IDs are correct

### Build fails?
- Check `package.json` has all dependencies
- Run `npm install` locally to verify
- Check build logs in hosting platform

### CORS errors?
- Make sure domain is added to Appwrite platforms
- Don't include `https://` or trailing `/` in hostname
- Wait a few minutes after adding domain

## Quick Deploy Commands

### Vercel CLI (Alternative)
```bash
npm i -g vercel
vercel login
vercel
```

### Netlify CLI (Alternative)
```bash
npm i -g netlify-cli
netlify login
netlify deploy --prod
```

## Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [Appwrite Documentation](https://appwrite.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

