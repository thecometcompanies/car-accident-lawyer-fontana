/**
 * Blog Listing API - Shows all blog posts from Redis storage
 */

import { BlogStorage } from '../../lib/redis.js';

export default async function handler(req, res) {
  try {
    const storage = new BlogStorage();
    const posts = await storage.getBlogPosts(20); // Get latest 20 posts
    
    // Return blog listing
    res.status(200).json({
      success: true,
      totalPosts: posts.length,
      posts: posts,
      message: "Blog system is active and generating daily content",
      storage: "redis"
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog posts",
      message: "Please try again later"
    });
  }
}