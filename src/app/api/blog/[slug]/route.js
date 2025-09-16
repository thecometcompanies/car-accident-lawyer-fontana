import { BlogStorage } from '../../../../../lib/redis.js'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { slug } = params
  
  if (!slug) {
    return NextResponse.json({
      success: false,
      error: 'Missing post slug'
    }, { status: 400 })
  }
  
  try {
    const storage = new BlogStorage()
    const post = await storage.getBlogPost(slug)
    
    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Post not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      post
    })
  } catch (error) {
    console.error('Error loading blog post:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load blog post'
    }, { status: 500 })
  }
}