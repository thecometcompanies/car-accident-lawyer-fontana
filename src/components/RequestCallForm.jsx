'use client'

import { useState } from 'react'
import { CheckIcon } from '@/components/CheckIcon'

export default function RequestCallForm({ compact = false }) {
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
    const { name, value } = e.target
    
    if (name === 'phone') {
      setFormData(prev => ({ ...prev, [name]: formatPhoneNumber(value) }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const validateForm = () => {
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

  const sendWebhook = async () => {
    const webhookUrl = '/api/webhooks/step1'
    const externalWebhookUrl = 'https://n8n-dtla-c914de1950b9.herokuapp.com/webhook/12b6de6e-7897-4348-94e5-179ab56c89e2'
    
    const payload = {
      firstName: formData.firstName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      preferredContact: formData.preferredContact || "phone",
      requestType: "callback"
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setLoading(true)
      await sendWebhook()
      setSubmitted(true)
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className={`rounded-2xl ${compact ? 'bg-white p-6 shadow-sm border' : 'bg-gray-900 py-10 px-8'} text-center`}>
        <CheckIcon className={`mx-auto h-12 w-12 ${compact ? 'text-green-600' : 'text-green-500'} mb-4`} />
        <h3 className={`text-2xl font-medium ${compact ? 'text-slate-900' : 'text-green-500'} mb-4`}>Request Received!</h3>
        <p className={`${compact ? 'text-slate-600' : 'text-white/90'} mb-6`}>
          Thank you! An attorney from our network will call you within 1 hour.
        </p>
        <div className={`${compact ? 'bg-green-50 border border-green-200' : 'bg-green-500/10 border border-green-500/30'} rounded-xl p-4`}>
          <p className={`${compact ? 'text-slate-700' : 'text-white/90'} text-sm`}>
            <strong>What happens next:</strong> A qualified attorney will review your information and call you to discuss your case options.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-2xl ${compact ? 'bg-white p-6 shadow-sm border' : 'bg-gray-900 py-10 px-8'}`}>
      <form onSubmit={handleSubmit}>
        <h3 className={`text-xl font-semibold ${compact ? 'text-slate-900' : 'text-white'} mb-6 text-center`}>
          Request a Call from an Attorney
        </h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className={`block text-sm font-medium ${compact ? 'text-slate-700' : 'text-gray-300'} mb-2`}>
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              required
              value={formData.firstName || ''}
              onChange={handleInputChange}
              className={`w-full rounded-lg border ${compact ? 'border-gray-300 bg-white text-slate-900 focus:border-red-500' : 'border-gray-700 bg-gray-800 text-white focus:border-cyan-500'} px-4 py-3 focus:outline-none`}
            />
          </div>

          <div>
            <label htmlFor="email" className={`block text-sm font-medium ${compact ? 'text-slate-700' : 'text-gray-300'} mb-2`}>
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email || ''}
              onChange={handleInputChange}
              className={`w-full rounded-lg border ${compact ? 'border-gray-300 bg-white text-slate-900 focus:border-red-500' : 'border-gray-700 bg-gray-800 text-white focus:border-cyan-500'} px-4 py-3 focus:outline-none`}
            />
          </div>

          <div>
            <label htmlFor="phone" className={`block text-sm font-medium ${compact ? 'text-slate-700' : 'text-gray-300'} mb-2`}>
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
              className={`w-full rounded-lg border ${compact ? 'border-gray-300 bg-white text-slate-900 focus:border-red-500' : 'border-gray-700 bg-gray-800 text-white focus:border-cyan-500'} px-4 py-3 focus:outline-none`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium ${compact ? 'text-slate-700' : 'text-gray-300'} mb-2`}>
              Best Time to Call
            </label>
            <div className="space-y-2">
              {['Morning', 'Afternoon', 'Evening', 'Anytime'].map(time => (
                <label key={time} className="flex items-center">
                  <input
                    type="radio"
                    name="preferredContact"
                    value={time.toLowerCase()}
                    checked={formData.preferredContact === time.toLowerCase()}
                    onChange={handleInputChange}
                    className={`mr-3 ${compact ? 'text-red-600 focus:ring-red-500' : 'text-cyan-500 focus:ring-cyan-500'}`}
                  />
                  <span className={compact ? 'text-slate-700' : 'text-white'}>{time}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg ${compact ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-cyan-500 hover:bg-cyan-400 focus:ring-cyan-500'} px-4 py-3 text-base font-semibold ${compact ? 'text-white' : 'text-gray-900'} focus:outline-none focus:ring-2 disabled:opacity-50`}
          >
            {loading ? 'Sending Request...' : 'Request Call Now'}
          </button>
        </div>
      </form>
    </div>
  )
}