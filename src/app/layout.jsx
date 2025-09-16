import { Inter } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Fontana Car Accident Lawyer - Free Consultation | Expert Attorney Matching',
  description:
    'Get connected with top-rated Fontana car accident lawyers. Free consultation, no fees unless we match you with an attorney who wins. Request a call from qualified attorneys today.',
  icons: {
    icon: '/shield-icon.svg',
    shortcut: '/shield-icon.svg',
    apple: '/shield-icon.svg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
      )}
    >
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700&display=swap"
        />
        <link rel="icon" href="/shield-icon.svg" type="image/svg+xml" />
      </head>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  )
}
