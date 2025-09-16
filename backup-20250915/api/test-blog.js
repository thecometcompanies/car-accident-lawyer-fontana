/**
 * Test Blog Generation - Simple endpoint to test blog system
 */

import BlogPostGenerator from './blog-automation/generate-blog.js';

export default async function handler(req, res) {
  // Allow both GET and POST
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('🧪 Testing blog generation...');
    
    const generator = new BlogPostGenerator();
    
    // Generate test blog post
    const newPost = await generator.generateBlogPost();
    
    // Get updated stats
    const stats = await generator.getDatabaseStats();
    
    console.log('✅ Test blog generation completed successfully');
    
    return res.status(200).json({
      success: true,
      message: 'Test blog post generated successfully',
      data: {
        newPost: {
          title: newPost.title,
          slug: newPost.slug,
          url: newPost.url,
          publishDate: newPost.publishDate,
          excerpt: newPost.excerpt
        },
        stats,
        testMode: true
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Test blog generation failed:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      timestamp: new Date().toISOString()
    });
  }
}