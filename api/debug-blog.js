/**
 * Debug Blog System - Check what's working and what's not
 */

export default async function handler(req, res) {
  try {
    console.log('🔍 Debugging blog system...');
    
    const results = {
      environment: {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'SET' : 'MISSING',
        CRON_SECRET: process.env.CRON_SECRET ? 'SET' : 'MISSING',
        UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? 'SET' : 'MISSING',
        UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? 'SET' : 'MISSING',
        NODE_ENV: process.env.NODE_ENV
      },
      system: {
        timestamp: new Date().toISOString(),
        platform: process.platform,
        nodeVersion: process.version
      }
    };

    // Try to import the blog generator
    try {
      const BlogPostGenerator = (await import('./blog-automation/generate-blog.js')).default;
      results.blogGenerator = 'IMPORT_SUCCESS';
      
      // Try to create an instance
      try {
        const generator = new BlogPostGenerator();
        results.blogGeneratorInstance = 'CREATE_SUCCESS';
        
        // Try to get stats
        try {
          const stats = await generator.getDatabaseStats();
          results.databaseStats = stats;
        } catch (error) {
          results.databaseStatsError = error.message;
        }
        
      } catch (error) {
        results.blogGeneratorInstanceError = error.message;
      }
      
    } catch (error) {
      results.blogGeneratorImportError = error.message;
    }

    return res.status(200).json({
      success: true,
      debug: results,
      recommendations: [
        results.environment.GEMINI_API_KEY === 'MISSING' ? 'Set GEMINI_API_KEY environment variable' : null,
        results.environment.CRON_SECRET === 'MISSING' ? 'Set CRON_SECRET environment variable' : null,
        results.environment.UPSTASH_REDIS_REST_URL === 'MISSING' ? 'Set Redis environment variables' : null
      ].filter(Boolean)
    });

  } catch (error) {
    console.error('❌ Debug failed:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
  }
}