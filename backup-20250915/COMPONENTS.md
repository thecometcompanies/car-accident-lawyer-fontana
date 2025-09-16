# Performance-First Component Library

## 🎯 Philosophy
**Vanilla CSS/HTML components optimized for Google PageSpeed A+ scores and legal website requirements.**

## 🚀 Quick Reference

### **Buttons**

#### Primary CTA Button
```html
<button class="btn btn--primary" onclick="action()">
  Start Free Case Evaluation
</button>
```
```css
.btn--primary {
  background: linear-gradient(135deg, #00c853, #00e676);
  color: #fff;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 200, 83, 0.3);
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 200, 83, 0.4);
}
```

#### Secondary Button
```html
<button class="btn btn--secondary">
  Learn More
</button>
```
```css
.btn--secondary {
  background: transparent;
  color: #00c853;
  padding: 1rem 2rem;
  border: 2px solid #00c853;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn--secondary:hover {
  background: #00c853;
  color: #fff;
}
```

#### Phone CTA Button
```html
<a href="tel:(909)123-4567" class="btn btn--phone">
  📞 Call (909) 123-4567
</a>
```
```css
.btn--phone {
  background: #2196f3;
  color: #fff;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  transition: all 0.3s ease;
}
```

### **Forms**

#### Multi-Step Form Container
```html
<form id="intake-form" class="contact-form multi-step">
  <!-- Step Indicator -->
  <div class="step-indicator" role="progressbar" aria-valuemin="1" aria-valuemax="2">
    <div class="step-indicator__item active">Contact Info</div>
    <div class="step-indicator__item">Case Details</div>
  </div>
  
  <!-- Form Steps -->
  <div class="form-step active" data-step="1">
    <!-- Step content -->
  </div>
</form>
```

#### Form Field Components
```html
<!-- Text Input -->
<div class="form-group">
  <label for="email" class="form-label">Email Address *</label>
  <input type="email" id="email" name="email" class="form-field" required>
  <div class="form-error" id="email-error"></div>
</div>

<!-- Select Dropdown -->
<div class="form-group">
  <label for="accident-type" class="form-label">Type of Accident *</label>
  <select id="accident-type" name="accidentType" class="form-field" required>
    <option value="">Select accident type...</option>
    <option value="motor-vehicle">Motor Vehicle Accident</option>
    <option value="motorcycle">Motorcycle Accident</option>
  </select>
</div>

<!-- Textarea -->
<div class="form-group">
  <label for="injury-desc" class="form-label">Describe Your Injuries *</label>
  <textarea id="injury-desc" name="injuryDescription" class="form-field" rows="4" required></textarea>
</div>

<!-- Radio Buttons -->
<div class="form-group">
  <fieldset class="radio-group">
    <legend class="form-label">Preferred Contact Method *</legend>
    <label class="radio-label">
      <input type="radio" name="preferredContact" value="email" required>
      <span class="radio-custom"></span>
      Email
    </label>
    <label class="radio-label">
      <input type="radio" name="preferredContact" value="phone" required>
      <span class="radio-custom"></span>
      Phone Call
    </label>
  </fieldset>
</div>
```

### **Layout Components**

#### Container & Grid System
```html
<div class="container">
  <div class="row">
    <div class="col-12 col-md-6">Content</div>
    <div class="col-12 col-md-6">Content</div>
  </div>
</div>
```

#### Trust Signals Grid
```html
<div class="trust-signals">
  <div class="container">
    <h2>Why Choose Our Lawyers?</h2>
    <div class="trust-grid">
      <div class="trust-item">
        <div class="trust-icon">⚖️</div>
        <h3 class="trust-title">No Win, No Fee</h3>
        <p class="trust-desc">We work on a contingency fee basis.</p>
      </div>
    </div>
  </div>
</div>
```

### **FAQ Accordion**

#### Progressive Loading FAQ
```html
<div class="faq-section">
  <h2>Frequently Asked Questions</h2>
  <div class="faq-container">
    <!-- Initial 15 FAQs visible -->
    <div class="faq-item">
      <button class="faq-question" onclick="toggleFAQ(this)">
        What should I do after a car accident?
        <span class="faq-toggle">+</span>
      </button>
      <div class="faq-answer">
        <p>Your answer here...</p>
      </div>
    </div>
    
    <!-- Show More Button -->
    <div id="showMoreButton">
      <button onclick="showMoreFAQs()" class="btn btn--primary">
        Show More FAQs (<span id="remainingCount">28</span> remaining)
      </button>
    </div>
    
    <!-- Hidden FAQ Groups -->
    <div id="faqGroup1" style="display: none;">
      <!-- More FAQs here -->
    </div>
  </div>
</div>
```

### **Feature Sections**

#### Feature Section with Image (Two-Column)
```html
<div class="feature-section">
  <div class="container">
    <div class="feature-grid">
      <div class="feature-content">
        <div class="feature-text">
          <h2 class="feature-subtitle">Legal Excellence</h2>
          <p class="feature-title">Better Legal Representation</p>
          <p class="feature-description">Our experienced attorneys provide comprehensive legal support with proven results and personalized attention to every case.</p>
          
          <dl class="feature-list">
            <div class="feature-item">
              <dt class="feature-item-title">
                <svg viewBox="0 0 20 20" fill="currentColor" class="feature-icon">
                  <path d="M5.5 17a4.5 4.5 0 0 1-1.44-8.765 4.5 4.5 0 0 1 8.302-3.046 3.5 3.5 0 0 1 4.504 4.272A4 4 0 0 1 15 17H5.5Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                No Win, No Fee.
              </dt>
              <dd class="feature-item-text">We work on a contingency fee basis - you don't pay unless we win your case.</dd>
            </div>
            <div class="feature-item">
              <dt class="feature-item-title">
                <svg viewBox="0 0 20 20" fill="currentColor" class="feature-icon">
                  <path d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                Free Consultation.
              </dt>
              <dd class="feature-item-text">Get expert legal advice with no upfront costs or obligations.</dd>
            </div>
            <div class="feature-item">
              <dt class="feature-item-title">
                <svg viewBox="0 0 20 20" fill="currentColor" class="feature-icon">
                  <path d="M4.632 3.533A2 2 0 0 1 6.577 2h6.846a2 2 0 0 1 1.945 1.533l1.976 8.234Z" />
                </svg>
                Proven Results.
              </dt>
              <dd class="feature-item-text">Track record of successful settlements and verdicts.</dd>
            </div>
          </dl>

          <a href="#" class="cta-button">Start Free Case Evaluation</a>
        </div>
      </div>
      <img width="400" height="400" src="https://example.com/image.jpg" alt="Description" class="feature-image" />
    </div>
  </div>
</div>
```

### **Modal Components**

#### Form Modal
```html
<div id="formModal" class="modal" style="display: none;">
  <div class="modal-content">
    <div class="modal-header">
      <h2>Free Case Evaluation</h2>
      <button class="modal-close" onclick="closeModal()">×</button>
    </div>
    <div class="modal-body">
      <!-- Form content -->
    </div>
  </div>
</div>
```

## 🎨 CSS Framework

### **Core Styles**
```css
/* Reset & Base Styles */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

/* Container System */
.container { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }

/* Responsive Grid */
.row { display: flex; flex-wrap: wrap; margin: -1rem; }
.col-12 { flex: 0 0 100%; padding: 1rem; }

@media (min-width: 768px) {
  .col-md-6 { flex: 0 0 50%; }
  .col-md-4 { flex: 0 0 33.333%; }
  .col-md-3 { flex: 0 0 25%; }
}

/* Form Styles */
.form-field {
  width: 100%;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-field:focus {
  outline: none;
  border-color: #00c853;
  box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.1);
}

.form-field.error { border-color: #f44336; }
.form-field.valid { border-color: #4caf50; }

/* FAQ Styles */
.faq-item {
  margin-bottom: 2rem;
  background: #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
}

.faq-question {
  width: 100%;
  padding: 1.5rem;
  background: #2a2a2a;
  color: #fff;
  border: none;
  text-align: left;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.faq-answer {
  display: none;
  padding: 0 1.5rem 1.5rem;
  color: #ccc;
  line-height: 1.6;
}

/* Feature Section Styles */
.feature-section {
  overflow: hidden;
  background: #111827;
  padding: 6rem 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 672px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .feature-grid { gap: 4rem 2rem; }
}

@media (min-width: 1024px) {
  .feature-grid {
    grid-template-columns: 1fr 1fr;
    max-width: none;
    margin: 0;
    gap: 2rem 4rem;
  }
}

.feature-content {
  padding-top: 1rem;
}

@media (min-width: 1024px) {
  .feature-content {
    padding-top: 1rem;
    padding-right: 2rem;
    max-width: 32rem;
  }
}

.feature-text {
  max-width: 32rem;
}

@media (min-width: 1024px) {
  .feature-text { max-width: none; }
}

.feature-subtitle {
  font-size: 0.875rem;
  line-height: 1.75;
  font-weight: 600;
  color: #00c853;
}

.feature-title {
  margin-top: 0.5rem;
  font-size: 2.25rem;
  font-weight: 600;
  letter-spacing: -0.025em;
  color: #ffffff;
  line-height: 1.2;
}

@media (min-width: 640px) {
  .feature-title { font-size: 3rem; }
}

.feature-description {
  margin-top: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.75;
  color: #d1d5db;
}

.feature-list {
  margin-top: 2.5rem;
  max-width: 36rem;
  list-style: none;
}

@media (min-width: 1024px) {
  .feature-list { max-width: none; }
}

.feature-item {
  position: relative;
  padding-left: 2.25rem;
  margin-bottom: 2rem;
  font-size: 0.875rem;
  line-height: 1.75;
  color: #9ca3af;
}

.feature-item:last-child { margin-bottom: 0; }

.feature-icon {
  position: absolute;
  top: 0.25rem;
  left: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;
  color: #00c853;
}

.feature-item-title {
  display: inline;
  font-weight: 600;
  color: #ffffff;
}

.feature-item-text {
  display: inline;
}

.feature-image {
  width: 100%;
  max-width: 400px;
  height: 400px;
  object-fit: cover;
  border-radius: 0.75rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

@media (min-width: 640px) {
  .feature-image {
    max-width: 500px;
    height: 500px;
  }
}

@media (min-width: 1024px) {
  .feature-image {
    max-width: 600px;
    height: 600px;
  }
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .container { padding: 0 1rem; }
  .btn { min-height: 48px; padding: 0.8rem 1.5rem; }
  .faq-question { padding: 1rem; font-size: 1rem; }
  .faq-answer { padding: 0 1rem 1rem; font-size: 0.9rem; }
}

@media (max-width: 480px) {
  .faq-section h2 { font-size: 1.75rem; }
  .btn { padding: 0.7rem 1.2rem; font-size: 0.95rem; }
}
```

### **JavaScript Utilities**
```javascript
// FAQ Toggle Function
function toggleFAQ(button) {
  const answer = button.nextElementSibling;
  const toggle = button.querySelector('.faq-toggle');
  
  if (answer.style.display === 'none' || answer.style.display === '') {
    answer.style.display = 'block';
    toggle.textContent = '−';
    button.style.background = '#333';
  } else {
    answer.style.display = 'none';
    toggle.textContent = '+';
    button.style.background = '#2a2a2a';
  }
}

// Progressive FAQ Loading
function showMoreFAQs() {
  currentGroup++;
  const groupId = 'faqGroup' + currentGroup;
  const group = document.getElementById(groupId);
  const button = document.getElementById('showMoreButton');
  
  if (group) {
    group.style.display = 'block';
    group.style.opacity = '0';
    group.style.transform = 'translateY(20px)';
    group.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
      group.style.opacity = '1';
      group.style.transform = 'translateY(0)';
    }, 10);
  }
}

// Form Validation
function validateField(field) {
  const value = field.value.trim();
  const type = field.type;
  
  if (type === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
  
  if (type === 'tel') {
    return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(value);
  }
  
  return value.length > 0;
}
```

## 📱 Mobile-First Breakpoints

```css
/* Mobile First (default) */
/* 320px+ (small phones) */

/* Small screens */
@media (min-width: 480px) { }

/* Tablets */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1200px) { }
```

## ⚡ Performance Notes

1. **Critical CSS**: Inline above-the-fold styles in `<style>` tags
2. **Async Loading**: Load non-critical CSS with `rel="preload"`
3. **No Dependencies**: Zero CSS framework overhead
4. **Optimized Images**: Use WebP with fallbacks
5. **Minimal JavaScript**: Progressive enhancement only

## 🎯 Usage Guidelines

1. **Copy Components**: Use as-is for A+ PageSpeed scores
2. **Mobile-First**: Always design for mobile traffic
3. **Accessibility**: All components WCAG 2.1 AA compliant
4. **Legal Compliance**: Built for attorney website requirements
5. **Performance**: Every component tested for Core Web Vitals

---

**Use this library across all legal/business landing pages that require maximum performance and conversion optimization.**