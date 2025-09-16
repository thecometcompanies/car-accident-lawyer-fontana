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
      <BlogList />
      <Footer />
    </>
  )
}