/**
 * Manual Blog Test - No Authentication Required
 * This will help us debug the blog generation system
 */

import { NextResponse } from 'next/server'

export async function GET() {
  const debugInfo = {
    timestamp: new Date().toISOString(),
    environment: {},
    tests: {},
    errors: []
  };

  try {
    // Test 1: Check environment variables
    debugInfo.environment = {
      GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'SET' : 'MISSING',
      CRON_SECRET: process.env.CRON_SECRET ? 'SET' : 'MISSING',
      KV_REST_API_URL: process.env.KV_REST_API_URL ? 'SET' : 'MISSING',
      KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN ? 'SET' : 'MISSING',
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? 'SET' : 'MISSING',
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ? 'SET' : 'MISSING'
    };

    // Test 2: Try to import dependencies
    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      debugInfo.tests.googleAI = 'IMPORT_SUCCESS';
      
      if (process.env.GEMINI_API_KEY) {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        debugInfo.tests.googleAIModel = 'MODEL_CREATED';
      }
    } catch (error) {
      debugInfo.tests.googleAI = `IMPORT_FAILED: ${error.message}`;
      debugInfo.errors.push(`Google AI Import: ${error.message}`);
    }

    // Test 3: Try to import and test storage
    try {
      const { BlogStorage } = await import('../../../../lib/redis.js');
      const storage = new BlogStorage();
      debugInfo.tests.storage = 'IMPORT_SUCCESS';
      
      // Try to get existing posts
      const posts = await storage.getAllBlogPosts(5);
      debugInfo.tests.storageFetch = `SUCCESS: Found ${posts.length} posts`;
    } catch (error) {
      debugInfo.tests.storage = `FAILED: ${error.message}`;
      debugInfo.errors.push(`Storage Test: ${error.message}`);
    }

    // Test 4: Try to create a simple test blog post (if all deps work)
    if (process.env.GEMINI_API_KEY && debugInfo.tests.googleAI === 'IMPORT_SUCCESS') {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const testPrompt = `Write a simple JSON blog post about car accidents in Fontana.
        
        Format: {"title": "Test Post", "slug": "test-post", "content": "Short content", "publishDate": "${new Date().toISOString()}"}`;
        
        const result = await model.generateContent(testPrompt);
        const response = await result.response;
        const text = response.text();
        
        debugInfo.tests.aiGeneration = 'SUCCESS';
        debugInfo.tests.aiResponse = text.substring(0, 200) + '...';
        
        // Try to parse JSON
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          debugInfo.tests.jsonParsing = 'SUCCESS';
          debugInfo.tests.testPost = {
            title: parsed.title,
            slug: parsed.slug
          };
        }
      } catch (error) {
        debugInfo.tests.aiGeneration = `FAILED: ${error.message}`;
        debugInfo.errors.push(`AI Generation: ${error.message}`);
      }
    }

    return NextResponse.json({
      success: debugInfo.errors.length === 0,
      message: debugInfo.errors.length === 0 ? 'All tests passed!' : `${debugInfo.errors.length} errors found`,
      debug: debugInfo,
      nextSteps: debugInfo.errors.length > 0 ? [
        'Fix the errors listed above',
        'Ensure all environment variables are set',
        'Check Vercel deployment logs'
      ] : [
        'System appears ready for blog generation',
        'Check Vercel cron job logs',
        'Verify cron authentication'
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack,
      debug: debugInfo
    }, { status: 500 });
  }
}