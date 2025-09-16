export function ShieldIcon({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#991B1B', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      {/* Shield background */}
      <path 
        d="M16 2L28 7V16C28 24.8 22.6 30 16 30C9.4 30 4 24.8 4 16V7L16 2Z" 
        fill="url(#shieldGradient)" 
        stroke="#7F1D1D" 
        strokeWidth="1"
      />
      {/* Inner shield details */}
      <path 
        d="M16 4L26 8V16C26 23.2 21.8 27.5 16 27.5C10.2 27.5 6 23.2 6 16V8L16 4Z" 
        fill="#EF4444" 
        opacity="0.3"
      />
      {/* Justice scales symbol */}
      <g transform="translate(16, 16)" fill="white">
        {/* Scale base */}
        <line x1="-6" y1="2" x2="6" y2="2" stroke="white" strokeWidth="1.5"/>
        <line x1="0" y1="-6" x2="0" y2="4" stroke="white" strokeWidth="1.5"/>
        {/* Left scale */}
        <circle cx="-4" cy="-2" r="2" fill="none" stroke="white" strokeWidth="1"/>
        <line x1="-4" y1="-4" x2="-4" y2="0" stroke="white" strokeWidth="1"/>
        {/* Right scale */}
        <circle cx="4" cy="-2" r="2" fill="none" stroke="white" strokeWidth="1"/>
        <line x1="4" y1="-4" x2="4" y2="0" stroke="white" strokeWidth="1"/>
        {/* Center pivot */}
        <circle cx="0" cy="-4" r="1" fill="white"/>
      </g>
    </svg>
  )
}