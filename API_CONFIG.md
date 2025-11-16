# API Configuration Guide

## 🔧 How to Configure the Backend URL

The frontend is now configured to use a **dynamic API URL** that can be changed for different environments.

---

## 📝 Configuration Methods

### Method 1: Environment Variables (Recommended)

Create these files in the `frontend` folder:

**`.env.development`** (for local development):
```
VUE_APP_API_URL=http://localhost:3000
```

**`.env.production`** (for deployed version):
```
VUE_APP_API_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url.onrender.com` with your actual backend URL after deployment.

### Method 2: Direct Code Edit

If you can't use .env files, edit `App.vue` directly:

**File:** `frontend/src/App.vue` (line 202)

Change:
```javascript
API_URL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
```

To (for production):
```javascript
API_URL: 'https://your-backend-url.onrender.com',
```

---

## 🚀 Usage

### Local Development
```bash
cd frontend
npm run serve
```
Uses: `http://localhost:3000` (or VUE_APP_API_URL from .env.development)

### Production Build
```bash
cd frontend
npm run build
```
Uses: VUE_APP_API_URL from .env.production

---

## ✅ Testing the Configuration

### 1. Check Current API URL
Open browser console (F12) and type:
```javascript
console.log(window.location.origin)
```

### 2. Verify API Calls
Look at Network tab in browser dev tools. All API calls should go to your configured URL.

### 3. Test Backend Connection
Open: `http://localhost:8080` (frontend)
If you see books loading, the connection is working!

---

## 🌐 For GitHub Pages Deployment

When deploying to GitHub Pages, you need to:

1. **Deploy backend first** (to AWS/Render)
2. **Get backend URL** (e.g., `https://bookstore-api.onrender.com`)
3. **Update frontend config**:
   - Either create `.env.production` with the backend URL
   - Or edit `App.vue` line 202 directly
4. **Build and deploy**: `npm run build`

---

## 📋 URLs You'll Need

After deployment:
- **Frontend URL**: `https://yourusername.github.io/bookstore-frontend`
- **Backend URL**: `https://your-backend.onrender.com`

Update the backend URL in your frontend config before building!

---

## 🐛 Troubleshooting

**Books not loading after deployment?**
- Check browser console for CORS errors
- Verify backend URL is correct
- Make sure backend is running and accessible
- Check backend has CORS enabled (already done in server.js)

**Still seeing localhost in production?**
- Clear browser cache
- Rebuild: `npm run build`
- Verify .env.production file exists and has correct URL

---

## 🎯 Current Status

✅ **Frontend updated** - All fetch calls now use configurable API_URL
✅ **Fallback configured** - Defaults to localhost for development
✅ **Environment-ready** - Can use .env files or direct config

**Next Step:** Deploy backend to AWS/Render, then update the production URL!


