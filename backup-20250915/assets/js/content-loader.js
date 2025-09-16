/**
 * Content Management System for Fontana Car Accident Lawyer Website
 * Loads and renders content from JSON files
 */

class ContentManager {
    constructor() {
        this.content = null;
        this.init();
    }
    
    async init() {
        try {
            await this.loadContent();
            this.renderContent();
        } catch (error) {
            console.error('Failed to load content:', error);
            // Fallback to hardcoded content if JSON fails
        }
    }
    
    async loadContent() {
        const response = await fetch('/content/site-content.json');
        if (!response.ok) {
            throw new Error('Failed to load content');
        }
        this.content = await response.json();
    }
    
    renderContent() {
        if (!this.content) return;
        
        this.updateMeta();
        this.renderHero();
        this.renderForm();
        this.renderTrustSignals();
        this.renderFAQ();
    }
    
    updateMeta() {
        const { meta } = this.content;
        document.title = meta.title;
        
        // Update meta description
        let descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) {
            descMeta.setAttribute('content', meta.description);
        }
        
        // Update meta keywords
        let keywordsMeta = document.querySelector('meta[name="keywords"]');
        if (keywordsMeta) {
            keywordsMeta.setAttribute('content', meta.keywords);
        }
    }
    
    renderHero() {
        const { hero } = this.content;
        
        // Update headline
        const headline = document.querySelector('.hero-text h1');
        if (headline) {
            // Replace \n with <br> for proper line breaks
            headline.innerHTML = hero.headline.replace(/\n/g, '<br>');
        }
        
        // Update subtitle (h2)
        const subtitle = document.querySelector('.hero-text h2');
        if (subtitle && hero.subtitle) {
            subtitle.textContent = hero.subtitle;
        }
        
        // Update subheadline
        const subheadline = document.querySelector('.hero-text p');
        if (subheadline) {
            subheadline.textContent = hero.subheadline;
        }
        
        // Update CTAs
        const primaryCTA = document.querySelector('.btn--primary');
        if (primaryCTA) {
            primaryCTA.textContent = hero.primaryCTA.text;
            if (hero.primaryCTA.action === 'scroll-to-form') {
                primaryCTA.setAttribute('href', '#contact-form');
            } else {
                primaryCTA.setAttribute('href', hero.primaryCTA.action);
            }
        }
        
        const secondaryCTA = document.querySelector('.btn--secondary');
        if (secondaryCTA) {
            secondaryCTA.textContent = hero.secondaryCTA.text;
            secondaryCTA.setAttribute('href', hero.secondaryCTA.action);
        }
    }
    
    renderForm() {
        // Form rendering is complex due to existing structure
        // For now, update step titles and subtitles
        const { form } = this.content;
        
        // Step 1
        const step1Title = document.querySelector('[data-step="1"] h3');
        if (step1Title) {
            step1Title.textContent = form.steps["1"].title;
        }
        
        const step1Subtitle = document.querySelector('[data-step="1"] > p');
        if (step1Subtitle) {
            step1Subtitle.textContent = form.steps["1"].subtitle;
        }
        
        // Step 2
        const step2Title = document.querySelector('[data-step="2"] h3');
        if (step2Title) {
            step2Title.textContent = form.steps["2"].title;
        }
        
        const step2Subtitle = document.querySelector('[data-step="2"] > p');
        if (step2Subtitle) {
            step2Subtitle.textContent = form.steps["2"].subtitle;
        }
        
        // Update button text
        const nextBtn = document.querySelector('.btn-next');
        if (nextBtn) {
            nextBtn.innerHTML = form.steps["1"].button.text;
        }
        
        const submitBtn = document.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.innerHTML = form.steps["2"].buttons.submit + '<span class="loading">...</span>';
        }
        
        const backBtn = document.querySelector('.btn-prev');
        if (backBtn) {
            backBtn.textContent = form.steps["2"].buttons.back;
        }
    }
    
    renderTrustSignals() {
        const { trustSignals } = this.content;
        
        // Update title
        const title = document.querySelector('.trust-signals h2');
        if (title) {
            title.textContent = trustSignals.title;
        }
        
        // Update trust items
        const trustItems = document.querySelectorAll('.trust-item');
        trustItems.forEach((item, index) => {
            if (trustSignals.items[index]) {
                const data = trustSignals.items[index];
                
                const icon = item.querySelector('.trust-icon');
                if (icon) icon.textContent = data.icon;
                
                const itemTitle = item.querySelector('h3');
                if (itemTitle) itemTitle.textContent = data.title;
                
                const description = item.querySelector('p');
                if (description) description.textContent = data.description;
            }
        });
    }
    
    renderFAQ() {
        const { faq } = this.content;
        if (!faq) return;
        
        // Update FAQ title
        const faqTitle = document.querySelector('.faq-section h2');
        if (faqTitle) {
            faqTitle.textContent = faq.title;
        }
        
        // Render FAQ items dynamically if needed
        const faqContainer = document.querySelector('.faq-section > div');
        if (faqContainer && faq.items) {
            // Clear existing FAQ items
            faqContainer.innerHTML = '';
            
            // Generate FAQ items from JSON data
            faq.items.forEach((item, index) => {
                const faqItem = document.createElement('div');
                faqItem.className = 'faq-item';
                faqItem.style.cssText = 'margin-bottom: 2rem; background: #2a2a2a; border-radius: 8px; overflow: hidden;';
                
                faqItem.innerHTML = `
                    <button class="faq-question" onclick="toggleFAQ(this)" style="width: 100%; padding: 1.5rem; background: #2a2a2a; color: #fff; border: none; text-align: left; font-size: 1.2rem; font-weight: 600; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
                        ${item.question}
                        <span class="faq-toggle" style="font-size: 1.5rem; font-weight: bold; color: #00c853;">+</span>
                    </button>
                    <div class="faq-answer" style="display: none; padding: 0 1.5rem 1.5rem; color: #ccc; line-height: 1.6;">
                        <p>${item.answer}</p>
                    </div>
                `;
                
                faqContainer.appendChild(faqItem);
            });
        }
    }
    
    // Method to update content dynamically
    updateContent(newContent) {
        this.content = { ...this.content, ...newContent };
        this.renderContent();
    }
    
    // Method to get current content
    getContent() {
        return this.content;
    }
}

// Initialize content manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.contentManager = new ContentManager();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContentManager;
}