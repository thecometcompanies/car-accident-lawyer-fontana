import { BlogStorage } from '../../../../../lib/redis.js'
import { NextResponse } from 'next/server'

export async function GET(request, { params }) {
  const { slug } = params
  
  if (!slug) {
    return NextResponse.json({ 
      error: "Slug parameter is required" 
    }, { status: 400 })
  }
  
  try {
    const storage = new BlogStorage()
    const post = await storage.getBlogPost(slug)
    
    if (!post) {
      return NextResponse.json({ 
        error: "Blog post not found",
        slug: slug 
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      post: {
        ...post,
        slug: slug,
        url: `/blog/${slug}`
      },
      storage: "redis"
    })
  } catch (error) {
    console.error('Error fetching blog post:', error)
    
    return NextResponse.json({
      success: false,
      error: "Failed to fetch blog post",
      slug: slug
    }, { status: 500 })
  }
}