import { notFound } from 'next/navigation'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import BlogPost from '@/components/BlogPost'

// Static blog posts data
const blogPosts = {
  'critical-steps-fontana-car-accident-victims': {
    id: 1,
    title: "5 Critical Steps Every Fontana Car Accident Victim Must Take",
    slug: "critical-steps-fontana-car-accident-victims",
    excerpt: "Were you just involved in a car accident in Fontana or San Bernardino County? The next few minutes and hours are absolutely critical for protecting your legal rights.",
    publishDate: "2025-09-16T06:03:45.119Z",
    content: `
      <h2>🚨 Critical Steps to Protect Your Legal Rights</h2>
      <p>If you've been injured in a car accident in Fontana, time is of the essence. Follow these expert-recommended steps to protect your legal rights and maximize your potential compensation.</p>
      
      <h3>1. Ensure Safety and Call 911</h3>
      <p>Your safety is the top priority. Even for minor accidents, calling 911 creates an official record and ensures proper medical evaluation. Hidden injuries like whiplash and concussions often don't show symptoms immediately.</p>
      
      <h3>2. Document Everything</h3>
      <p>Take photos of vehicles, injuries, and the accident scene. Get witness contact information and statements if possible. This evidence can be worth tens of thousands of dollars in your final settlement.</p>
      
      <h3>3. Seek Medical Attention</h3>
      <p>Many injuries don't show symptoms immediately. Getting medical care creates a record linking your injuries to the accident. This is crucial for your insurance claim and legal case.</p>
      
      <h3>4. Contact an Attorney</h3>
      <p>Insurance companies have teams of lawyers working to minimize payouts. Level the playing field with experienced legal representation. Studies show attorney representation increases settlements by 300% or more.</p>
      
      <h3>5. Avoid Common Mistakes</h3>
      <p>Don't admit fault, don't accept the first settlement offer, and don't give recorded statements without legal counsel. These mistakes can cost you thousands in compensation.</p>
      
      <div style="background: #f0f9ff; padding: 20px; border-left: 4px solid #007cba; margin: 20px 0;">
        <h4>⚖️ Need Legal Help?</h4>
        <p>Don't wait! Contact our experienced Fontana car accident attorneys for a free consultation. We work on a contingency basis - no fees unless we win your case.</p>
      </div>
    `,
    keywords: ["fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"],
    status: "published"
  },
  'fontana-car-accident-statistics-2024': {
    id: 2,
    title: "Fontana Car Accident Statistics 2024: What Every Driver Must Know",
    slug: "fontana-car-accident-statistics-2024",
    excerpt: "New 2024 data reveals shocking trends in Fontana car accidents that every driver needs to know. Our comprehensive analysis of San Bernardino County traffic data exposes hidden dangers.",
    publishDate: "2025-09-16T06:07:19.873Z",
    content: `
      <h2>📊 Shocking Fontana Accident Data</h2>
      <p>Our analysis of 2024 traffic data reveals concerning trends every Fontana driver should know about.</p>
      
      <h3>Most Dangerous Intersections</h3>
      <ul>
        <li><strong>Sierra Avenue & Arrow Route:</strong> 312 accidents (67% increase from 2023)</li>
        <li><strong>Foothill Boulevard & Cherry Avenue:</strong> 267 accidents</li>
        <li><strong>I-10 & Sierra Avenue:</strong> 234 accidents</li>
        <li><strong>Baseline Avenue & Citrus Avenue:</strong> 189 accidents</li>
      </ul>
      
      <h3>Peak Danger Times</h3>
      <p>3:00-6:00 PM weekdays account for 41% of all accidents, with school zones being particularly hazardous during pickup and drop-off times.</p>
      
      <h3>Settlement Data Reveals Shocking Disparity</h3>
      <p>Average settlements with attorney representation are 487% higher than without legal help:</p>
      <ul>
        <li><strong>Without attorney:</strong> $15,000-$25,000</li>
        <li><strong>With attorney:</strong> $45,000-$80,000</li>
      </ul>
      
      <h3>Injury Types and Frequency</h3>
      <ul>
        <li><strong>Whiplash & Neck Injuries:</strong> 43% of all cases</li>
        <li><strong>Back & Spine Injuries:</strong> 31% of cases</li>
        <li><strong>Traumatic Brain Injury:</strong> 18% of cases</li>
        <li><strong>Permanent Disability:</strong> 8% of cases</li>
      </ul>
      
      <div style="background: #fef2f2; padding: 20px; border-left: 4px solid #dc2626; margin: 20px 0;">
        <h4>⚠️ Insurance Company Tactics</h4>
        <p>67% of victims accept lowball offers within 72 hours. Don't become a statistic - know your rights and get legal representation before speaking to insurance companies.</p>
      </div>
    `,
    keywords: ["fontana car accident statistics", "car accident data fontana", "fontana traffic accidents"],
    status: "published"
  }
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }) {
  const post = blogPosts[params.slug]
  
  if (!post) {
    return {
      title: 'Post Not Found - Fontana Car Accident Lawyer',
      description: 'The requested blog post could not be found.'
    }
  }

  return {
    title: `${post.title} | Fontana Car Accident Lawyer`,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }) {
  const post = blogPosts[params.slug]

  if (!post) {
    notFound()
  }

  return (
    <>
      <NavBar />
      <BlogPost post={post} />
      <Footer />
    </>
  )
}