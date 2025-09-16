'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BlogList() {
  const [blogPosts, setBlogPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await fetch('/api/blog')
        const data = await response.json()
        
        if (data.success) {
          setBlogPosts(data.posts)
        } else {
          setError('Failed to load blog posts')
        }
      } catch (err) {
        setError('Error loading blog posts')
        console.error('Blog fetch error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="bg-white py-16 dark:bg-gray-900">
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
      <div className="bg-white py-16 dark:bg-gray-900">
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
    <div className="bg-white py-16 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col items-end justify-between gap-16 lg:mx-0 lg:max-w-none lg:flex-row">
          <div className="w-full lg:max-w-lg lg:flex-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl dark:text-white">
              Expert Legal Content for Fontana Residents
            </h2>
            <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-400">
              Our experienced legal team regularly publishes insights on car accident law, insurance claims, and your rights. Stay informed with the latest legal developments affecting Fontana drivers.
            </p>
            <img
              alt="Legal consultation and car accident documentation"
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1344&h=1104&q=80"
              className="mt-16 aspect-6/5 w-full rounded-2xl object-cover outline-1 -outline-offset-1 outline-black/5 lg:aspect-auto lg:h-[38rem] dark:outline-white/10"
            />
          </div>
          <div className="w-full lg:max-w-xl lg:flex-auto">
            <h3 className="sr-only">Recent Articles</h3>
            {blogPosts.length > 0 ? (
              <ul className="-my-8 divide-y divide-gray-100 dark:divide-gray-800">
                {blogPosts.map((post) => (
                  <li key={post.slug} className="py-8">
                    <dl className="relative flex flex-wrap gap-x-3">
                      <dt className="sr-only">Title</dt>
                      <dd className="w-full flex-none text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
                        <Link href={`/blog/${post.slug}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                          {post.title}
                          <span aria-hidden="true" className="absolute inset-0" />
                        </Link>
                      </dd>
                      <dt className="sr-only">Description</dt>
                      <dd className="mt-2 w-full flex-none text-base/7 text-gray-600 dark:text-gray-400">
                        {post.excerpt || post.title}
                      </dd>
                      <dt className="sr-only">Published Date</dt>
                      <dd className="mt-4 text-base/7 font-semibold text-gray-900 dark:text-white">
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </dd>
                      <dt className="sr-only">Reading Time</dt>
                      <dd className="mt-4 flex items-center gap-x-3 text-base/7 text-gray-500 dark:text-gray-400">
                        <svg
                          viewBox="0 0 2 2"
                          aria-hidden="true"
                          className="size-0.5 flex-none fill-gray-300 dark:fill-gray-600"
                        >
                          <circle r={1} cx={1} cy={1} />
                        </svg>
                        5 min read
                      </dd>
                    </dl>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600 dark:text-gray-400">No articles published yet.</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">Check back soon for expert legal insights!</p>
              </div>
            )}
            <div className="mt-8 flex border-t border-gray-100 pt-8 dark:border-gray-800">
              <Link
                href="/#contact"
                className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Need Legal Help? Get Free Consultation <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}