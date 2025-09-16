/**
 * Redis client configuration for Upstash
 */

import { Redis } from '@upstash/redis';

// Initialize Redis client
let redis;

export function getRedisClient() {
  if (!redis) {
    // Check for Upstash environment variables
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;
    
    if (!url || !token) {
      console.warn('Redis environment variables not found. Using fallback mode.');
      return null;
    }
    
    redis = new Redis({
      url: url,
      token: token,
    });
  }
  
  return redis;
}

// Blog post storage functions
export class BlogStorage {
  constructor() {
    this.redis = getRedisClient();
    this.keyPrefix = 'blog:';
  }

  async saveBlogPost(post) {
    if (!this.redis) {
      console.log('Redis not available, storing in memory only');
      return post;
    }

    try {
      const postKey = `${this.keyPrefix}post:${post.slug}`;
      const listKey = `${this.keyPrefix}posts`;
      
      // Save the full post
      await this.redis.set(postKey, JSON.stringify(post));
      
      // Add to the posts list (newest first)
      await this.redis.lpush(listKey, post.slug);
      
      // Keep only last 100 posts in the list
      await this.redis.ltrim(listKey, 0, 99);
      
      console.log(`📊 Blog post saved to Redis: ${post.title}`);
      return post;
    } catch (error) {
      console.error('Error saving to Redis:', error);
      return post;
    }
  }

  async getBlogPosts(limit = 10) {
    if (!this.redis) {
      return this.getFallbackPosts();
    }

    try {
      const listKey = `${this.keyPrefix}posts`;
      
      // Get list of post slugs (newest first)
      const slugs = await this.redis.lrange(listKey, 0, limit - 1);
      
      if (!slugs || slugs.length === 0) {
        return this.getFallbackPosts();
      }
      
      // Get full post data for each slug
      const posts = [];
      for (const slug of slugs) {
        const postKey = `${this.keyPrefix}post:${slug}`;
        const postData = await this.redis.get(postKey);
        if (postData) {
          posts.push(JSON.parse(postData));
        }
      }
      
      return posts;
    } catch (error) {
      console.error('Error reading from Redis:', error);
      return this.getFallbackPosts();
    }
  }

  async getBlogPost(slug) {
    if (!this.redis) {
      return this.getFallbackPost(slug);
    }

    try {
      const postKey = `${this.keyPrefix}post:${slug}`;
      const postData = await this.redis.get(postKey);
      
      if (postData) {
        return JSON.parse(postData);
      }
      
      return this.getFallbackPost(slug);
    } catch (error) {
      console.error('Error reading post from Redis:', error);
      return this.getFallbackPost(slug);
    }
  }

  async getStats() {
    if (!this.redis) {
      return { totalPosts: 2, latestPost: null, source: 'fallback' };
    }

    try {
      const listKey = `${this.keyPrefix}posts`;
      const totalPosts = await this.redis.llen(listKey);
      
      let latestPost = null;
      if (totalPosts > 0) {
        const latestSlug = await this.redis.lindex(listKey, 0);
        if (latestSlug) {
          latestPost = await this.getBlogPost(latestSlug);
        }
      }
      
      return {
        totalPosts,
        latestPost,
        source: 'redis'
      };
    } catch (error) {
      console.error('Error getting stats from Redis:', error);
      return { totalPosts: 0, latestPost: null, source: 'error' };
    }
  }

  // Fallback data when Redis is not available
  getFallbackPosts() {
    return [
      {
        id: 1,
        title: "Navigating California's Comparative Negligence Laws After a Fontana Car Accident",
        slug: "comparative-negligence-fontana-car-accident",
        excerpt: "Were you injured in a car accident in Fontana or San Bernardino County? Understanding California's comparative negligence laws is crucial to protecting your rights.",
        publishDate: "2025-09-16T06:03:45.119Z",
        url: "/blog/comparative-negligence-fontana-car-accident",
        keywords: ["fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"],
        status: "published"
      },
      {
        id: 2,
        title: "Fontana Car Accident? What to Do Immediately After the Crash",
        slug: "fontana-car-accident-immediate-steps", 
        excerpt: "Were you in a car accident in Fontana? Knowing what to do immediately after a crash can protect your rights and your health. Get expert legal advice.",
        publishDate: "2025-09-16T06:07:19.873Z",
        url: "/blog/fontana-car-accident-immediate-steps",
        keywords: ["fontana car accident lawyer", "car accident attorney fontana", "car accident fontana"],
        status: "published"
      }
    ];
  }

  getFallbackPost(slug) {
    const posts = this.getFallbackPosts();
    return posts.find(post => post.slug === slug) || null;
  }
}