/**
 * Next.js App Router Cron Function - Daily Blog Post Generation
 * Scheduled to run daily at 5 PM UTC (10 AM PDT)
 */

import { NextResponse } from 'next/server'
import { BlogStorage } from '../../../../../lib/redis.js'

// Import the blog generation logic
async function generateBlogPost() {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const topics = [
    'What to Do Immediately After a Car Accident in Fontana',
    'Understanding California Car Insurance Laws',
    'Common Causes of Car Accidents in San Bernardino County',
    'How to File a Personal Injury Claim in California',
    'When to Hire a Car Accident Lawyer in Fontana',
    'Dealing with Insurance Companies After an Accident',
    'California Comparative Negligence Laws Explained',
    'Motorcycle Accident Safety on Fontana Streets',
    'Truck Accident Liability in Southern California',
    'Pedestrian Rights and Safety in Fontana',
    'Bicycle Accident Laws in California',
    'Uninsured Motorist Coverage in California',
    'Medical Treatment After a Car Accident',
    'Documenting Evidence After an Accident',
    'Understanding Pain and Suffering Damages',
    'Wrongful Death Claims in California',
    'Teen Driver Accidents and Liability',
    'DUI Accident Victims Rights',
    'Ride-share Accident Liability Issues',
    'Construction Zone Accident Prevention'
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
  
  const prompt = `
    Write a comprehensive, SEO-optimized blog post for a Fontana car accident law firm with the following requirements:

    TOPIC: "${topic}"

    REQUIREMENTS:
    - 1500-2000 words
    - Include relevant Fontana/San Bernardino County local information
    - Use conversational, helpful tone (not overly legal)
    - Include practical actionable advice
    - Add call-to-action for free consultation
    - Include FAQ section with 5 relevant questions
    - Optimize for keywords: "fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"
    - Include local landmarks/roads when relevant (Sierra Avenue, Foothill Boulevard, I-10, Kaiser Permanente Fontana Medical Center, etc.)
    
    INTERNAL LINKING REQUIREMENTS:
    - Include 3-5 internal links naturally within the content
    - Use descriptive anchor text (not "click here")
    - Link to related topics when mentioned
    ${existingPostsList.length > 0 ? `
    Available blog posts to link to:
    ${existingPostsList.map(post => `- ${post.title} (${post.url})`).join('\n')}
    ` : '- Note: No existing posts yet, include placeholder links like [Related: Understanding California Car Accident Laws]'}

    STRUCTURE:
    1. Compelling headline
    2. Introduction (hook + problem)
    3. Main content sections (3-4 sections with internal links)
    4. Related Articles section (list 3 related posts)
    5. FAQ section
    6. Call-to-action conclusion

    FORMAT: Return as JSON with this structure:
    {
      "title": "SEO-optimized title",
      "slug": "url-friendly-slug",
      "excerpt": "Brief 160-character description",
      "content": "Full HTML content with internal links",
      "keywords": ["keyword1", "keyword2"],
      "faq": [{"question": "Q", "answer": "A"}],
      "relatedPosts": ["slug1", "slug2", "slug3"],
      "publishDate": "${new Date().toISOString()}",
      "author": "Fontana Car Accident Legal Team"
    }
  `;

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

export async function GET(request) {
  // Verify this is a cron request (security)
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    console.log('🤖 Starting daily blog generation...');
    
    // Generate new blog post
    const newPost = await generateBlogPost();
    
    console.log('✅ Daily blog generation completed successfully');
    
    return NextResponse.json({
      success: true,
      message: 'Blog post generated successfully',
      data: {
        newPost: {
          title: newPost.title,
          slug: newPost.slug,
          publishDate: newPost.publishDate
        }
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Daily blog generation failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

// Also allow POST for manual testing
export async function POST(request) {
  return GET(request);
}