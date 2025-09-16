import { GridPattern } from '@/components/GridPattern'
import RequestCallForm from '@/components/RequestCallForm'

export function Footer() {
  return (
    <footer className="relative pt-5 pb-20 sm:pt-14 sm:pb-32">
      <div className="absolute inset-x-0 top-0 h-32 mask-[linear-gradient(white,transparent)] text-slate-900/10">
        <GridPattern x="50%" />
      </div>
      <div className="relative text-center text-sm text-slate-600">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Fontana Attorney Network</h3>
          <p className="max-w-2xl mx-auto">
            We are a legal referral service connecting accident victims with qualified personal injury attorneys. 
            We are not a law firm and do not provide legal advice. All attorneys in our network are independently licensed.
          </p>
        </div>
        <div className="mb-8">
          <div className="max-w-md mx-auto mb-8">
            <RequestCallForm compact={true} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Service Area</h4>
              <p>San Bernardino County</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Available</h4>
              <p>24/7 Emergency Referrals</p>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-8">
          <p>Copyright &copy; {new Date().getFullYear()} Fontana Attorney Network</p>
          <p className="mt-2">This is an attorney referral service. We are not a law firm.</p>
        </div>
      </div>
    </footer>
  )
}
