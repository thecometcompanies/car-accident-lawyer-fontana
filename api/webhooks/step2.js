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
            completeLead,
            caseScore,
            priority,
            metadata
        } = req.body;
        
        // Validate required fields
        if (!completeLead || !completeLead.email || !completeLead.fullName) {
            return res.status(400).json({ error: 'Missing required case data' });
        }
        
        // Log the complete intake (in production, send to case management system)
        console.log('=== STEP 2 COMPLETE INTAKE ===');
        console.log('Timestamp:', timestamp);
        console.log('Full Name:', completeLead.fullName);
        console.log('Email:', completeLead.email);
        console.log('Phone:', completeLead.phone);
        console.log('Incident Date:', completeLead.incidentDate);
        console.log('Accident Type:', completeLead.accidentType);
        console.log('Injury Description:', completeLead.injuryDescription);
        console.log('Medical Treatment:', completeLead.medicalTreatment);
        console.log('Insurance:', completeLead.hasInsurance);
        console.log('Police Report:', completeLead.policeReport);
        console.log('Fault Assignment:', completeLead.faultAssignment);
        console.log('Case Score:', caseScore);
        console.log('Priority:', priority);
        console.log('Session ID:', metadata?.sessionId);
        console.log('============================');
        
        // Case qualification logic
        const qualificationResult = qualifyCase(completeLead, caseScore, priority);
        
        // In production, you would:
        // 1. Save complete case data to database
        // 2. Create case in case management system
        // 3. Assign to appropriate attorney based on case type and priority
        // 4. Schedule follow-up based on case score
        // 5. Send detailed case summary to legal team
        // 6. Send confirmation email to client with next steps
        
        // Example integrations (uncomment and configure for your systems):
        /*
        // Save to case management system
        const caseId = await createCase({
            client: {
                name: completeLead.fullName,
                email: completeLead.email,
                phone: completeLead.phone,
                preferredContact: completeLead.preferredContact
            },
            incident: {
                date: completeLead.incidentDate,
                type: completeLead.accidentType,
                description: completeLead.injuryDescription,
                faultAssignment: completeLead.faultAssignment
            },
            medical: {
                treatments: completeLead.medicalTreatment,
                hasInsurance: completeLead.hasInsurance
            },
            legal: {
                policeReport: completeLead.policeReport,
                additionalDetails: completeLead.additionalDetails
            },
            qualification: {
                score: caseScore,
                priority: priority,
                recommendation: qualificationResult.recommendation
            }
        });
        
        // Assign to attorney
        await assignToAttorney({
            caseId: caseId,
            priority: priority,
            accidentType: completeLead.accidentType,
            location: 'fontana'
        });
        
        // Schedule follow-up
        await scheduleFollowUp({
            caseId: caseId,
            clientEmail: completeLead.email,
            clientPhone: completeLead.phone,
            priority: priority,
            preferredContact: completeLead.preferredContact
        });
        
        // Send confirmation email
        await sendClientConfirmation({
            to: completeLead.email,
            name: completeLead.fullName,
            caseId: caseId,
            nextSteps: qualificationResult.nextSteps
        });
        */
        
        return res.status(200).json({
            success: true,
            message: 'Case intake completed successfully',
            caseId: `case_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            qualification: qualificationResult,
            priority: priority,
            nextSteps: qualificationResult.nextSteps
        });
        
    } catch (error) {
        console.error('Step 2 webhook error:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: 'Failed to process case intake'
        });
    }
}

function qualifyCase(leadData, caseScore, priority) {
    const result = {
        qualified: false,
        recommendation: '',
        nextSteps: [],
        urgency: 'normal'
    };
    
    // Basic qualification criteria
    if (caseScore >= 30) {
        result.qualified = true;
    }
    
    // High priority cases
    if (priority === 'high' || caseScore >= 70) {
        result.recommendation = 'Immediate consultation recommended';
        result.urgency = 'urgent';
        result.nextSteps = [
            'Attorney will call within 1 hour',
            'Initial case assessment',
            'Document collection guidance',
            'Free consultation scheduling'
        ];
    }
    // Medium priority cases
    else if (priority === 'medium' || caseScore >= 40) {
        result.recommendation = 'Strong case potential - consultation recommended';
        result.urgency = 'high';
        result.nextSteps = [
            'Attorney will call within 2 hours',
            'Case review and assessment',
            'Free consultation scheduling',
            'Initial documentation review'
        ];
    }
    // Lower score cases
    else if (caseScore >= 20) {
        result.recommendation = 'Case has potential - consultation advised';
        result.urgency = 'normal';
        result.nextSteps = [
            'Paralegal will call within 4 hours',
            'Initial case screening',
            'Documentation collection',
            'Consultation scheduling if qualified'
        ];
    }
    // Very low score cases
    else {
        result.recommendation = 'Case requires detailed review';
        result.urgency = 'low';
        result.nextSteps = [
            'Case review within 24 hours',
            'Initial assessment call',
            'Determine case viability',
            'Referral if outside our practice area'
        ];
    }
    
    // Special handling for certain accident types
    if (leadData.accidentType === 'motorcycle') {
        result.urgency = 'urgent';
        result.nextSteps.unshift('Motorcycle accident specialist assigned');
    }
    
    // Special handling for recent incidents
    const incidentDate = new Date(leadData.incidentDate);
    const daysSinceIncident = Math.floor((Date.now() - incidentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSinceIncident <= 7) {
        result.urgency = 'urgent';
        result.nextSteps.unshift('Recent incident - time-sensitive evidence collection');
    }
    
    return result;
}