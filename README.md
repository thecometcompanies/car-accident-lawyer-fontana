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

## 🎨 CSS & Design System

### **Vanilla CSS/HTML Approach**
This project uses **vanilla CSS and HTML** for maximum performance and control:
- **No CSS frameworks** (no Bootstrap, Tailwind, MUI)
- **Critical CSS inlined** for fastest first paint
- **Custom responsive grid** built for performance
- **Mobile-first design** with progressive enhancement

### **Reusable Component Library**
We maintain a library of tested, performance-optimized components:

#### **Form Components**
```html
<!-- Multi-step form with progress indicator -->
<div class="step-indicator">
  <div class="step-indicator__item active">Step 1</div>
  <div class="step-indicator__item">Step 2</div>
</div>

<!-- Form validation styling -->
.form-field.error { border-color: #f44336; }
.form-field.valid { border-color: #4caf50; }
```

#### **Button Library**
```css
/* Primary CTA Button */
.btn--primary {
  background: linear-gradient(135deg, #00c853, #00e676);
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Secondary Button */
.btn--secondary {
  background: transparent;
  border: 2px solid #00c853;
  color: #00c853;
}

/* Mobile-optimized touch targets */
@media (max-width: 768px) {
  .btn { min-height: 48px; padding: 0.8rem 1.5rem; }
}
```

#### **Layout Components**
```css
/* Container with performance-optimized breakpoints */
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

/* Responsive grid without CSS Grid overhead */
.trust-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

/* FAQ accordion with smooth animations */
.faq-item { background: #2a2a2a; border-radius: 8px; overflow: hidden; }
.faq-question { width: 100%; padding: 1.5rem; cursor: pointer; }
```

### **Component Usage Guidelines**
1. **Copy-paste ready**: All components tested for A+ PageSpeed scores
2. **Mobile-first**: Responsive breakpoints optimized for legal traffic
3. **Accessibility**: WCAG 2.1 AA compliant out of the box
4. **Performance**: Critical CSS inlined, non-critical loaded async

### **Customization Files**
- `index.html` - Content and structure
- `assets/css/styles.css` - Component styles and customizations
- `assets/js/form.js` - Interactive behavior
- `api/webhooks/` - Integration logic

### **Why Vanilla CSS?**
- **Performance**: 90+ PageSpeed scores requirement
- **Load Speed**: <1.5 second initial load target
- **Control**: No framework constraints for legal compliance
- **Maintainability**: Simple, readable code for any developer

## 📈 Built for Results

- **Lead Capture**: Step 1 triggers immediate notifications
- **Case Qualification**: Automatic scoring and priority assignment  
- **Performance**: Optimized for search engines and conversions
- **Mobile-First**: 70%+ of traffic comes from mobile devices

---

🤖 **Generated with [Claude Code](https://claude.ai/code)**

Co-Authored-By: Claude <noreply@anthropic.com>