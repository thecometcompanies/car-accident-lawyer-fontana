'use client'

import { useState, useEffect } from 'react'
import { CheckIcon } from '@/components/CheckIcon'

export default function ContactForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Phone number formatting
  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '')
    if (phoneNumber.length >= 6) {
      return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    } else if (phoneNumber.length >= 3) {
      return phoneNumber.replace(/(\d{3})(\d{1,3})/, '($1) $2')
    }
    return value
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }))
    } else if (type === 'checkbox') {
      const currentValues = formData[name] || []
      if (checked) {
        setFormData(prev => ({ ...prev, [name]: [...currentValues, value] }))
      } else {
        setFormData(prev => ({ 
          ...prev, 
          [name]: currentValues.filter(v => v !== value) 
        }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateStep = (step) => {
    if (step === 1) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/
      
      if (!formData.firstName || !formData.email || !formData.phone) {
        alert('Please fill in all required fields')
        return false
      }
      
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address')
        return false
      }
      
      if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number')
        return false
      }
      
      return true
    }
    
    if (step === 2) {
      if (!formData.lastName || !formData.incidentDate || !formData.accidentType || 
          !formData.injuryDescription || !formData.hasInsurance || 
          !formData.policeReport || !formData.faultAssignment) {
        alert('Please fill in all required fields')
        return false
      }
      return true
    }
    
    return true
  }

  const sendStepWebhook = async (stepNumber) => {
    const webhookUrl = stepNumber === 1 
      ? '/api/webhooks/step1'
      : '/api/webhooks/step2'
    
    const externalWebhookUrl = 'https://n8n-dtla-c914de1950b9.herokuapp.com/webhook/12b6de6e-7897-4348-94e5-179ab56c89e2'
    
    const payload = stepNumber === 1 
      ? {
          firstName: formData.firstName || "",
          email: formData.email || "",
          phone: formData.phone || "",
          preferredContact: formData.preferredContact || "email"
        }
      : {
          step: 2,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          preferredContact: formData.preferredContact,
          incidentDate: formData.incidentDate,
          accidentType: formData.accidentType,
          injuryDescription: formData.injuryDescription,
          medicalTreatment: formData.medicalTreatment || [],
          hasInsurance: formData.hasInsurance,
          policeReport: formData.policeReport,
          faultAssignment: formData.faultAssignment,
          additionalDetails: formData.additionalDetails || ''
        }
    
    // Send to internal webhook
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.error('Internal webhook error:', error)
    }
    
    // Send to external webhook
    try {
      await fetch(externalWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'AccidentLawyerFontana/1.0'
        },
        body: JSON.stringify(payload)
      })
    } catch (error) {
      console.error('External webhook error:', error)
    }
  }

  const handleNext = async () => {
    if (validateStep(1)) {
      await sendStepWebhook(1)
      setCurrentStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateStep(2)) {
      setLoading(true)
      await sendStepWebhook(2)
      setSubmitted(true)
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="rounded-3xl bg-gray-900 py-10 px-8 text-center">
        <CheckIcon className="mx-auto h-16 w-16 text-green-500 mb-6" />
        <h2 className="text-3xl font-medium text-green-500 mb-4">Thank You!</h2>
        <p className="text-white/90 mb-8">
          Your information has been submitted successfully. A qualified attorney from our network will contact you within 1 hour using your preferred contact method.
        </p>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-6">
          <strong className="text-green-500 block mb-4">What happens next:</strong>
          <ul className="text-left text-white/90 space-y-2">
            <li>• Attorney matching (within 1 hour)</li>
            <li>• Initial case assessment</li>
            <li>• Free consultation scheduling</li>
            <li>• No fees unless your lawyer wins</li>
          </ul>
        </div>
        <p className="text-white">
          <strong>Need immediate assistance?</strong><br />
          <span className="text-green-500 font-bold">An attorney will contact you within 1 hour</span>
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-gray-900 py-10 px-8">
      <form onSubmit={handleSubmit}>
        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-8">
            <div className={`text-sm font-medium ${currentStep >= 1 ? 'text-cyan-500' : 'text-gray-500'}`}>
              1. Contact Info
            </div>
            <div className={`text-sm font-medium ${currentStep >= 2 ? 'text-cyan-500' : 'text-gray-500'}`}>
              2. Case Details
            </div>
          </div>
        </div>

        {/* Step 1: Contact Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                First Name *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone || ''}
                onChange={handleInputChange}
                placeholder="(555) 555-5555"
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preferred Contact Method
              </label>
              <div className="space-y-2">
                {['email', 'phone', 'text'].map(method => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="preferredContact"
                      value={method}
                      checked={formData.preferredContact === method}
                      onChange={handleInputChange}
                      className="mr-3 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white capitalize">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-lg bg-cyan-500 px-4 py-3 text-base font-semibold text-gray-900 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              Next Step →
            </button>
          </div>
        )}

        {/* Step 2: Case Details */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white mb-6">Case Details</h3>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-300 mb-2">
                Date of Incident *
              </label>
              <input
                type="date"
                id="incidentDate"
                name="incidentDate"
                required
                value={formData.incidentDate || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="accidentType" className="block text-sm font-medium text-gray-300 mb-2">
                Type of Accident *
              </label>
              <select
                id="accidentType"
                name="accidentType"
                required
                value={formData.accidentType || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="">Select accident type</option>
                <option value="motor-vehicle">Motor Vehicle Accident</option>
                <option value="motorcycle">Motorcycle Accident</option>
                <option value="pedestrian">Pedestrian Accident</option>
                <option value="bicycle">Bicycle Accident</option>
                <option value="slip-fall">Slip and Fall</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="injuryDescription" className="block text-sm font-medium text-gray-300 mb-2">
                Describe Your Injuries *
              </label>
              <textarea
                id="injuryDescription"
                name="injuryDescription"
                required
                rows={4}
                value={formData.injuryDescription || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Please describe your injuries in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Medical Treatment Received
              </label>
              <div className="space-y-2">
                {[
                  { value: 'emergency-room', label: 'Emergency Room' },
                  { value: 'hospitalization', label: 'Hospitalization' },
                  { value: 'physical-therapy', label: 'Physical Therapy' },
                  { value: 'ongoing', label: 'Ongoing Treatment' }
                ].map(treatment => (
                  <label key={treatment.value} className="flex items-center">
                    <input
                      type="checkbox"
                      name="medicalTreatment"
                      value={treatment.value}
                      checked={(formData.medicalTreatment || []).includes(treatment.value)}
                      onChange={handleInputChange}
                      className="mr-3 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white">{treatment.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Do you have insurance? *
              </label>
              <div className="space-y-2">
                {['yes', 'no'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="hasInsurance"
                      value={option}
                      required
                      checked={formData.hasInsurance === option}
                      onChange={handleInputChange}
                      className="mr-3 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Was a police report filed? *
              </label>
              <div className="space-y-2">
                {['yes', 'no', 'unsure'].map(option => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      name="policeReport"
                      value={option}
                      required
                      checked={formData.policeReport === option}
                      onChange={handleInputChange}
                      className="mr-3 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white capitalize">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Who was at fault? *
              </label>
              <div className="space-y-2">
                {[
                  { value: 'other', label: 'Other driver/party' },
                  { value: 'me', label: 'I was at fault' },
                  { value: 'mutual', label: 'Mutual fault' },
                  { value: 'unsure', label: 'Not sure' }
                ].map(option => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name="faultAssignment"
                      value={option.value}
                      required
                      checked={formData.faultAssignment === option.value}
                      onChange={handleInputChange}
                      className="mr-3 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-white">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-300 mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                rows={3}
                value={formData.additionalDetails || ''}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="Any additional information that might help your case..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="flex-1 rounded-lg border border-gray-600 px-4 py-3 text-base font-semibold text-gray-300 hover:bg-gray-800 focus:outline-none"
              >
                ← Previous
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-cyan-500 px-4 py-3 text-base font-semibold text-gray-900 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Case'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}