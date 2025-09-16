import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

export function AboutUs() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-14 bg-slate-50 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
    >
      <Container>
        <SectionHeading number="4" id="about-title">
          About Our Network
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          Connecting Accident Victims with Top Lawyers
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          We are a legal referral service that connects accident victims in Fontana with experienced personal injury attorneys. Our network includes lawyers with over 25 years of experience who understand the physical, emotional, and financial toll that accidents can take on families.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Service Promise</h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.467-.22-2.121-.659-1.172-.879-1.172-2.303 0-3.182s3.07-.879 4.242 0L15 9m-3 7h3m-3 0h-3m-3 0h3m0 0V9a9 9 0 1118 0v3.764a2 2 0 01-.879 1.659l-1.745 1.309a9 9 0 01-10.752 0L5.879 14.423A2 2 0 015 12.764V9a9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-slate-900">Free Attorney Matching</h4>
                  <p className="text-slate-600">Our referral service is completely free. The attorneys in our network work on contingency, so you don't pay unless they win your case.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-slate-900">24/7 Availability</h4>
                  <p className="text-slate-600">Accidents don't happen on a schedule. We're available around the clock to connect you with qualified attorneys when you need help most.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-slate-900">Vetted Attorneys</h4>
                  <p className="text-slate-600">All attorneys in our network are carefully screened for experience, success rates, and client satisfaction. You'll be matched with the best lawyer for your specific case.</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Use Our Network?</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-slate-900 mb-2">Local Expertise</h4>
                <p className="text-slate-600">Our network attorneys have deep knowledge of Fontana streets, local courts, and California traffic laws to build strong cases.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-slate-900 mb-2">Proven Results</h4>
                <p className="text-slate-600">Our network attorneys have proven track records with high success rates in personal injury cases. We match you with lawyers who get results.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-slate-900 mb-2">Comprehensive Investigation</h4>
                <p className="text-slate-600">Network attorneys work with accident reconstruction experts, medical professionals, and investigators to build the strongest possible cases.</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                <h4 className="font-semibold text-slate-900 mb-2">Trial Ready</h4>
                <p className="text-slate-600">While most cases settle, our network attorneys are always prepared to take cases to trial if necessary to get fair compensation.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Serving All of San Bernardino County
            </h3>
            <p className="text-lg text-slate-600 mb-6">
              Our network attorneys handle personal injury cases throughout the region, including:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-700">
              <div>Fontana</div>
              <div>San Bernardino</div>
              <div>Rialto</div>
              <div>Rancho Cucamonga</div>
              <div>Ontario</div>
              <div>Upland</div>
              <div>Chino</div>
              <div>Pomona</div>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white hover:bg-red-700"
              >
                Contact Us Today
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}