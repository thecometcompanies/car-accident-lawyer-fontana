# Fontana Car Accident Lawyer Website

One-page attorney website with multi-step personal injury intake form, optimized for Google PageSpeed A+ scores and lead conversion.

## 🎯 Features

- **Multi-Step Form**: 2-step intake process with immediate webhook notifications
- **Performance Optimized**: Built for Google PageSpeed Insights A+ scores
- **Mobile-First Design**: Responsive across all devices
- **Case Qualification**: Automatic case scoring and priority assignment
- **Webhook Integration**: Real-time lead capture and CRM integration

## 🚀 Quick Deployment (A-Z)

### Prerequisites
1. [Vercel Account](https://vercel.com) 
2. [GitHub Account](https://github.com)
3. Get your tokens:
   - Vercel Token: `vercel.com/account/tokens`
   - GitHub Token: `github.com/settings/tokens`

### One-Command Deployment

```bash
# 1. Copy environment template
cp .env.example .env

# 2. Edit .env with your tokens:
# VERCEL_TOKEN=your_token_here
# GITHUB_TOKEN=your_token_here  
# GITHUB_USERNAME=your_username
# GITHUB_REPO_NAME=fontana-car-accident-lawyer

# 3. Run deployment script
./deploy.sh
```

That's it! Your site will be:
- ✅ Committed to Git
- ✅ Pushed to GitHub  
- ✅ Deployed to Vercel
- ✅ Live with working webhooks

## 🧪 Local Development

```bash
# Test locally
npm run dev
# Opens at http://localhost:3000
```

## 📋 Form Structure

### Step 1: Contact Capture
- Email address (required, validated)
- Phone number (required, formatted)
- Preferred contact method (email/phone/text)
- **Triggers immediate webhook** for lead notifications

### Step 2: Case Intake  
- Personal information (name, incident date)
- Accident details (type, injury description)
- Medical treatment received
- Insurance and legal information
- **Triggers complete case webhook** with scoring

## 🔗 Webhook Endpoints

- `POST /api/webhooks/step1` - Immediate lead capture
- `POST /api/webhooks/step2` - Complete case intake

Both endpoints include:
- Case scoring and priority assignment
- Metadata tracking (IP, session, referrer)
- Ready for CRM integration

## 📊 Performance Features

- **Critical CSS inlined** for fastest first paint
- **Lazy loading** for below-fold content  
- **Core Web Vitals optimized**
- **Mobile-first responsive design**
- **Accessibility compliant** (WCAG 2.1 AA)

## 🎨 Customization

Edit these files to customize:
- `index.html` - Content and structure
- `assets/css/styles.css` - Styling
- `assets/js/form.js` - Form behavior
- `api/webhooks/` - Integration logic

## 📈 Built for Results

- **Lead Capture**: Step 1 triggers immediate notifications
- **Case Qualification**: Automatic scoring and priority assignment  
- **Performance**: Optimized for search engines and conversions
- **Mobile-First**: 70%+ of traffic comes from mobile devices

---

🤖 **Generated with [Claude Code](https://claude.ai/code)**

Co-Authored-By: Claude <noreply@anthropic.com>