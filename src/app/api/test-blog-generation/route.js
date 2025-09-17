/**
 * Manual Blog Generation Test - No auth required
 */

import { NextResponse } from 'next/server'
import { BlogStorage } from '../../../../lib/redis.js'

// Import the blog generation logic (same as cron job)
async function generateBlogPost() {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY environment variable is not set');
  }
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const topics = [
    'What to Do Immediately After a Car Accident in Fontana',
    'Understanding California Car Insurance Laws',
    'Common Causes of Car Accidents in San Bernardino County',
    'How to File a Personal Injury Claim in California',
    'When to Hire a Car Accident Lawyer in Fontana'
  ];

  // Select random topic
  const topic = topics[Math.floor(Math.random() * topics.length)];
  
  // Get existing posts for internal linking
  const storage = new BlogStorage();
  let existingPosts = [];
  try {
    existingPosts = await storage.getAllBlogPosts(10);
  } catch (error) {
    console.log('No existing posts found for linking');
  }

  const existingPostsList = existingPosts.map(post => ({
    title: post.title,
    slug: post.slug,
    url: `https://www.accidentlawyerfontana.com/blog/${post.slug}`
  }));
  
  const prompt = `Write a comprehensive, SEO-optimized blog post for a Fontana car accident law firm.

TOPIC: "${topic}"

REQUIREMENTS:
- 1000-1500 words
- Include Fontana/San Bernardino County local references
- Use conversational, helpful tone
- Include practical actionable advice
- Add call-to-action for free consultation
- Include FAQ section with 3 relevant questions
- Optimize for keywords: "fontana car accident lawyer", "car accident attorney fontana"
- Include local landmarks when relevant (Sierra Avenue, Foothill Boulevard, I-10)

${existingPostsList.length > 0 ? `
INTERNAL LINKING - Available posts to link to:
${existingPostsList.map(post => `- ${post.title} (${post.url})`).join('\n')}
Include 2-3 natural internal links in the content.
` : 'Note: No existing posts yet for internal linking.'}

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

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Clean and parse JSON response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON found in AI response');
  }
  
  const blogPost = JSON.parse(jsonMatch[0]);
  
  // Save blog post to Redis
  await storage.saveBlogPost(blogPost);
  
  console.log(`✅ Blog post generated: ${blogPost.title}`);
  return blogPost;
}

export async function GET() {
  try {
    console.log('🧪 Testing blog generation...');
    
    const newPost = await generateBlogPost();
    
    console.log('✅ Test blog generation completed successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Test blog post generated successfully',
      data: {
        newPost: {
          title: newPost.title,
          slug: newPost.slug,
          url: `https://www.accidentlawyerfontana.com/blog/${newPost.slug}`,
          publishDate: newPost.publishDate,
          excerpt: newPost.excerpt
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Test blog generation failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST() {
  return GET();
}