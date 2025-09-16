/**
 * Blog Status API - Monitor blog automation system
 * GET /api/blog-status - Returns blog generation statistics
 */

import BlogPostGenerator from './blog-automation/generate-blog.js';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  try {
    const generator = new BlogPostGenerator();
    const stats = await generator.getDatabaseStats();
    
    // Check if blog posts directory exists
    const blogDir = path.join(process.cwd(), 'blog');
    let filesCount = 0;
    
    try {
      const files = await fs.readdir(blogDir);
      filesCount = files.filter(file => file.endsWith('.json')).length;
    } catch (error) {
      // Directory doesn't exist yet
    }
    
    const response = {
      status: 'active',
      database: stats,
      files: {
        totalBlogFiles: filesCount,
        blogDirectory: blogDir
      },
      lastChecked: new Date().toISOString(),
      system: {
        cronEnabled: !!process.env.CRON_SECRET,
        aiEnabled: !!process.env.GEMINI_API_KEY,
        environment: process.env.NODE_ENV || 'development'
      }
    };
    
    res.status(200).json(response);
    
  } catch (error) {
    console.error('Error checking blog status:', error);
    
    res.status(500).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}