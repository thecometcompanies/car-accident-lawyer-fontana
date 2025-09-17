/**
 * Force Blog Generation - NO AUTH for testing
 * This will help us test if the blog generation works at all
 */

import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('🧪 FORCE: Starting blog generation test...');
    
    // Import dependencies
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const { BlogStorage } = await import('../../../../lib/redis.js');
    
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not set');
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const topics = [
      'What to Do Immediately After a Car Accident in Fontana',
      'Understanding California Car Insurance Laws', 
      'Common Causes of Car Accidents in San Bernardino County'
    ];

    // Select random topic
    const topic = topics[Math.floor(Math.random() * topics.length)];
    
    // Get existing posts for internal linking
    const storage = new BlogStorage();
    let existingPosts = [];
    try {
      existingPosts = await storage.getAllBlogPosts(10);
      console.log(`Found ${existingPosts.length} existing posts for linking`);
    } catch (error) {
      console.log('No existing posts found for linking:', error.message);
    }

    const prompt = `Write a blog post for a Fontana car accident law firm.

TOPIC: "${topic}"

REQUIREMENTS:
- 800-1000 words
- Include Fontana/San Bernardino County local references
- Use conversational, helpful tone
- Include practical actionable advice
- Add call-to-action for free consultation
- Include FAQ section with 3 relevant questions
- Optimize for keywords: "fontana car accident lawyer", "car accident attorney fontana"

FORMAT: Return as JSON:
{
  "title": "SEO-optimized title",
  "slug": "url-friendly-slug",
  "excerpt": "Brief description",
  "content": "Full HTML content",
  "keywords": ["keyword1", "keyword2"],
  "faq": [{"question": "Q", "answer": "A"}],
  "publishDate": "${new Date().toISOString()}",
  "author": "Fontana Car Accident Legal Team"
}`;

    console.log('📝 Generating content with Google AI...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('🔍 Parsing AI response...');
    // Clean and parse JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }
    
    const blogPost = JSON.parse(jsonMatch[0]);
    console.log(`✅ Generated blog post: ${blogPost.title}`);
    
    // Save blog post to storage
    console.log('💾 Saving to storage...');
    await storage.saveBlogPost(blogPost);
    console.log('✅ Saved to storage successfully');
    
    return NextResponse.json({
      success: true,
      message: 'FORCE GENERATION: Blog post created successfully!',
      data: {
        topic: topic,
        title: blogPost.title,
        slug: blogPost.slug,
        url: `https://www.accidentlawyerfontana.com/blog/${blogPost.slug}`,
        publishDate: blogPost.publishDate,
        excerpt: blogPost.excerpt,
        existingPostsCount: existingPosts.length
      },
      next: [
        'Check /api/blog to see if post appears',
        'Check /sitemap.xml to see if it\'s included',
        'Visit the blog URL to see the content'
      ],
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ FORCE GENERATION failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}