import { BlogStorage } from '../../../../lib/redis.js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const storage = new BlogStorage()
    const posts = await storage.getAllBlogPosts(20)
    
    return NextResponse.json({
      success: true,
      totalPosts: posts.length,
      posts: posts,
      message: "Blog system is active and generating daily content",
      storage: "redis"
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    
    return NextResponse.json({
      success: false,
      error: "Failed to fetch blog posts",
      message: "Please try again later"
    }, { status: 500 })
  }
}