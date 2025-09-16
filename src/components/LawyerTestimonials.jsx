import { Container } from '@/components/Container'
import { SectionHeading } from '@/components/SectionHeading'
import { StarRating } from '@/components/StarRating'

const testimonials = [
  {
    name: 'Maria Rodriguez',
    role: 'Car Accident Victim',
    rating: 5,
    content: "After my accident on the 210 freeway, I was overwhelmed with medical bills and insurance companies trying to lowball me. This firm fought for me and got me $85,000 when insurance only offered $12,000. I can't thank them enough.",
    result: '$85,000 Settlement'
  },
  {
    name: 'David Chen',
    role: 'Motorcycle Accident Victim',
    rating: 5,
    content: "The insurance company blamed me for my motorcycle accident, but these lawyers proved it was the other driver's fault. They handled everything while I focused on recovery. Professional, caring, and effective.",
    result: '$150,000 Settlement'
  },
  {
    name: 'Sarah Johnson',
    role: 'Pedestrian Accident Victim', 
    rating: 5,
    content: "I was hit by a distracted driver while walking to work in downtown Fontana. The legal team was compassionate and kept me informed throughout the entire process. They secured compensation for all my medical expenses plus lost wages.",
    result: '$120,000 Settlement'
  },
  {
    name: 'Robert Martinez',
    role: 'Truck Accident Victim',
    rating: 5,
    content: "The semi-truck accident left me unable to work for 8 months. These attorneys took on the trucking company and their team of lawyers. They never backed down and got me the maximum compensation possible.",
    result: '$320,000 Settlement'
  },
  {
    name: 'Jennifer Kim',
    role: 'Family Representative',
    rating: 5,
    content: "When we lost my husband in a fatal car accident, we didn't know where to turn. This firm handled our wrongful death case with such care and professionalism during our darkest time. They secured our family's future.",
    result: '$450,000 Settlement'
  },
  {
    name: 'Michael Torres',
    role: 'Multiple Vehicle Accident',
    rating: 5,
    content: "Five-car pileup on I-10 left me with back injuries. Multiple insurance companies were pointing fingers at each other. These lawyers sorted through the mess and made sure I got fair compensation from all responsible parties.",
    result: '$95,000 Settlement'
  }
]

export function LawyerTestimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="scroll-mt-14 bg-slate-50 py-16 sm:scroll-mt-32 sm:py-20 lg:py-32"
    >
      <Container>
        <SectionHeading number="2" id="testimonials-title">
          Client Success Stories
        </SectionHeading>
        <p className="mt-8 font-display text-4xl font-bold tracking-tight text-slate-900">
          Real Results for Real People
        </p>
        <p className="mt-4 text-lg tracking-tight text-slate-700">
          Our network attorneys get results. These are just a few of the many success stories from accident victims connected through our service in Fontana and San Bernardino County.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="ml-2 text-sm text-slate-600">({testimonial.rating}/5)</span>
              </div>
              
              <blockquote className="text-slate-600 mb-6">
                "{testimonial.content}"
              </blockquote>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{testimonial.result}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-slate-600 mb-8">
            <strong>Expert Attorney Matching</strong> - We connect you with the best lawyers for your specific case
          </p>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Your Case Could Be Next
            </h3>
            <p className="text-slate-600 mb-6">
              Every case is unique, but our track record speaks for itself. Let us evaluate your case and fight for the compensation you deserve.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-lg font-semibold text-white hover:bg-red-700"
            >
              Get Your Free Case Evaluation
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}