/**
 * Environment Variables Check
 */

import { NextResponse } from 'next/server'

export async function GET() {
  const envCheck = {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ? 'SET' : 'MISSING',
    CRON_SECRET: process.env.CRON_SECRET ? 'SET' : 'MISSING',
    STORAGE_URL: (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL) ? 'SET' : 'MISSING',
    STORAGE_TOKEN: (process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN) ? 'SET' : 'MISSING',
    KV_REST_API_URL: process.env.KV_REST_API_URL ? 'SET (Vercel KV)' : 'MISSING',
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ? 'SET (Upstash)' : 'MISSING',
    NODE_ENV: process.env.NODE_ENV || 'undefined'
  };

  const missingVars = Object.entries(envCheck)
    .filter(([key, value]) => value === 'MISSING' && key !== 'NODE_ENV')
    .map(([key]) => key);

  return NextResponse.json({
    success: true,
    environment: envCheck,
    missingVariables: missingVars,
    ready: missingVars.length === 0,
    message: missingVars.length === 0 
      ? 'All environment variables are set!' 
      : `Missing ${missingVars.length} required environment variables`,
    timestamp: new Date().toISOString()
  });
}