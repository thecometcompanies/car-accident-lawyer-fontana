import { NextResponse } from 'next/server'

// Fallback blog posts
const fallbackPosts = [
  {
    id: 1,
    title: "5 Critical Steps Every Fontana Car Accident Victim Must Take",
    slug: "critical-steps-fontana-car-accident-victims",
    excerpt: "Were you just involved in a car accident in Fontana or San Bernardino County? The next few minutes and hours are absolutely critical for protecting your legal rights.",
    publishDate: "2025-09-16T06:03:45.119Z",
    url: "/blog/critical-steps-fontana-car-accident-victims",
    keywords: ["fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"],
    status: "published"
  },
  {
    id: 2,
    title: "Fontana Car Accident Statistics 2024: What Every Driver Must Know",
    slug: "fontana-car-accident-statistics-2024",
    excerpt: "New 2024 data reveals shocking trends in Fontana car accidents that every driver needs to know. Our comprehensive analysis of San Bernardino County traffic data exposes hidden dangers.",
    publishDate: "2025-09-16T06:07:19.873Z",
    url: "/blog/fontana-car-accident-statistics-2024",
    keywords: ["fontana car accident statistics", "car accident data fontana", "fontana traffic accidents"],
    status: "published"
  }
];

export async function GET() {
  try {
    // For now, return fallback posts to test the API
    return NextResponse.json({
      success: true,
      posts: fallbackPosts,
      count: fallbackPosts.length
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch blog posts',
      posts: [],
      count: 0
    }, { status: 500 })
  }
}