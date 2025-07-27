interface FireIconProps {
  width?: number
  height?: number
  className?: string
}

export default function FireIcon({ width = 24, height = 24, className = "" }: FireIconProps) {
  return (
    <div className={`inline-block ${className}`} style={{ width, height }}>
      <svg width="100%" height="100%" viewBox="0 0 24 24" className="fire-icon" preserveAspectRatio="xMidYMid meet">
        {/* Main flame only */}
        <path
          d="M12 2c-1.5 2.5-4 3.5-4 7 0 3 2 5 4 5s4-2 4-5c0-3.5-2.5-4.5-4-7z M10 8c-0.5 1.5-1 2-1 3.5 0 1 0.5 2 1.5 2s1.5-1 1.5-2c0-1.5-0.5-2-2-3.5z M14 8c0.5 1.5 1 2 1 3.5 0 1-0.5 2-1.5 2s-1.5-1-1.5-2c0-1.5 0.5-2 2-3.5z"
          className="flame flame-main"
          fill="url(#fireGradient1)"
        />

        <defs>
          <linearGradient id="fireGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.85 0.18 255)" />
            <stop offset="30%" stopColor="oklch(0.8 0.15 250)" />
            <stop offset="70%" stopColor="oklch(0.7482 0.1235 244.75)" />
            <stop offset="100%" stopColor="oklch(0.65 0.1 240)" />
          </linearGradient>
        </defs>
      </svg>

      <style jsx>{`
        .fire-icon {
          filter: drop-shadow(0 0 3px oklch(0.7482 0.1235 244.75 / 0.5));
        }
        
        .flame {
          animation: flicker 1.5s ease-in-out infinite alternate;
          transform-origin: bottom center;
        }
        
        .flame-main {
          animation: flicker 1.2s ease-in-out infinite alternate;
        }
        
        @keyframes flicker {
          0% {
            transform: scaleY(1) scaleX(1) rotate(-2deg);
            opacity: 1;
          }
          20% {
            transform: scaleY(0.9) scaleX(1.1) rotate(2deg);
            opacity: 0.85;
          }
          40% {
            transform: scaleY(1.1) scaleX(0.9) rotate(-1deg);
            opacity: 0.95;
          }
          60% {
            transform: scaleY(0.95) scaleX(1.05) rotate(1.5deg);
            opacity: 0.9;
          }
          80% {
            transform: scaleY(1.05) scaleX(0.95) rotate(-0.5deg);
            opacity: 0.92;
          }
          100% {
            transform: scaleY(1.02) scaleX(0.98) rotate(0.8deg);
            opacity: 0.98;
          }
        }
      `}</style>
    </div>
  )
}
