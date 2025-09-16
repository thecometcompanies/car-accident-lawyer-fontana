import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import BlogList from '@/components/BlogList'

export const metadata = {
  title: 'Legal Blog - Fontana Car Accident Lawyer | Expert Insights & Resources',
  description: 'Stay informed with expert legal insights on car accident law, insurance claims, and your rights in Fontana. Free resources from experienced attorneys.',
}

export default function BlogPage() {
  return (
    <>
      <NavBar />
      <main className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-4xl dark:text-white">
              Legal Insights & Resources
            </h1>
            <p className="mt-6 text-xl/8 text-gray-600 dark:text-gray-400">
              Stay informed with expert insights on car accident law, insurance claims, and legal rights in Fontana and San Bernardino County.
            </p>
          </div>
        </div>
        <BlogList />
      </main>
      <Footer />
    </>
  )
}