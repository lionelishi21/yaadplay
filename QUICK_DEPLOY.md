# Quick Deployment Guide 🚀

## Fastest Way: Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Add these environment variables:
   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://nyc.cloud.appwrite.io/v1
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=692a4a6f0011eb101475
   ```
5. Click **"Deploy"** ✨

### Step 3: Configure Appwrite CORS
After deployment, you'll get a URL like `https://yaadplay-xyz.vercel.app`

1. Go to [Appwrite Console](https://cloud.appwrite.io)
2. Your Project → **Settings** → **Platforms**
3. **Add Platform** → **Web App**
4. Add hostname: `yaadplay-xyz.vercel.app` (without https://)
5. Save

**Done!** Your site is live! 🎉

---

## Using Vercel CLI (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

---

## Environment Variables Needed

Add these in your hosting platform's environment variables section:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_APPWRITE_ENDPOINT` | `https://nyc.cloud.appwrite.io/v1` |
| `NEXT_PUBLIC_APPWRITE_PROJECT_ID` | `692a4a6f0011eb101475` |
| `NEXT_PUBLIC_APPWRITE_DATABASE_ID` | `[Your Database ID]` (optional) |
| `NEXT_PUBLIC_APPWRITE_COLLECTION_ID` | `products` (optional) |

**Note**: The app works without database/collection IDs (uses fallback data)

---

## Test Before Deploying

```bash
# Build locally to check for errors
npm run build

# Test production build
npm start
```

Visit `http://localhost:3000` to verify everything works!

---

## Common Issues

**Build fails?**
- Make sure all dependencies are in `package.json`
- Run `npm install` first

**CORS errors after deployment?**
- Add your domain to Appwrite Platforms
- Wait 2-3 minutes after adding

**Products not showing?**
- Check environment variables are set
- Verify Appwrite CORS includes your domain
- Check browser console for errors

---

## Next Steps After Deployment

1. ✅ Test your live site
2. ✅ Set up custom domain (optional)
3. ✅ Add products to Appwrite database
4. ✅ Configure database/collection IDs
5. ✅ Monitor logs for any issues

Need more details? Check `DEPLOYMENT.md` for comprehensive guide!

