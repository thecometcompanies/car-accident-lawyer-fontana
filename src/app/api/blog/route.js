import { BlogStorage } from '../../../../lib/redis.js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const storage = new BlogStorage()
    const posts = await storage.getAllBlogPosts()
    
    return NextResponse.json({
      success: true,
      posts: posts || [],
      count: posts ? posts.length : 0
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog posts',
      posts: [],
      count: 0
    }, { status: 500 })
  }
}