# CLAUDE.md - Fontana Car Accident Lawyer Website

This file provides guidance to Claude Code when building the Fontana Car Accident Lawyer one-page website with multi-step form integration and optimal performance standards.

## Project Overview

**Site Type**: One-page attorney website with multi-step personal injury intake form  
**Primary Goal**: Generate qualified leads through professional presentation and streamlined intake process  
**Performance Target**: Google PageSpeed Insights A+ scores across all metrics (Mobile & Desktop)  
**Core Technology**: JSON content management, multi-step forms, webhook integrations

## Critical Requirements

### 🎯 Performance Standards
- **Google PageSpeed Insights**: A+ scores required on ALL metrics
- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Mobile Experience**: Primary focus - mobile traffic optimization
- **Desktop Experience**: Secondary but equally important for conversions
- **Loading Speed**: Initial page load under 1.5 seconds

### 📝 Multi-Step Form Requirements

#### Step 1: Lead Capture
**Purpose**: Capture contact information and trigger immediate webhook for lead notifications
**Fields Required**:
- Email address (required, validated)
- Phone number (required, formatted validation)
- Preferred contact method (radio: Email/Phone/Text)

**Webhook Integration**:
- Triggers immediately after Step 1 completion
- Sends lead data to CRM/notification system
- Enables immediate follow-up by legal team
- Must include: timestamp, IP address, referrer data, session ID

#### Step 2: Personal Injury Intake
**Purpose**: Comprehensive case assessment and qualification
**Required Fields**:
- Full Name (first, last)
- Date of Incident (date picker, required)
- Type of Accident (select dropdown):
  - Motor Vehicle Accident
  - Motorcycle Accident
  - Pedestrian Accident
  - Bicycle Accident
  - Slip and Fall
  - Other (specify)
- Injury Description (textarea, required, min 50 characters)
- Medical Treatment Received (checkbox options):
  - Emergency Room
  - Hospitalization
  - Physical Therapy
  - Ongoing Treatment
  - No Treatment Yet
- Insurance Information (select):
  - Yes, I have insurance
  - No insurance
  - Unsure
- Police Report Filed (radio: Yes/No/Unknown)
- Fault Assignment (radio):
  - Other party at fault
  - Mutual fault
  - Unsure
  - I may be at fault
- Additional Details (textarea, optional, max 1000 characters)

### 🔗 Webhook Architecture

#### Step 1 Webhook (Immediate Lead Alert)
```javascript
{
  "step": 1,
  "timestamp": "ISO 8601",
  "leadData": {
    "email": "user@example.com",
    "phone": "+1-555-123-4567",
    "preferredContact": "phone"
  },
  "metadata": {
    "sessionId": "unique_session_id",
    "ipAddress": "user_ip",
    "userAgent": "browser_info",
    "referrer": "traffic_source",
    "url": "current_page_url"
  }
}
```

#### Step 2 Webhook (Complete Intake)
```javascript
{
  "step": 2,
  "timestamp": "ISO 8601", 
  "completeLead": {
    // All Step 1 data +
    "fullName": "John Doe",
    "incidentDate": "2024-01-15",
    "accidentType": "Motor Vehicle Accident",
    "injuryDescription": "text",
    "medicalTreatment": ["Emergency Room", "Physical Therapy"],
    "hasInsurance": "yes",
    "policeReport": "yes",
    "faultAssignment": "other",
    "additionalDetails": "text"
  },
  "caseScore": "calculated_qualification_score",
  "priority": "high/medium/low"
}
```

### 🚀 Deployment Standards

#### Vercel Deployment (Primary)
- Automatic GitHub integration
- Vercel Functions for webhook handling
- Edge caching for optimal performance
- Environment variables for webhook URLs
- Branch previews for testing

#### Performance Configuration
```javascript
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/intake-step1",
      "destination": "/api/webhooks/step1.js"
    },
    {
      "source": "/api/intake-step2", 
      "destination": "/api/webhooks/step2.js"
    }
  ]
}
```

## Content Strategy

### Hero Section Content
- **Headline**: "Injured in an Accident? Get the Compensation You Deserve"
- **Subheadline**: "Free consultation with experienced Fontana car accident lawyers. No fees unless we win your case."
- **Primary CTA**: "Start Free Case Evaluation" (links to form)
- **Secondary CTA**: "Call (909) XXX-XXXX" (phone link)
- **Hero Image**: Professional attorney image or courthouse/justice imagery

### Core Messaging Points
1. **No Win, No Fee** - Contingency fee structure
2. **Free Consultation** - No upfront costs
3. **Local Expertise** - Fontana and San Bernardino County focus
4. **Proven Results** - Track record of successful cases
5. **Immediate Action** - Importance of quick legal representation

### Trust Signals
- Attorney credentials and certifications
- Client testimonials and case results
- Bar association memberships
- Community involvement
- Office location and contact information

## Technical Implementation

### Multi-Step Form HTML Structure
```html
<form id="intake-form" class="contact-form multi-step" 
      data-webhook-url="/api/intake-complete"
      data-step-webhook-1="/api/intake-step1"
      data-step-webhook-2="/api/intake-complete">
  
  <!-- Step Indicator -->
  <div class="step-indicator" role="progressbar" aria-valuemin="1" aria-valuemax="2">
    <div class="step-indicator__item active">Contact Info</div>
    <div class="step-indicator__item">Case Details</div>
  </div>

  <!-- Step 1: Contact Information -->
  <div class="form-step active" data-step="1">
    <h3>Contact Information</h3>
    <p>Start your free consultation - we'll contact you within 1 hour.</p>
    
    <!-- Email field -->
    <!-- Phone field -->
    <!-- Contact preference -->
    
    <div class="form-actions">
      <button type="button" class="btn btn--primary btn-next">
        Continue to Case Details →
      </button>
    </div>
  </div>

  <!-- Step 2: Case Details -->
  <div class="form-step" data-step="2">
    <h3>Tell Us About Your Case</h3>
    <p>Help us understand your situation for the best legal advice.</p>
    
    <!-- All intake fields -->
    
    <div class="form-actions">
      <button type="button" class="btn btn--secondary btn-prev">
        ← Back
      </button>
      <button type="submit" class="btn btn--primary">
        Submit Case Information
      </button>
    </div>
  </div>
</form>
```

### Performance Optimization Requirements

#### Critical CSS Inlining
```html
<style>
/* Critical above-the-fold CSS */
.hero { min-height: 100vh; display: flex; align-items: center; }
.form-step { display: none; }
.form-step.active { display: block; }
/* Core button and form styles */
</style>
```

#### Image Optimization
- WebP format with fallbacks
- Responsive image sizing
- Lazy loading for below-fold content
- Proper alt text for accessibility

#### JavaScript Performance
- Minimal blocking JavaScript
- Form validation in vanilla JS
- Progressive enhancement approach
- Service worker for caching

### SEO & Local Optimization

#### Meta Tags
```html
<title>Fontana Car Accident Lawyer - Free Consultation | [Firm Name]</title>
<meta name="description" content="Experienced Fontana car accident lawyers. Free consultation, no fees unless we win. Call (909) XXX-XXXX for immediate legal help.">
<meta name="keywords" content="fontana car accident lawyer, car accident attorney san bernardino county, personal injury lawyer fontana">
```

#### Local Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "LegalService",
  "name": "[Law Firm Name]",
  "description": "Personal injury attorneys serving Fontana and San Bernardino County",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[Office Address]",
    "addressLocality": "Fontana",
    "addressRegion": "CA",
    "postalCode": "[ZIP]"
  },
  "telephone": "(909) XXX-XXXX",
  "areaServed": "Fontana, CA",
  "priceRange": "Free Consultation"
}
```

## Quality Gates

### Before Launch Checklist
- [ ] Google PageSpeed Insights: Mobile 90+ score
- [ ] Google PageSpeed Insights: Desktop 90+ score
- [ ] Core Web Vitals: All green
- [ ] Multi-step form: Both steps functional
- [ ] Webhook Step 1: Immediate lead capture working
- [ ] Webhook Step 2: Complete intake data transmitted
- [ ] Mobile responsiveness: Tested on real devices
- [ ] Form validation: All fields properly validated
- [ ] Accessibility: WCAG 2.1 AA compliance
- [ ] Legal compliance: Privacy policy and disclaimers
- [ ] Contact information: Phone, email, address verified
- [ ] Call tracking: Phone number properly configured

### Performance Monitoring
- Set up Core Web Vitals monitoring
- Monitor form completion rates
- Track lead quality from each step
- A/B test form copy and flow
- Monitor page load speeds regularly

### Legal Requirements
- Attorney advertising disclaimers
- Privacy policy for form data
- GDPR/CCPA compliance statements
- Professional liability disclosures
- State bar compliance verification

## Subagent Integration

### CSS Guru Tasks
- Mobile-first responsive design implementation
- Performance optimization for Core Web Vitals
- Multi-step form visual design and UX
- Attorney website professional styling

### Content Manager Tasks
- JSON content structure for legal website
- SEO optimization for local search
- Schema markup implementation
- Content updates for legal compliance

### Form Handler Tasks
- Multi-step form functionality
- Dual webhook integration (step 1 + step 2)
- Legal intake form validation
- Lead scoring and qualification logic

## Success Metrics

### Performance KPIs
- Google PageSpeed Insights scores: 90+ (Mobile & Desktop)
- Core Web Vitals: All green
- Page load time: < 1.5 seconds
- Form completion rate: > 25%

### Business KPIs
- Lead generation: Track quantity and quality
- Step 1 completion: Monitor drop-off rates
- Phone call volume: Track from CTA buttons
- Consultation bookings: Ultimate conversion goal

Use `/memory` to add project-specific information to this file as development progresses.