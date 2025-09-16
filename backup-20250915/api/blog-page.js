/**
 * Blog Page HTML - Returns the blog listing page
 */

export default async function handler(req, res) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fontana Car Accident Lawyer Blog | Legal Advice & Resources</title>
    <meta name="description" content="Expert insights on car accident law in Fontana. Get tips on insurance claims, legal rights, and what to do after an accident. Free consultation available.">
    <link rel="canonical" href="https://car-accident-lawyer-fontana.vercel.app/blog">
    
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
        h1 {
            color: #1a1a1a;
            border-bottom: 3px solid #007cba;
            padding-bottom: 10px;
        }
        .blog-grid {
            display: grid;
            gap: 20px;
            margin-top: 30px;
        }
        .blog-card {
            background: white;
            border-radius: 8px;
            padding: 25px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transition: transform 0.2s;
        }
        .blog-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 20px rgba(0,0,0,0.15);
        }
        .blog-title {
            color: #1a1a1a;
            font-size: 22px;
            margin-bottom: 10px;
            text-decoration: none;
            display: block;
            font-weight: 600;
        }
        .blog-title:hover {
            color: #007cba;
        }
        .blog-meta {
            color: #666;
            font-size: 14px;
            margin-bottom: 10px;
        }
        .blog-excerpt {
            color: #555;
            margin-bottom: 15px;
        }
        .read-more {
            color: #007cba;
            text-decoration: none;
            font-weight: 600;
        }
        .read-more:hover {
            text-decoration: underline;
        }
        .cta-section {
            background: #007cba;
            color: white;
            padding: 30px;
            border-radius: 8px;
            text-align: center;
            margin: 40px 0;
        }
        .cta-section h2 {
            margin-top: 0;
        }
        .cta-button {
            display: inline-block;
            background: white;
            color: #007cba;
            padding: 12px 30px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: 600;
            margin-top: 10px;
        }
        .cta-button:hover {
            background: #f0f0f0;
        }
        .loading {
            text-align: center;
            padding: 50px;
            color: #666;
        }
    </style>
</head>
<body>
    <h1>🚀 Fontana Car Accident Law Blog</h1>
    <p>Stay informed with the latest insights on car accident law, insurance claims, and legal rights in Fontana and San Bernardino County.</p>
    
    <div id="blog-container" class="blog-grid">
        <div class="loading">Loading blog posts...</div>
    </div>
    
    <div class="cta-section">
        <h2>Injured in a Car Accident?</h2>
        <p>Get the legal help you deserve. Our experienced Fontana car accident lawyers are here to fight for your rights.</p>
        <a href="/" class="cta-button">Get Free Consultation</a>
    </div>
    
    <script>
        // Fetch blog posts from API
        async function loadBlogPosts() {
            try {
                const response = await fetch('/api/blog');
                const data = await response.json();
                
                const container = document.getElementById('blog-container');
                
                if (data.success && data.posts.length > 0) {
                    container.innerHTML = data.posts.map(post => \`
                        <article class="blog-card">
                            <div class="blog-title">\${post.title}</div>
                            <div class="blog-meta">
                                \${new Date(post.publishDate).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </div>
                            <p class="blog-excerpt">\${post.excerpt}</p>
                            <div class="read-more">📝 SEO-optimized content targeting: \${post.keywords ? post.keywords.slice(0,2).join(', ') : 'fontana car accident lawyer'}</div>
                        </article>
                    \`).join('');
                } else {
                    container.innerHTML = '<p>No blog posts available yet. Check back soon!</p>';
                }
            } catch (error) {
                console.error('Error loading blog posts:', error);
                document.getElementById('blog-container').innerHTML = 
                    '<p>Error loading blog posts. Please try again later.</p>';
            }
        }
        
        // Load posts when page loads
        loadBlogPosts();
    </script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}