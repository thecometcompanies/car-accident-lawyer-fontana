import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { NavBar } from '@/components/NavBar'
import { PracticeAreas } from '@/components/PracticeAreas'
import { LawyerTestimonials } from '@/components/LawyerTestimonials'
import { AboutUs } from '@/components/AboutUs'
import { CaseResults } from '@/components/CaseResults'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <>
      <Hero />
      <NavBar />
      <PracticeAreas />
      <LawyerTestimonials />
      <CaseResults />
      <AboutUs />
      <section id="contact" className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32 bg-slate-100">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Get Connected with a Qualified Attorney
            </h2>
            <p className="text-lg text-slate-600">
              Fill out our quick form below and we'll connect you with an experienced personal injury attorney in your area within 1 hour.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  )
}