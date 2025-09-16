/**
 * Vercel Cron Function - Daily Blog Post Generation
 * Scheduled to run daily at 9 AM PST
 */

import BlogPostGenerator from '../blog-automation/generate-blog.js';

export default async function handler(req, res) {
  // Verify this is a cron request (security)
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    console.log('🤖 Starting daily blog generation...');
    
    const generator = new BlogPostGenerator();
    
    // Generate new blog post
    const newPost = await generator.generateBlogPost();
    
    // Get database stats
    const stats = await generator.getDatabaseStats();
    
    console.log('✅ Daily blog generation completed successfully');
    
    return res.status(200).json({
      success: true,
      message: 'Blog post generated successfully',
      data: {
        newPost: {
          title: newPost.title,
          slug: newPost.slug,
          url: newPost.url,
          publishDate: newPost.publishDate
        },
        stats
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Daily blog generation failed:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}