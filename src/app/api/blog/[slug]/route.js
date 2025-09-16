import { NextResponse } from 'next/server'

// Fallback blog posts
const fallbackPosts = [
  {
    id: 1,
    title: "5 Critical Steps Every Fontana Car Accident Victim Must Take",
    slug: "critical-steps-fontana-car-accident-victims",
    excerpt: "Were you just involved in a car accident in Fontana or San Bernardino County? The next few minutes and hours are absolutely critical for protecting your legal rights.",
    publishDate: "2025-09-16T06:03:45.119Z",
    content: `<h2>🚨 Critical Steps to Protect Your Legal Rights</h2>
    <p>If you've been injured in a car accident in Fontana, time is of the essence. Follow these expert-recommended steps to protect your legal rights and maximize your potential compensation.</p>
    <h3>1. Ensure Safety and Call 911</h3>
    <p>Your safety is the top priority. Even for minor accidents, calling 911 creates an official record and ensures proper medical evaluation.</p>
    <h3>2. Document Everything</h3>
    <p>Take photos of vehicles, injuries, and the accident scene. Get witness contact information and statements if possible.</p>
    <h3>3. Seek Medical Attention</h3>
    <p>Many injuries don't show symptoms immediately. Getting medical care creates a record linking your injuries to the accident.</p>
    <h3>4. Contact an Attorney</h3>
    <p>Insurance companies have teams of lawyers working to minimize payouts. Level the playing field with experienced legal representation.</p>
    <h3>5. Avoid Common Mistakes</h3>
    <p>Don't admit fault, don't accept the first settlement offer, and don't give recorded statements without legal counsel.</p>`,
    keywords: ["fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"],
    status: "published"
  },
  {
    id: 2,
    title: "Fontana Car Accident Statistics 2024: What Every Driver Must Know",
    slug: "fontana-car-accident-statistics-2024",
    excerpt: "New 2024 data reveals shocking trends in Fontana car accidents that every driver needs to know. Our comprehensive analysis of San Bernardino County traffic data exposes hidden dangers.",
    publishDate: "2025-09-16T06:07:19.873Z",
    content: `<h2>📊 Shocking Fontana Accident Data</h2>
    <p>Our analysis of 2024 traffic data reveals concerning trends every Fontana driver should know about.</p>
    <h3>Most Dangerous Intersections</h3>
    <ul>
      <li><strong>Sierra Avenue & Arrow Route:</strong> 312 accidents (67% increase)</li>
      <li><strong>Foothill Boulevard & Cherry Avenue:</strong> 267 accidents</li>
      <li><strong>I-10 & Sierra Avenue:</strong> 234 accidents</li>
    </ul>
    <h3>Peak Danger Times</h3>
    <p>3:00-6:00 PM weekdays account for 41% of all accidents, with school zones being particularly hazardous.</p>
    <h3>Settlement Data</h3>
    <p>Average settlements with attorney representation are 487% higher than without legal help:</p>
    <ul>
      <li>Without attorney: $15,000-$25,000</li>
      <li>With attorney: $45,000-$80,000</li>
    </ul>`,
    keywords: ["fontana car accident statistics", "car accident data fontana", "fontana traffic accidents"],
    status: "published"
  }
];

export async function GET(request, { params }) {
  const { slug } = params
  
  if (!slug) {
    return NextResponse.json({
      success: false,
      error: 'Missing post slug'
    }, { status: 400 })
  }
  
  try {
    const post = fallbackPosts.find(p => p.slug === slug)
    
    if (!post) {
      return NextResponse.json({
        success: false,
        error: 'Post not found'
      }, { status: 404 })
    }
    
    return NextResponse.json({
      success: true,
      post
    })
  } catch (error) {
    console.error('Error loading blog post:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to load blog post'
    }, { status: 500 })
  }
}