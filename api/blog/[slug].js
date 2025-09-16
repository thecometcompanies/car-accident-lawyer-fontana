/**
 * Individual Blog Post API - Returns a specific blog post by slug from Redis
 */

import { BlogStorage } from '../../lib/redis.js';

export default async function handler(req, res) {
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).json({ error: "Slug parameter is required" });
  }
  
  try {
    const storage = new BlogStorage();
    const post = await storage.getBlogPost(slug);
    
    if (!post) {
      return res.status(404).json({ 
        error: "Blog post not found",
        slug: slug 
      });
    }
    
    res.status(200).json({
      success: true,
      post: {
        ...post,
        slug: slug,
        url: `/blog/${slug}`
      },
      storage: "redis"
    });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    
    res.status(500).json({
      success: false,
      error: "Failed to fetch blog post",
      slug: slug
    });
  }
}