import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

export default function Logo({ size = 28, className = '' }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#2563EB" />
      {/* Linha de tendência ascendente */}
      <polyline
        points="6,24 13,14 19,18 26,8"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Ponto de destaque no topo */}
      <circle cx="26" cy="8" r="2.5" fill="#10B981" />
      {/* Base da área */}
      <polyline
        points="6,24 26,24"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
