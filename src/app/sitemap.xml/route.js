import { BlogStorage } from '../../../lib/redis.js'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const storage = new BlogStorage()
    const posts = await storage.getAllBlogPosts(100) // Get all posts for sitemap
    const baseUrl = 'https://www.accidentlawyerfontana.com'
    
    // Generate sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    
    <!-- Homepage -->
    <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
        <mobile:mobile/>
    </url>
    
    <!-- Blog Index -->
    <url>
        <loc>${baseUrl}/blog</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
        <mobile:mobile/>
    </url>
    
    <!-- Contact Form Section -->
    <url>
        <loc>${baseUrl}/#contact-form</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.9</priority>
        <mobile:mobile/>
    </url>
    
    <!-- FAQ Section -->
    <url>
        <loc>${baseUrl}/#faq</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        <mobile:mobile/>
    </url>
    
    <!-- Legal Services Section -->
    <url>
        <loc>${baseUrl}/#legal-services</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
        <mobile:mobile/>
    </url>${posts.map(post => `
    
    <!-- Blog Post: ${post.title} -->
    <url>
        <loc>${baseUrl}/blog/${post.slug}</loc>
        <lastmod>${post.publishedAt || new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        <mobile:mobile/>
    </url>`).join('')}

</urlset>`

    return new NextResponse(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400'
      }
    })
    
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback to basic sitemap if blog posts can't be fetched
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://www.accidentlawyerfontana.com/</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://www.accidentlawyerfontana.com/blog</loc>
        <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
    </url>
</urlset>`

    return new NextResponse(basicSitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=600'
      }
    })
  }
}