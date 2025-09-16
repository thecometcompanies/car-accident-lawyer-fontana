import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'

const caseResults = [
  {
    type: 'Wrongful Death',
    amount: '$450,000',
    description: 'Family of father killed in head-on collision caused by drunk driver',
    location: 'Fontana, CA'
  },
  {
    type: 'Truck Accident',
    amount: '$320,000',
    description: 'Commercial vehicle rear-ended client at red light causing spinal injuries',
    location: 'San Bernardino, CA'
  },
  {
    type: 'Motorcycle Accident',
    amount: '$275,000',
    description: 'Motorcyclist struck by vehicle making illegal left turn',
    location: 'Rialto, CA'
  },
  {
    type: 'Multi-Vehicle Accident',
    amount: '$185,000',
    description: 'Client injured in five-car pileup on I-10 during rush hour',
    location: 'Fontana, CA'
  },
  {
    type: 'Pedestrian Accident',
    amount: '$165,000',
    description: 'Pedestrian hit by distracted driver in marked crosswalk',
    location: 'Rancho Cucamonga, CA'
  },
  {
    type: 'Car Accident',
    amount: '$150,000',
    description: 'T-bone collision at intersection resulting in multiple fractures',
    location: 'Fontana, CA'
  },
  {
    type: 'Bicycle Accident',
    amount: '$125,000',
    description: 'Cyclist struck by vehicle failing to yield right of way',
    location: 'Upland, CA'
  },
  {
    type: 'Hit and Run',
    amount: '$95,000',
    description: 'Client compensated through uninsured motorist coverage',
    location: 'San Bernardino, CA'
  }
]

export function CaseResults() {
  return (
    <section
      id="results"
      aria-labelledby="results-title"
      className="scroll-mt-14 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
    >
      <Container>
        <SectionHeading number="3" id="results-title">
          Recent Case Results
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          Proven Track Record of Success
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          These recent case results from our network attorneys demonstrate their commitment to securing maximum compensation for clients. Each case is unique, and past results don't guarantee future outcomes.
        </p>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {caseResults.map((caseResult, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{caseResult.type}</h3>
                    <p className="text-sm text-slate-500">{caseResult.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">{caseResult.amount}</p>
                    <p className="text-sm text-slate-500">Settlement</p>
                  </div>
                </div>
                <p className="text-slate-600">{caseResult.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Expert Attorney Matching
          </h3>
          <p className="text-xl text-slate-300 mb-6">
            connecting victims with the best lawyers throughout San Bernardino County
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <p className="text-3xl font-bold text-cyan-400">500+</p>
              <p className="text-slate-300">Cases Won</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">98%</p>
              <p className="text-slate-300">Success Rate</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">25+</p>
              <p className="text-slate-300">Years Experience</p>
            </div>
          </div>
          <div className="mt-8">
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white hover:bg-red-700"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h16a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-8-5.333a2 2 0 00-2.12 0l-8 5.333z" clipRule="evenodd" />
              </svg>
              Free Case Review
            </a>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500">
            * Past results do not guarantee future outcomes. Each case is evaluated on its individual merits.
          </p>
        </div>
      </Container>
    </section>
  )
}