/**
 * Automated Blog Post Generator for Fontana Car Accident Lawyer
 * Generates SEO-optimized blog posts daily with AI content
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';
import { BlogStorage } from '../../lib/redis.js';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class BlogPostGenerator {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    this.blogDir = path.join(process.cwd(), 'blog');
    this.dbFile = path.join(process.cwd(), 'blog/blog-database.json');
    this.storage = new BlogStorage();
    
    // SEO-focused topics for car accident lawyers
    this.topics = [
      'What to Do Immediately After a Car Accident in Fontana',
      'Common Causes of Car Accidents in San Bernardino County',
      'Understanding California No-Fault Insurance Laws',
      'How to Deal with Insurance Companies After an Accident',
      'When to Hire a Car Accident Lawyer in Fontana',
      'Calculating Pain and Suffering Damages',
      'Fontana Traffic Safety: Most Dangerous Intersections',
      'Motorcycle Accident Laws in California',
      'Truck Accident vs Car Accident: Key Differences',
      'Steps to File a Personal Injury Claim in California',
      'How Long Do You Have to File a Car Accident Claim?',
      'Understanding Comparative Negligence in California',
      'What Evidence Do You Need for a Car Accident Case?',
      'How Car Accident Settlements Work in California',
      'Dealing with Uninsured Drivers in Fontana',
      'The Role of Police Reports in Car Accident Cases',
      'Medical Treatment After a Car Accident: What You Need to Know',
      'How Weather Conditions Affect Car Accident Liability',
      'Teen Driver Accidents: Who Is Liable?',
      'Rideshare Accidents: Uber and Lyft Liability Issues'
    ];
  }

  async generateBlogPost() {
    try {
      // Select random topic
      const topic = this.topics[Math.floor(Math.random() * this.topics.length)];
      
      // Get existing posts for internal linking
      let existingPosts = [];
      try {
        existingPosts = await this.storage.getAllBlogPosts(10);
      } catch (error) {
        console.log('No existing posts found for linking');
      }

      const existingPostsList = existingPosts.map(post => ({
        title: post.title,
        slug: post.slug,
        url: `https://www.accidentlawyerfontana.com/blog/${post.slug}`
      }));
      
      const prompt = `
        Write a comprehensive, SEO-optimized blog post for a Fontana car accident law firm with the following requirements:

        TOPIC: "${topic}"

        REQUIREMENTS:
        - 1500-2000 words
        - Include relevant Fontana/San Bernardino County local information
        - Use conversational, helpful tone (not overly legal)
        - Include practical actionable advice
        - Add call-to-action for free consultation
        - Include FAQ section with 5 relevant questions
        - Optimize for keywords: "fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"
        - Include local landmarks/roads when relevant (Sierra Avenue, Foothill Boulevard, I-10, Kaiser Permanente Fontana Medical Center, etc.)
        
        INTERNAL LINKING REQUIREMENTS:
        - Include 3-5 internal links naturally within the content
        - Use descriptive anchor text (not "click here")
        - Link to related topics when mentioned
        ${existingPostsList.length > 0 ? `
        Available blog posts to link to:
        ${existingPostsList.map(post => `- ${post.title} (${post.url})`).join('\n')}
        ` : '- Note: No existing posts yet, include placeholder links like [Related: Understanding California Car Accident Laws]'}

        STRUCTURE:
        1. Compelling headline
        2. Introduction (hook + problem)
        3. Main content sections (3-4 sections with internal links)
        4. Related Articles section (list 3 related posts)
        5. FAQ section
        6. Call-to-action conclusion

        FORMAT: Return as JSON with this structure:
        {
          "title": "SEO-optimized title",
          "slug": "url-friendly-slug",
          "excerpt": "Brief 160-character description",
          "content": "Full HTML content with internal links",
          "keywords": ["keyword1", "keyword2"],
          "faq": [{"question": "Q", "answer": "A"}],
          "relatedPosts": ["slug1", "slug2", "slug3"],
          "publishDate": "${new Date().toISOString()}",
          "author": "Fontana Car Accident Legal Team"
        }
      `;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Clean and parse JSON response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No valid JSON found in AI response');
      }
      
      const blogPost = JSON.parse(jsonMatch[0]);
      
      // Save blog post to Redis
      await this.storage.saveBlogPost(blogPost);
      
      // Also save locally (backup)
      await this.saveBlogPost(blogPost);
      
      console.log(`✅ Blog post generated: ${blogPost.title}`);
      return blogPost;
      
    } catch (error) {
      console.error('❌ Error generating blog post:', error);
      throw error;
    }
  }

  async saveBlogPost(post) {
    // In Vercel, we need to use /tmp for file writes
    const tempBlogDir = '/tmp/blog';
    await fs.mkdir(tempBlogDir, { recursive: true });
    
    // Create filename with date and slug
    const date = new Date().toISOString().split('T')[0];
    const filename = `${date}-${post.slug}.json`;
    const filepath = path.join(tempBlogDir, filename);
    
    // Add metadata
    post.filename = filename;
    post.filepath = filepath;
    post.url = `/blog/${post.slug}`;
    
    // Save as JSON file
    await fs.writeFile(filepath, JSON.stringify(post, null, 2));
    
    // Also create HTML version for direct serving
    const htmlContent = this.generateHTML(post);
    const htmlFilepath = path.join(tempBlogDir, `${date}-${post.slug}.html`);
    await fs.writeFile(htmlFilepath, htmlContent);
    
    post.htmlFile = htmlFilepath;
  }

  generateHTML(post) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${post.title} | Fontana Car Accident Lawyers</title>
    <meta name="description" content="${post.excerpt}">
    <meta name="keywords" content="${post.keywords.join(', ')}">
    <link rel="canonical" href="https://fontanaaccidentlawyers.com/blog/${post.slug}">
    
    <!-- Open Graph -->
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.excerpt}">
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://fontanaaccidentlawyers.com/blog/${post.slug}">
    
    <!-- Schema.org Article -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "${post.title}",
      "description": "${post.excerpt}",
      "author": {
        "@type": "Organization",
        "name": "${post.author}"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Fontana Car Accident Lawyers"
      },
      "datePublished": "${post.publishDate}",
      "dateModified": "${post.publishDate}",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://fontanaaccidentlawyers.com/blog/${post.slug}"
      }
    }
    </script>
    
    <!-- FAQ Schema -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": ${JSON.stringify(post.faq.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      })))}
    }
    </script>
    
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #1a1a1a; margin-bottom: 20px; }
        h2 { color: #333; margin-top: 30px; }
        .faq { margin-top: 40px; }
        .faq-item { margin-bottom: 20px; border: 1px solid #ddd; border-radius: 5px; padding: 15px; }
        .cta { background: #007cba; color: white; padding: 20px; border-radius: 5px; text-align: center; margin: 30px 0; }
        .cta a { color: white; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <article>
        <h1>${post.title}</h1>
        <p><strong>Published:</strong> ${new Date(post.publishDate).toLocaleDateString()}</p>
        
        ${post.content}
        
        ${post.relatedPosts && post.relatedPosts.length > 0 ? `
        <div class="related-posts" style="margin: 30px 0; padding: 20px; background: #f5f5f5; border-radius: 5px;">
            <h2>Related Articles</h2>
            <ul style="list-style: none; padding: 0;">
                ${post.relatedPosts.map(slug => `
                    <li style="margin: 10px 0;">
                        <a href="/blog/${slug}" style="color: #007cba; text-decoration: none; font-weight: 500;">
                            → Read: ${slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </a>
                    </li>
                `).join('')}
            </ul>
        </div>
        ` : ''}
        
        <div class="faq">
            <h2>Frequently Asked Questions</h2>
            ${post.faq.map(item => `
                <div class="faq-item">
                    <h3>${item.question}</h3>
                    <p>${item.answer}</p>
                </div>
            `).join('')}
        </div>
        
        <div class="cta">
            <h3>Need Legal Help After a Car Accident?</h3>
            <p>Our experienced Fontana car accident lawyers are here to help. Free consultation, no fees unless we win.</p>
            <a href="tel:(909)XXX-XXXX">Call (909) XXX-XXXX Now</a> | 
            <a href="/#contact-form">Free Case Evaluation</a>
        </div>
    </article>
</body>
</html>`;
  }

  async updateDatabase(post) {
    try {
      let database = [];
      
      // Use /tmp for database in Vercel
      const tempDbFile = '/tmp/blog-database.json';
      
      // Load existing database
      try {
        const dbContent = await fs.readFile(tempDbFile, 'utf8');
        database = JSON.parse(dbContent);
      } catch (error) {
        // Database doesn't exist yet, start fresh
        database = [];
      }
      
      // Add new post to database
      database.unshift({
        id: Date.now(),
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        publishDate: post.publishDate,
        url: post.url,
        filename: post.filename,
        htmlFile: post.htmlFile,
        keywords: post.keywords,
        status: 'published'
      });
      
      // Keep only last 100 posts
      database = database.slice(0, 100);
      
      // Save updated database
      await fs.writeFile(tempDbFile, JSON.stringify(database, null, 2));
      
      console.log(`📊 Database updated. Total posts: ${database.length}`);
      
    } catch (error) {
      console.error('❌ Error updating database:', error);
    }
  }

  async getDatabaseStats() {
    try {
      // Get stats from Redis
      const redisStats = await this.storage.getStats();
      
      // Calculate published this month
      let publishedThisMonth = 0;
      if (redisStats.latestPost) {
        const posts = await this.storage.getBlogPosts(50); // Get recent posts
        publishedThisMonth = posts.filter(post => {
          const postDate = new Date(post.publishDate);
          const now = new Date();
          return postDate.getMonth() === now.getMonth() && 
                 postDate.getFullYear() === now.getFullYear();
        }).length;
      }
      
      return {
        totalPosts: redisStats.totalPosts,
        latestPost: redisStats.latestPost,
        publishedThisMonth,
        source: redisStats.source
      };
    } catch (error) {
      console.error('Error getting database stats:', error);
      return { totalPosts: 0, latestPost: null, publishedThisMonth: 0, source: 'error' };
    }
  }
}

// Export for use in cron jobs and API endpoints
export default BlogPostGenerator;

// If running directly, generate a blog post
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new BlogPostGenerator();
  generator.generateBlogPost().catch(console.error);
}