import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="bg-grad" x1="100" y1="0" x2="100" y2="200" gradientUnits="userSpaceOnUse">
          {/* Corporate Blue Gradient to match app theme */}
          <stop offset="0%" stopColor="#3B82F6"/> {/* blue-500 */}
          <stop offset="100%" stopColor="#1D4ED8"/> {/* blue-700 */}
        </linearGradient>
        
        <mask id="fire-mask">
          <path d="M100 142 C 78 142, 70 115, 88 92 C 98 80, 115 65, 105 40 C 128 65, 138 100, 122 128 C 115 140, 110 142, 100 142Z" fill="white" />
          <path d="M101 142 C 94 130, 92 115, 96 100 C 100 85, 108 75, 106 40 H 102 C 104 75, 96 85, 92 100 C 88 115, 90 130, 97 142 Z" fill="black" />
        </mask>
      </defs>

      {/* Background with rounded corners */}
      <rect width="200" height="200" rx="40" fill="url(#bg-grad)"/>

      {/* Flame visual */}
      <path d="M100 148 C 65 148, 55 115, 80 85 C 95 65, 125 55, 105 25 C 135 55, 150 95, 130 125 C 120 142, 115 148, 100 148Z" fill="white" fillOpacity="0.15" />
      <path d="M100 142 C 78 142, 70 115, 88 92 C 98 80, 115 65, 105 40 C 128 65, 138 100, 122 128 C 115 140, 110 142, 100 142Z" fill="white" mask="url(#fire-mask)" />
      <circle cx="100.5" cy="138" r="3" fill="white" />

      {/* PLM Specific Icon Elements */}
      <g transform="translate(100, 164)">
          <circle cx="-20" cy="0" r="3" stroke="#DBEAFE" strokeWidth="2"/> {/* blue-100 */}
          <g transform="translate(0, 0)">
              <circle cx="0" cy="0" r="3.5" stroke="#DBEAFE" strokeWidth="2"/>
              <path d="M 0 -3.5 A 3.5 3.5 0 0 0 0 3.5 Z" fill="#DBEAFE" />
          </g>
          <circle cx="20" cy="0" r="4" fill="#DBEAFE"/>
          <path d="M -17 0 H -3.5 M 3.5 0 H 16" stroke="#DBEAFE" strokeWidth="1.2" strokeDasharray="2 2"/>
      </g>
    </svg>
  );
};

export default Logo;
