import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    
    // Log the webhook data
    console.log('Step 1 webhook received:', body)
    
    // In a real implementation, you might:
    // - Save to database
    // - Send to CRM
    // - Trigger email notifications
    // - etc.
    
    return NextResponse.json({ 
      success: true, 
      message: 'Step 1 data received successfully' 
    })
  } catch (error) {
    console.error('Step 1 webhook error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}