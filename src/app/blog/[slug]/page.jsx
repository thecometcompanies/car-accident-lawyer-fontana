import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import BlogPost from '@/components/BlogPost'

async function getBlogPost(slug) {
  try {
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : 'http://localhost:3000'
    
    const response = await fetch(`${baseUrl}/api/blog/single-post?slug=${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      return null
    }
    
    // The API returns HTML, but we need to extract the post data
    // For now, we'll create a minimal post object
    return {
      slug,
      title: `Blog Post: ${slug}`,
      content: await response.text(),
      publishDate: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return null
  }
}

export async function generateMetadata({ params }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found - Fontana Car Accident Lawyer',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} | Fontana Car Accident Lawyer`,
    description: post.excerpt || post.title,
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <NavBar />
      <BlogPost post={post} />
      <Footer />
    </>
  )
}