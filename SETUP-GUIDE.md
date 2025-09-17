# 🚀 Blog Automation Setup Guide

## Quick Setup Checklist

### ✅ **Step 1: Google AI API Key**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API key" 
3. Copy the generated API key
4. Keep it handy for Vercel setup

### ✅ **Step 2: Redis Database (Upstash)**
1. Go to [Upstash Console](https://console.upstash.com/)
2. Sign up/login with GitHub
3. Click "Create Database"
4. Choose "Global" region
5. Copy both:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`

### ✅ **Step 3: Set Environment Variables in Vercel**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `car-accident-lawyer-fontana` project
3. Go to Settings → Environment Variables
4. Add these 4 variables:

```
CRON_SECRET=kpkyHkxHKLM0vOkdehKLBKFz+Uml1PlKAmIVfrOyFaY=
GEMINI_API_KEY=[paste-your-google-ai-key-here]
UPSTASH_REDIS_REST_URL=[paste-your-upstash-url-here]
UPSTASH_REDIS_REST_TOKEN=[paste-your-upstash-token-here]
```

5. Click "Save" for each variable
6. Redeploy the project (Vercel may auto-redeploy)

## 🧪 **Testing Endpoints**

### Test 1: Environment Check
```
https://www.accidentlawyerfontana.com/api/env-check
```
Should show all environment variables as "SET"

### Test 2: Simple Blog Generation
```
https://www.accidentlawyerfontana.com/api/test-simple-blog
```
Tests Google AI integration without Redis

### Test 3: Full Blog Generation
```
https://www.accidentlawyerfontana.com/api/test-blog-generation
```
Tests complete system with Redis storage

### Test 4: Manual Cron Trigger
```
POST https://www.accidentlawyerfontana.com/api/cron/daily-blog
Headers: Authorization: Bearer kpkyHkxHKLM0vOkdehKLBKFz+Uml1PlKAmIVfrOyFaY=
```

## 📅 **Cron Schedule**
- **Runs daily at**: 5:00 AM UTC (9:00 PM PST)
- **Next run**: Today at 9:00 PM PST
- **Posts appear at**: `https://www.accidentlawyerfontana.com/blog/[slug]`

## ✅ **Success Indicators**

When everything is working:
1. ✅ Environment check shows all variables "SET"
2. ✅ Blog generation creates posts with internal linking
3. ✅ Posts are stored in Redis and accessible via API
4. ✅ Sitemap automatically includes new blog posts
5. ✅ Daily cron job runs without errors

## 🔧 **Troubleshooting**

### If Google AI fails:
- Verify API key is correct
- Check billing is enabled in Google Cloud
- Ensure API quotas are not exceeded

### If Redis fails:
- Verify Upstash URLs are correct
- Check Upstash database is active
- Test Redis connection in Upstash console

### If Cron fails:
- Verify CRON_SECRET matches exactly
- Check Vercel cron logs in dashboard
- Ensure environment variables are set for Production

## 🎯 **What Happens After Setup**

1. **Daily blog posts** generated automatically
2. **Internal linking** between related posts
3. **SEO optimization** for Fontana car accident keywords
4. **Automatic sitemap updates** for Google indexing
5. **Redis storage** for scalability and speed

## 📊 **Monitoring**

Check these URLs to monitor the system:
- Blog API: `/api/blog` (list all posts)
- Blog Status: `/api/blog-status` (system health)
- Sitemap: `/sitemap.xml` (Google Search Console)
- Individual Posts: `/blog/[slug]` (SEO-optimized pages)

---

**🚨 Need Help?** All endpoints are live and ready for testing once environment variables are configured!