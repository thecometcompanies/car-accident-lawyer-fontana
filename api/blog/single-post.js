/**
 * Single Blog Post HTML Page - Returns individual blog post as HTML
 */

import { BlogStorage } from '../../lib/redis.js';

export default async function handler(req, res) {
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).send('<h1>400 - Missing Post Slug</h1>');
  }
  
  try {
    const storage = new BlogStorage();
    const post = await storage.getBlogPost(slug);
    
    if (!post) {
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post Not Found | Fontana Car Accident Lawyers</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; text-align: center;">
    <h1>🔍 Blog Post Not Found</h1>
    <p>The blog post "${slug}" doesn't exist yet.</p>
    <p><a href="/blog" style="color: #007cba; text-decoration: none;">← Back to Blog</a></p>
    <div style="margin-top: 40px; padding: 20px; background: #007cba; color: white; border-radius: 8px;">
        <h2>Need Legal Help?</h2>
        <p>Our experienced Fontana car accident lawyers are here to help.</p>
        <a href="/" style="color: white; text-decoration: none; font-weight: bold;">Get Free Consultation →</a>
    </div>
</body>
</html>`;
      return res.status(404).send(html);
    }
    
    // Generate HTML for the blog post
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Fontana Car Accident Lawyers</title>
    <meta name="description" content="${post.excerpt || post.title}">
    <meta name="keywords" content="${post.keywords ? post.keywords.join(', ') : 'fontana car accident lawyer'}">
    <link rel="canonical" href="https://car-accident-lawyer-fontana.vercel.app/blog/${slug}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt || post.title}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://car-accident-lawyer-fontana.vercel.app/blog/${slug}">
    
    <!-- Schema.org Article -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${post.title}",
      "description": "${post.excerpt || post.title}",
      "author": {
        "@type": "Organization",
        "name": "Fontana Car Accident Legal Team"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Fontana Car Accident Lawyers"
      },
      "datePublished": "${post.publishDate}",
      "dateModified": "${post.publishDate}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://car-accident-lawyer-fontana.vercel.app/blog/${slug}"
      }
    }
    </script>
    
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .article-header {
            background: white;
            padding: 40px;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .article-header h1 {
            color: #1a1a1a;
            margin-bottom: 15px;
            font-size: 28px;
        }
        .article-meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .article-content {
            background: white;
            padding: 40px;
            border-radius: 8px;
            margin-bottom: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .article-content h2 {
            color: #007cba;
            margin-top: 30px;
            margin-bottom: 15px;
        }
        .article-content h3 {
            color: #333;
            margin-top: 25px;
            margin-bottom: 10px;
        }
        .article-content p {
            margin-bottom: 15px;
        }
        .article-content ul, .article-content ol {
            margin-bottom: 15px;
            padding-left: 25px;
        }
        .keywords {
            background: #f0f9ff;
            padding: 15px;
            border-radius: 5px;
            margin: 20px 0;
            border-left: 4px solid #007cba;
        }
        .keywords strong {
            color: #007cba;
        }
        .cta-section {
            background: #007cba;
            color: white;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
        }
        .cta-section h2 {
            margin-top: 0;
            color: white;
        }
        .cta-button {
            display: inline-block;
            background: white;
            color: #007cba;
            padding: 12px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            margin: 10px;
        }
        .cta-button:hover {
            background: #f0f0f0;
        }
        .nav-links {
            text-align: center;
            margin: 20px 0;
        }
        .nav-links a {
            color: #007cba;
            text-decoration: none;
            margin: 0 15px;
        }
    </style>
</head>
<body>
    <div class="nav-links">
        <a href="/">🏠 Home</a>
        <a href="/blog">📰 Blog</a>
    </div>
    
    <article class="article-header">
        <h1>${post.title}</h1>
        <div class="article-meta">
            📅 Published: ${new Date(post.publishDate).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            })} | 👨‍💼 By Fontana Car Accident Legal Team
        </div>
        ${post.keywords ? `
        <div class="keywords">
            <strong>🎯 SEO Keywords:</strong> ${post.keywords.join(', ')}
        </div>
        ` : ''}
    </article>
    
    <div class="article-content">
        ${post.content || `
            <h2>About ${post.title}</h2>
            <p>${post.excerpt}</p>
            <p>This blog post is being generated by our AI content system. The full content will be available shortly as our system continues to create comprehensive legal resources for Fontana car accident victims.</p>
            
            <h3>Key Points Covered:</h3>
            <ul>
                <li>Legal rights for Fontana car accident victims</li>
                <li>Insurance claim procedures in San Bernardino County</li>
                <li>When to contact a car accident attorney</li>
                <li>Steps to protect your legal interests</li>
            </ul>
        `}
    </div>
    
    <div class="cta-section">
        <h2>🚨 Injured in a Car Accident?</h2>
        <p>Don't wait! Get the legal help you deserve from experienced Fontana car accident attorneys.</p>
        <a href="/" class="cta-button">📞 Get Free Consultation</a>
        <a href="/blog" class="cta-button">📰 Read More Articles</a>
    </div>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
    
  } catch (error) {
    console.error('Error loading blog post:', error);
    
    const errorHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error Loading Post | Fontana Car Accident Lawyers</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; text-align: center;">
    <h1>⚠️ Error Loading Blog Post</h1>
    <p>We're experiencing technical difficulties loading this blog post.</p>
    <p><a href="/blog" style="color: #007cba;">← Back to Blog</a></p>
    <p><a href="/" style="color: #007cba;">Go to Homepage</a></p>
</body>
</html>`;
    
    res.status(500).send(errorHtml);
  }
}