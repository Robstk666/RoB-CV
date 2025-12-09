import React from 'react';

export const HandDrawnArrow = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M10,50 Q30,20 50,50 T90,50" />
    <path d="M70,35 L90,50 L75,65" />
  </svg>
);

export const CurvedArrow = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="3" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20,80 Q50,10 80,40" />
    <path d="M65,30 L80,40 L85,25" />
  </svg>
);