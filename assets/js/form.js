class MultiStepForm {
    constructor() {
        this.form = document.getElementById('intake-form');
        this.steps = document.querySelectorAll('.form-step');
        this.stepIndicators = document.querySelectorAll('.step-indicator__item');
        this.currentStep = 1;
        this.formData = {};
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPhoneFormatter();
    }
    
    bindEvents() {
        // Next button
        const nextBtn = document.querySelector('.btn-next');
        if (nextBtn) {
            console.log('Next button found and event listener attached');
            nextBtn.addEventListener('click', (e) => {
                console.log('Next button clicked!');
                e.preventDefault();
                this.nextStep();
            });
        } else {
            console.error('Next button NOT found!');
        }
        
        // Previous button
        const prevBtn = document.querySelector('.btn-prev');
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.prevStep());
        }
        
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        this.form.addEventListener('input', (e) => this.clearError(e.target));
        this.form.addEventListener('change', (e) => this.clearError(e.target));
    }
    
    setupPhoneFormatter() {
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
    
    nextStep() {
        console.log('NextStep triggered, current step:', this.currentStep);
        
        if (this.validateStep(this.currentStep)) {
            this.collectStepData(this.currentStep);
            console.log('Step data collected:', this.formData);
            
            if (this.currentStep === 1) {
                console.log('Sending Step 1 webhook...');
                this.sendStepWebhook(1);
            }
            
            this.currentStep++;
            this.showStep(this.currentStep);
            this.updateStepIndicator();
        } else {
            console.log('Validation failed for step:', this.currentStep);
        }
    }
    
    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.showStep(this.currentStep);
            this.updateStepIndicator();
        }
    }
    
    showStep(stepNumber) {
        this.steps.forEach((step, index) => {
            step.classList.toggle('active', index + 1 === stepNumber);
        });
    }
    
    updateStepIndicator() {
        this.stepIndicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 === this.currentStep);
        });
    }
    
    validateStep(stepNumber) {
        const currentStepElement = document.querySelector(`[data-step="${stepNumber}"]`);
        const requiredFields = currentStepElement.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Special validation for step 2 removed - no length limit
        
        return isValid;
    }
    
    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        
        // Clear previous error
        this.clearError(field);
        
        // Required field check
        if (field.hasAttribute('required') && !value) {
            this.showError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
            if (!phoneRegex.test(value)) {
                this.showError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        // Radio group validation
        if (field.type === 'radio' && field.hasAttribute('required')) {
            const radioGroup = document.querySelectorAll(`input[name="${fieldName}"]`);
            const isChecked = Array.from(radioGroup).some(radio => radio.checked);
            if (!isChecked) {
                this.showError(field, 'Please select an option');
                return false;
            }
        }
        
        return true;
    }
    
    showError(field, message) {
        const errorElement = document.getElementById(`${field.id || field.name}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            field.style.borderColor = '#dc3545';
        }
    }
    
    clearError(field) {
        const errorElement = document.getElementById(`${field.id || field.name}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            field.style.borderColor = '#ddd';
        }
    }
    
    collectStepData(stepNumber) {
        console.log('🔍 Collecting data for step:', stepNumber);
        
        // CRITICAL: Use specific selector for form steps, not indicators
        let currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        console.log('📍 Method 1 - Found form step element:', currentStepElement);
        
        if (!currentStepElement) {
            // Fallback: find the active step
            currentStepElement = document.querySelector('.form-step.active');
            console.log('📍 Method 2 - Found active step:', currentStepElement);
        }
        
        if (!currentStepElement) {
            // Last resort: find all form inputs
            console.log('📍 Method 3 - Searching entire form');
            currentStepElement = this.form;
        }
        
        const inputs = currentStepElement.querySelectorAll('input, select, textarea');
        console.log('📋 Found inputs:', inputs.length);
        
        // Log all inputs found
        inputs.forEach((input, index) => {
            console.log(`📝 Input ${index}: name="${input.name}" id="${input.id}" value="${input.value}" type="${input.type}"`);
        });
        
        inputs.forEach(input => {
            if (!input.name) {
                console.log('⚠️ Skipping input without name attribute:', input);
                return;
            }
            
            console.log(`🔸 Processing input: ${input.name} = "${input.value}" (type: ${input.type})`);
            
            if (input.type === 'checkbox') {
                if (!this.formData[input.name]) {
                    this.formData[input.name] = [];
                }
                if (input.checked) {
                    this.formData[input.name].push(input.value);
                    console.log(`✅ Checkbox checked: ${input.name} = ${input.value}`);
                }
            } else if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                    console.log(`✅ Radio selected: ${input.name} = ${input.value}`);
                }
            } else {
                this.formData[input.name] = input.value;
                console.log(`✅ Field collected: ${input.name} = ${input.value}`);
            }
        });
        
        console.log('📦 Final collected form data:', this.formData);
    }
    
    sendStepWebhook(stepNumber) {
        const webhookUrl = this.form.getAttribute(`data-step-webhook-${stepNumber}`);
        const externalWebhookUrl = this.form.getAttribute(`data-external-webhook-${stepNumber}`);
        
        console.log('Webhook URLs found:');
        console.log('Internal:', webhookUrl);
        console.log('External:', externalWebhookUrl);
        
        // Create different payloads for internal vs external webhooks
        const internalPayload = {
            step: stepNumber,
            timestamp: new Date().toISOString(),
            leadData: {
                firstName: this.formData.firstName || "",
                email: this.formData.email || "",
                phone: this.formData.phone || "",
                preferredContact: this.formData.preferredContact || "email"
            },
            metadata: {
                sessionId: this.generateSessionId(),
                ipAddress: "client", // Will be detected by server
                userAgent: navigator.userAgent,
                referrer: document.referrer,
                url: window.location.href
            }
        };

        // Simple payload for n8n - even more simplified
        const externalPayload = {
            firstName: this.formData.firstName || "",
            email: this.formData.email || "",
            phone: this.formData.phone || "",
            preferredContact: this.formData.preferredContact || "email"
        };
        
        console.log('Internal payload:', internalPayload);
        console.log('External payload:', externalPayload);
        
        // Call internal webhook with full payload
        if (webhookUrl) {
            console.log(`Calling internal webhook:`, webhookUrl);
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(internalPayload)
            })
            .then(response => {
                console.log(`Internal webhook response:`, response.status, response.statusText);
                return response.text();
            })
            .then(responseText => {
                console.log(`Internal webhook success:`, responseText);
            })
            .catch(error => {
                console.error(`Internal webhook error:`, error);
            });
        }
        
        // Call external n8n webhook with simplified payload
        if (externalWebhookUrl) {
            console.log(`Calling n8n webhook:`, externalWebhookUrl);
            console.log(`n8n payload:`, externalPayload);
            
            fetch(externalWebhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'User-Agent': 'AccidentLawyerFontana/1.0'
                },
                body: JSON.stringify(externalPayload)
            })
            .then(response => {
                console.log(`n8n webhook response:`, response.status, response.statusText);
                return response.text();
            })
            .then(responseText => {
                console.log(`n8n webhook success:`, responseText);
            })
            .catch(error => {
                console.error(`n8n webhook error:`, error);
            });
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        console.log('🚀 FORM SUBMIT TRIGGERED');
        
        if (!this.validateStep(2)) {
            console.log('❌ Step 2 validation failed');
            return;
        }
        
        console.log('✅ Step 2 validation passed');
        this.collectStepData(2);
        console.log('📦 Final form data before webhook:', this.formData);
        
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const loading = submitBtn.querySelector('.loading');
        
        submitBtn.disabled = true;
        loading.classList.add('active');
        
        console.log('🔄 Sending final webhook...');
        await this.sendFinalWebhook();
        
        // Show success message
        this.showSuccessMessage();
    }
    
    async sendFinalWebhook() {
        console.log('📡 sendFinalWebhook called');
        const webhookUrl = this.form.getAttribute('data-step-webhook-2');
        const externalWebhookUrl = this.form.getAttribute('data-external-webhook-2');
        
        console.log('🔗 Webhook URLs:', {
            internal: webhookUrl,
            external: externalWebhookUrl
        });
        
        const caseScore = this.calculateCaseScore();
        
        // Internal webhook payload
        const internalPayload = {
            step: 2,
            timestamp: new Date().toISOString(),
            completeLead: {
                // Step 1 data
                email: this.formData.email,
                phone: this.formData.phone,
                preferredContact: this.formData.preferredContact,
                // Step 2 data
                fullName: `${this.formData.firstName} ${this.formData.lastName}`,
                firstName: this.formData.firstName,
                lastName: this.formData.lastName,
                incidentDate: this.formData.incidentDate,
                accidentType: this.formData.accidentType,
                injuryDescription: this.formData.injuryDescription,
                medicalTreatment: this.formData.medicalTreatment || [],
                hasInsurance: this.formData.hasInsurance,
                policeReport: this.formData.policeReport,
                faultAssignment: this.formData.faultAssignment,
                additionalDetails: this.formData.additionalDetails || ''
            },
            caseScore: caseScore.score,
            priority: caseScore.priority,
            metadata: {
                sessionId: this.generateSessionId(),
                ipAddress: await this.getClientIP(),
                userAgent: navigator.userAgent,
                referrer: document.referrer,
                url: window.location.href
            }
        };
        
        // External webhook payload - includes email from step 1 for linking
        const externalPayload = {
            step: 2,
            email: this.formData.email, // Critical: links to step 1 submission
            firstName: this.formData.firstName,
            lastName: this.formData.lastName,
            phone: this.formData.phone,
            preferredContact: this.formData.preferredContact,
            incidentDate: this.formData.incidentDate,
            accidentType: this.formData.accidentType,
            injuryDescription: this.formData.injuryDescription,
            medicalTreatment: this.formData.medicalTreatment || [],
            hasInsurance: this.formData.hasInsurance,
            policeReport: this.formData.policeReport,
            faultAssignment: this.formData.faultAssignment,
            additionalDetails: this.formData.additionalDetails || ''
        };
        
        // Send internal webhook
        if (webhookUrl) {
            try {
                const response = await fetch(webhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(internalPayload)
                });
                
                if (!response.ok) {
                    console.warn('Internal webhook failed:', response.status);
                }
            } catch (error) {
                console.warn('Internal webhook error:', error);
            }
        }
        
        // Send external webhook
        if (externalWebhookUrl) {
            console.log('Sending step 2 to external webhook:', externalWebhookUrl);
            console.log('Step 2 payload:', externalPayload);
            
            try {
                const response = await fetch(externalWebhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'User-Agent': 'AccidentLawyerFontana/1.0'
                    },
                    body: JSON.stringify(externalPayload)
                });
                
                console.log('External webhook response:', response.status, response.statusText);
                const responseText = await response.text();
                console.log('External webhook response body:', responseText);
            } catch (error) {
                console.error('External webhook error:', error);
            }
        }
    }
    
    calculateCaseScore() {
        let score = 0;
        let priority = 'low';
        
        // Fault assessment
        if (this.formData.faultAssignment === 'other') score += 30;
        else if (this.formData.faultAssignment === 'mutual') score += 15;
        else if (this.formData.faultAssignment === 'unsure') score += 10;
        
        // Medical treatment
        if (this.formData.medicalTreatment) {
            if (this.formData.medicalTreatment.includes('hospitalization')) score += 25;
            if (this.formData.medicalTreatment.includes('emergency-room')) score += 20;
            if (this.formData.medicalTreatment.includes('ongoing')) score += 15;
            if (this.formData.medicalTreatment.includes('physical-therapy')) score += 10;
        }
        
        // Police report
        if (this.formData.policeReport === 'yes') score += 15;
        
        // Insurance
        if (this.formData.hasInsurance === 'yes') score += 10;
        
        // Accident type severity
        if (this.formData.accidentType === 'motor-vehicle') score += 10;
        else if (this.formData.accidentType === 'motorcycle') score += 15;
        
        // Injury description length (indicates severity)
        if (this.formData.injuryDescription && this.formData.injuryDescription.length > 200) {
            score += 10;
        }
        
        // Determine priority
        if (score >= 70) priority = 'high';
        else if (score >= 40) priority = 'medium';
        
        return { score, priority };
    }
    
    showSuccessMessage() {
        const formContainer = document.querySelector('.contact-form');
        formContainer.innerHTML = `
            <div class="success-message">
                <h2 style="color: #00c853; margin-bottom: 1rem; text-align: center;">Thank You!</h2>
                <p style="margin-bottom: 2rem; text-align: center; color: #ffffff;">Your case information has been submitted successfully. Our legal team will contact you within 1 hour using your preferred contact method.</p>
                <div style="background-color: rgba(0, 200, 83, 0.1); border: 1px solid rgba(0, 200, 83, 0.3); border-radius: 12px; padding: 1.5rem; margin-bottom: 1.5rem;">
                    <strong style="color: #00c853; display: block; margin-bottom: 1rem;">What happens next:</strong>
                    <ul style="text-align: left; margin: 0; padding-left: 1.5rem; color: rgba(255, 255, 255, 0.9);">
                        <li style="margin-bottom: 0.5rem;">Legal team review (within 1 hour)</li>
                        <li style="margin-bottom: 0.5rem;">Initial case assessment</li>
                        <li style="margin-bottom: 0.5rem;">Free consultation scheduling</li>
                        <li style="margin-bottom: 0.5rem;">No fees unless we win</li>
                    </ul>
                </div>
                <p style="text-align: center; color: #ffffff;"><strong>Need immediate assistance?</strong><br>
                Call us directly: <a href="tel:+1XXXXXXXXXX" style="color: #00c853; text-decoration: none; font-weight: bold;">(XXX) XXX-XXXX</a></p>
            </div>
        `;
    }
    
    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + Date.now();
    }
    
    async getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'unknown';
        }
    }
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MultiStepForm();
});

// Smooth scroll for anchor links
document.addEventListener('click', (e) => {
    if (e.target.getAttribute('href') && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});