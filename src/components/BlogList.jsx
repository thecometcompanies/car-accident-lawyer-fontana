'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Fallback blog posts for immediate display
const fallbackPosts = [
  {
    id: 1,
    title: "5 Critical Steps Every Fontana Car Accident Victim Must Take",
    slug: "critical-steps-fontana-car-accident-victims",
    excerpt: "Were you just involved in a car accident in Fontana or San Bernardino County? The next few minutes and hours are absolutely critical for protecting your legal rights.",
    publishDate: "2025-09-16T06:03:45.119Z",
    keywords: ["fontana car accident lawyer", "car accident attorney fontana", "personal injury lawyer san bernardino county"],
    status: "published"
  },
  {
    id: 2,
    title: "Fontana Car Accident Statistics 2024: What Every Driver Must Know",
    slug: "fontana-car-accident-statistics-2024",
    excerpt: "New 2024 data reveals shocking trends in Fontana car accidents that every driver needs to know. Our comprehensive analysis of San Bernardino County traffic data exposes hidden dangers.",
    publishDate: "2025-09-16T06:07:19.873Z",
    keywords: ["fontana car accident statistics", "car accident data fontana", "fontana traffic accidents"],
    status: "published"
  }
];

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState(fallbackPosts)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        console.log('Fetching blog posts from /api/blog...')
        const response = await fetch('/api/blog')
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Blog API response:', data)
        
        if (data.success && Array.isArray(data.posts)) {
          console.log('Setting blog posts:', data.posts.length, 'posts')
          setBlogPosts(data.posts)
        } else {
          console.error('Invalid blog response format:', data)
          // Keep fallback posts if API fails
          console.log('Using fallback posts')
        }
      } catch (err) {
        console.error('Blog fetch error:', err)
        // Keep fallback posts if API fails
        console.log('Using fallback posts due to error:', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading latest articles...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400">{error}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Please try again later.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white py-24 sm:py-32 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
            Legal Insights & Resources
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
            Stay informed with expert insights on car accident law, insurance claims, and legal rights in Fontana and San Bernardino County.
          </p>
        </div>
        
        {blogPosts && blogPosts.length > 0 ? (
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 dark:border-gray-700">
            {blogPosts.map((post) => (
              <article key={post.slug} className="flex max-w-xl flex-col items-start justify-between">
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.publishDate} className="text-gray-500 dark:text-gray-400">
                    {new Date(post.publishDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-800">
                    Legal Advice
                  </span>
                </div>
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">
                    {post.excerpt}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <img 
                    alt="Fontana Car Accident Legal Team"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="size-10 rounded-full bg-gray-50 dark:bg-gray-800" 
                  />
                  <div className="text-sm/6">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      <span className="absolute inset-0" />
                      Fontana Legal Team
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">Car Accident Attorneys</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400">No articles published yet.</p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Check back soon for expert legal insights!</p>
          </div>
        )}
        
        <div className="mt-16 text-center">
          <Link
            href="/#contact"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Need Legal Help? Get Free Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}