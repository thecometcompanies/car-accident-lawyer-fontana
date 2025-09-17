/**
 * Simple Blog Test - Works without Redis/environment setup
 * Just tests the AI generation and saves to file
 */

import { NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import { join } from 'path'

export async function GET() {
  try {
    console.log('🧪 Testing simple blog generation...');

    // Check if we have Google AI key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({
        success: false,
        error: 'GEMINI_API_KEY not set',
        message: 'Please set GEMINI_API_KEY environment variable in Vercel dashboard',
        instructions: [
          '1. Go to https://aistudio.google.com/app/apikey',
          '2. Create API key',
          '3. Add GEMINI_API_KEY to Vercel environment variables',
          '4. Redeploy the application'
        ]
      }, { status: 500 });
    }

    // Import Google AI
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Write a blog post about car accidents in Fontana, California.

Requirements:
- 800-1000 words
- SEO optimized for "fontana car accident lawyer"
- Include local Fontana references
- Professional but conversational tone
- Include FAQ section

Format as JSON:
{
  "title": "Blog post title",
  "slug": "url-friendly-slug",
  "excerpt": "Brief description",
  "content": "HTML content with h2, h3, p tags",
  "keywords": ["fontana car accident lawyer", "personal injury"],
  "faq": [{"question": "Question?", "answer": "Answer"}],
  "publishDate": "${new Date().toISOString()}",
  "author": "Fontana Legal Team"
}`;

    console.log('📝 Generating content with Google AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    const blogPost = JSON.parse(jsonMatch[0]);
    
    // Create a simple file storage in /tmp for testing
    const filePath = `/tmp/test-blog-${Date.now()}.json`;
    await writeFile(filePath, JSON.stringify(blogPost, null, 2));
    
    console.log('✅ Blog post generated successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Simple blog test completed successfully!',
      data: {
        title: blogPost.title,
        slug: blogPost.slug,
        excerpt: blogPost.excerpt,
        publishDate: blogPost.publishDate,
        wordCount: blogPost.content.length,
        faqCount: blogPost.faq?.length || 0
      },
      storage: {
        method: 'file',
        location: filePath
      },
      next_steps: [
        'Set up Redis environment variables for full functionality',
        'Configure CRON_SECRET for automated daily posts',
        'Test the full cron job endpoint'
      ],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Simple blog test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}