import { Button } from '@/components/Button'
import { GridPattern } from '@/components/GridPattern'
import ContactForm from '@/components/ContactForm'

export function Hero() {
  return (
    <header className="overflow-hidden bg-slate-100 lg:bg-transparent lg:px-5">
      <div className="mx-auto grid max-w-6xl grid-cols-1 grid-rows-[auto_1fr] gap-y-16 pt-16 md:pt-20 lg:grid-cols-12 lg:gap-y-20 lg:px-3 lg:pt-20 lg:pb-36 xl:py-32">
        <div className="relative flex items-end lg:col-span-5 lg:row-span-2">
          <div className="absolute -top-20 right-1/2 -bottom-12 left-0 z-10 rounded-br-6xl bg-red-600 text-white/10 md:bottom-8 lg:-inset-y-32 lg:right-full lg:left-[-100vw] lg:-mr-40">
            <GridPattern
              x="100%"
              y="100%"
              patternTransform="translate(112 64)"
            />
          </div>
          <div className="relative z-10 mx-auto w-full px-4 lg:px-0">
            <ContactForm />
          </div>
        </div>
        <div className="bg-white pt-16 lg:col-span-7 lg:bg-transparent lg:pt-0 lg:pl-16 xl:pl-20">
          <div className="mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-0">
            <div className="mb-8">
              <span className="text-red-600 font-semibold text-lg">Injured in Fontana?</span>
              <h1 className="font-display text-5xl font-extrabold text-slate-900 sm:text-6xl mt-2">
                Connect with Top Car Accident Lawyers
              </h1>
            </div>
            <p className="mt-4 text-2xl text-slate-600 leading-relaxed">
              We connect accident victims with experienced attorneys in Fontana. 
              <strong className="text-slate-900"> Free consultation.</strong> 
              Get matched with the right lawyer for your case.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg">Free Attorney Matching</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg">Connected to Lawyers in 1 Hour</span>
              </div>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-lg">Vetted Attorneys Throughout San Bernardino County</span>
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-red-600 px-6 py-4 text-lg font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600">
                Get Free Consultation
              </a>
              <a href="#testimonials" className="inline-flex items-center justify-center rounded-lg border-2 border-slate-900 px-6 py-4 text-lg font-semibold text-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-900">
                See Our Results
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}