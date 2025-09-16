export default async function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const {
            step,
            timestamp,
            leadData,
            metadata
        } = req.body;
        
        // Validate required fields
        if (!leadData || !leadData.email || !leadData.phone) {
            return res.status(400).json({ error: 'Missing required lead data' });
        }
        
        // Log the lead capture (in production, send to CRM/notification system)
        console.log('=== STEP 1 LEAD CAPTURED ===');
        console.log('Timestamp:', timestamp);
        console.log('Email:', leadData.email);
        console.log('Phone:', leadData.phone);
        console.log('Preferred Contact:', leadData.preferredContact);
        console.log('Session ID:', metadata?.sessionId);
        console.log('IP Address:', metadata?.ipAddress);
        console.log('User Agent:', metadata?.userAgent);
        console.log('Referrer:', metadata?.referrer);
        console.log('============================');
        
        // In production, you would:
        // 1. Send to CRM system (Salesforce, HubSpot, etc.)
        // 2. Send immediate notification to legal team
        // 3. Store in database for follow-up tracking
        // 4. Send confirmation email to lead
        
        // Example CRM integration (uncomment and configure for your CRM):
        /*
        await sendToCRM({
            type: 'immediate_lead',
            contact: {
                email: leadData.email,
                phone: leadData.phone,
                preferredContact: leadData.preferredContact
            },
            source: 'website_step1',
            urgency: 'high',
            metadata: metadata
        });
        
        await sendNotificationToTeam({
            message: `New lead captured: ${leadData.email} - ${leadData.phone}`,
            priority: 'immediate',
            source: 'fontana_website'
        });
        */
        
        // Simulate CRM processing delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return res.status(200).json({
            success: true,
            message: 'Lead captured successfully',
            leadId: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        });
        
    } catch (error) {
        console.error('Step 1 webhook error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process lead capture'
        });
    }
}