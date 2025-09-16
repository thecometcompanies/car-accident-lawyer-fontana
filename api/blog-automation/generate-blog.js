/**
 * Automated Blog Post Generator for Fontana Car Accident Lawyer
 * Generates SEO-optimized blog posts daily with AI content
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs/promises';
import path from 'path';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class BlogPostGenerator {
  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.blogDir = path.join(process.cwd(), 'blog');
    this.dbFile = path.join(process.cwd(), 'blog/blog-database.json');
    
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
        - Include local landmarks/roads when relevant (Sierra Avenue, Foothill Boulevard, I-10, etc.)

        STRUCTURE:
        1. Compelling headline
        2. Introduction (hook + problem)
        3. Main content sections (3-4 sections)
        4. FAQ section
        5. Call-to-action conclusion

        FORMAT: Return as JSON with this structure:
        {
          "title": "SEO-optimized title",
          "slug": "url-friendly-slug",
          "excerpt": "Brief 160-character description",
          "content": "Full HTML content",
          "keywords": ["keyword1", "keyword2"],
          "faq": [{"question": "Q", "answer": "A"}],
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
      
      // Save blog post
      await this.saveBlogPost(blogPost);
      
      // Update database
      await this.updateDatabase(blogPost);
      
      console.log(`✅ Blog post generated: ${blogPost.title}`);
      return blogPost;
      
    } catch (error) {
      console.error('❌ Error generating blog post:', error);
      throw error;
    }
  }

  async saveBlogPost(post) {
    // Ensure blog directory exists
    await fs.mkdir(this.blogDir, { recursive: true });
    
    // Create filename with date and slug
    const date = new Date().toISOString().split('T')[0];
    const filename = `${date}-${post.slug}.json`;
    const filepath = path.join(this.blogDir, filename);
    
    // Add metadata
    post.filename = filename;
    post.filepath = filepath;
    post.url = `/blog/${post.slug}`;
    
    // Save as JSON file
    await fs.writeFile(filepath, JSON.stringify(post, null, 2));
    
    // Also create HTML version for direct serving
    const htmlContent = this.generateHTML(post);
    const htmlFilepath = path.join(this.blogDir, `${date}-${post.slug}.html`);
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
            <a href="tel:XXX-XXX-XXXX">Call (XXX) XXX-XXXX Now</a> | 
            <a href="/#contact">Free Case Evaluation</a>
        </div>
    </article>
</body>
</html>`;
  }

  async updateDatabase(post) {
    try {
      let database = [];
      
      // Load existing database
      try {
        const dbContent = await fs.readFile(this.dbFile, 'utf8');
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
      await fs.writeFile(this.dbFile, JSON.stringify(database, null, 2));
      
      console.log(`📊 Database updated. Total posts: ${database.length}`);
      
    } catch (error) {
      console.error('❌ Error updating database:', error);
    }
  }

  async getDatabaseStats() {
    try {
      const dbContent = await fs.readFile(this.dbFile, 'utf8');
      const database = JSON.parse(dbContent);
      
      return {
        totalPosts: database.length,
        latestPost: database[0],
        publishedThisMonth: database.filter(post => {
          const postDate = new Date(post.publishDate);
          const now = new Date();
          return postDate.getMonth() === now.getMonth() && 
                 postDate.getFullYear() === now.getFullYear();
        }).length
      };
    } catch (error) {
      return { totalPosts: 0, latestPost: null, publishedThisMonth: 0 };
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