'use client'

import { useEffect, useRef, useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import clsx from 'clsx'
import { ShieldIcon } from '@/components/ShieldIcon'

const sections = [
  { id: 'services', title: 'Practice Areas' },
  { id: 'testimonials', title: 'Testimonials' },
  { id: 'about', title: 'About Us' },
  { id: 'results', title: 'Case Results' },
  { id: 'blog', title: 'Legal Blog', href: '/blog' },
  { id: 'contact', title: 'Contact' },
]

function MenuIcon({ open, ...props }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        d={open ? 'M17 7 7 17M7 7l10 10' : 'm15 16-3 3-3-3M15 8l-3-3-3 3'}
      />
    </svg>
  )
}

export function NavBar() {
  let navBarRef = useRef(null)
  let [activeIndex, setActiveIndex] = useState(null)
  let mobileActiveIndex = activeIndex === null ? 0 : activeIndex

  useEffect(() => {
    function updateActiveIndex() {
      if (!navBarRef.current) {
        return
      }

      let newActiveIndex = null
      let elements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((el) => el !== null)
      let bodyRect = document.body.getBoundingClientRect()
      let offset = bodyRect.top + navBarRef.current.offsetHeight + 1

      if (window.scrollY >= Math.floor(bodyRect.height) - window.innerHeight) {
        setActiveIndex(sections.length - 1)
        return
      }

      for (let index = 0; index < elements.length; index++) {
        if (
          window.scrollY >=
          elements[index].getBoundingClientRect().top - offset
        ) {
          newActiveIndex = index
        } else {
          break
        }
      }

      setActiveIndex(newActiveIndex)
    }

    updateActiveIndex()

    window.addEventListener('resize', updateActiveIndex)
    window.addEventListener('scroll', updateActiveIndex, { passive: true })

    return () => {
      window.removeEventListener('resize', updateActiveIndex)
      window.removeEventListener('scroll', updateActiveIndex)
    }
  }, [])

  return (
    <div ref={navBarRef} className="sticky top-0 z-50">
      <Popover className="sm:hidden">
        {({ open }) => (
          <>
            <div
              className={clsx(
                'relative flex items-center px-4 py-3',
                !open &&
                  'bg-white/95 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur-sm',
              )}
            >
              {!open && (
                <>
                  <div className="flex items-center">
                    <ShieldIcon className="w-6 h-6" />
                    <span className="ml-2 text-lg font-bold text-slate-900">Fontana Attorney Network</span>
                  </div>
                </>
              )}
              <PopoverButton
                className={clsx(
                  '-mr-1 ml-auto flex h-8 w-8 items-center justify-center',
                  open && 'relative z-10',
                )}
                aria-label="Toggle navigation menu"
              >
                {!open && (
                  <>
                    <span className="absolute inset-0" />
                  </>
                )}
                <MenuIcon open={open} className="h-6 w-6 stroke-slate-700" />
              </PopoverButton>
            </div>
            <PopoverPanel className="absolute inset-x-0 top-0 bg-white/95 py-3.5 shadow-sm [@supports(backdrop-filter:blur(0))]:bg-white/80 [@supports(backdrop-filter:blur(0))]:backdrop-blur-sm">
              <div className="px-4 py-2 border-b border-slate-200">
                <div className="flex items-center">
                  <ShieldIcon className="w-6 h-6" />
                  <span className="ml-2 text-lg font-bold text-slate-900">Fontana Attorney Network</span>
                </div>
              </div>
              {sections.map((section) => (
                <PopoverButton
                  as="a"
                  key={section.id}
                  href={section.href || `#${section.id}`}
                  className="flex items-center px-4 py-2 hover:bg-slate-50"
                >
                  <span className="text-base font-medium text-slate-900">
                    {section.title}
                  </span>
                </PopoverButton>
              ))}
              <div className="px-4 py-2 border-t border-slate-200">
                <a href="#contact" className="inline-flex items-center text-red-600 font-semibold">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h16a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-8-5.333a2 2 0 00-2.12 0l-8 5.333z" clipRule="evenodd" />
                  </svg>
                  Get Free Consultation
                </a>
              </div>
            </PopoverPanel>
            <div className="absolute inset-x-0 bottom-full z-10 h-4 bg-white" />
          </>
        )}
      </Popover>
      <div className="hidden sm:flex sm:h-20 sm:items-center sm:justify-between sm:border-b sm:border-slate-200 sm:bg-white/95 sm:px-8 sm:[@supports(backdrop-filter:blur(0))]:bg-white/80 sm:[@supports(backdrop-filter:blur(0))]:backdrop-blur-sm">
        <div className="flex items-center">
          <ShieldIcon className="w-8 h-8" />
          <span className="ml-3 text-xl font-bold text-slate-900">Fontana Attorney Network</span>
        </div>
        <nav className="flex space-x-8">
          {sections.map((section, sectionIndex) => (
            <a
              key={section.id}
              href={section.href || `#${section.id}`}
              className={clsx(
                'text-base font-medium transition-colors',
                (sectionIndex === activeIndex && !section.href)
                  ? 'text-red-600'
                  : 'text-slate-700 hover:text-red-600',
              )}
            >
              {section.title}
            </a>
          ))}
        </nav>
        <a href="#contact" className="inline-flex items-center rounded-lg bg-red-600 px-4 py-2 text-base font-semibold text-white hover:bg-red-700">
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h16a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-8-5.333a2 2 0 00-2.12 0l-8 5.333z" clipRule="evenodd" />
          </svg>
          Get Consultation
        </a>
      </div>
    </div>
  )
}