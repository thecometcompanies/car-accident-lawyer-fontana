import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

const practiceAreas = [
  {
    title: 'Car Accidents',
    description: 'Representing victims of rear-end collisions, T-bone accidents, head-on crashes, and multi-vehicle accidents in Fontana.',
    features: [
      'Insurance claim negotiations',
      'Medical bill coverage',
      'Lost wage compensation',
      'Pain and suffering damages'
    ]
  },
  {
    title: 'Motorcycle Accidents',
    description: 'Specialized representation for motorcycle accident victims facing serious injuries and biased insurance companies.',
    features: [
      'Helmet law defense',
      'Road hazard claims',
      'Severe injury compensation',
      'Wrongful death cases'
    ]
  },
  {
    title: 'Truck Accidents',
    description: 'Complex commercial vehicle accident cases involving federal regulations and multiple liable parties.',
    features: [
      'Federal regulation violations',
      'Commercial insurance claims',
      'Catastrophic injury cases',
      'Multi-party liability'
    ]
  },
  {
    title: 'Pedestrian Accidents',
    description: 'Protecting the rights of pedestrians struck by vehicles in crosswalks, parking lots, and sidewalks.',
    features: [
      'Crosswalk accident claims',
      'Hit and run cases',
      'School zone accidents',
      'Parking lot incidents'
    ]
  }
]

export function PracticeAreas() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
    >
      <Container>
        <SectionHeading number="1" id="services-title">
          Practice Areas
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          Comprehensive Legal Representation for Accident Victims
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          Our network of experienced attorneys handles all types of personal injury cases in Fontana and throughout San Bernardino County.
        </p>
        
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {practiceAreas.map((area, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4">{area.title}</h3>
              <p className="text-slate-600 mb-6">{area.description}</p>
              <ul className="space-y-2">
                {area.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-slate-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-red-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Don't See Your Case Type Listed?
          </h3>
          <p className="text-lg text-slate-600 mb-6">
            Our network attorneys handle all types of personal injury cases. Contact us to be matched with the right lawyer for your specific situation.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white hover:bg-red-700"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h16a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-8-5.333a2 2 0 00-2.12 0l-8 5.333z" clipRule="evenodd" />
            </svg>
            Get Free Consultation
          </a>
        </div>
      </Container>
    </section>
  )
}