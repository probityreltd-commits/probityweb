// app/loading.js
// Full-screen loading state: banner/hero night-gradient background
// + single-line house icon that draws in fast once, then stays fully
// visible with a gentle idle pulse (never fully hides/reappears).

export default function Loading() {
  return (
    <div className="hla-screen">
      <style>{`
        .hla-screen {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(120% 100% at 50% 20%, var(--color-night-mid, #2a1260) 0%, transparent 60%),
            linear-gradient(180deg, var(--color-night, #0a0518) 0%, var(--color-night-deep, #0f041a) 55%, var(--color-night-abyss, #05010a) 100%);
        }

        .hla-icon {
          display: block;
          background: transparent;
          overflow: visible;
        }

        .hla-icon .hla-line {
          fill: none;
          stroke: #efd448;
          stroke-width: 4.5;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
          animation-iteration-count: 1;
        }

        /* fast, staggered draw-in — each part draws once and stays */
        .hla-icon .hla-roof    { animation-name: hla-draw; animation-duration: .35s; animation-delay: 0s; }
        .hla-icon .hla-chimney { animation-name: hla-draw; animation-duration: .25s; animation-delay: .28s; }
        .hla-icon .hla-wall    { animation-name: hla-draw; animation-duration: .3s;  animation-delay: .48s; }
        .hla-icon .hla-window  { animation-name: hla-draw; animation-duration: .22s; animation-delay: .72s; }
        .hla-icon .hla-door    { animation-name: hla-draw; animation-duration: .28s; animation-delay: .9s; }

        @keyframes hla-draw {
          from { stroke-dashoffset: 1; }
          to   { stroke-dashoffset: 0; }
        }

        /* once fully built (~1.2s in), breathe gently — never fully disappears */
        .hla-icon .hla-group {
          animation: hla-pulse 1.8s ease-in-out 1.2s infinite;
        }

        @keyframes hla-pulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.72; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hla-icon .hla-line {
            animation: none !important;
            stroke-dashoffset: 0;
          }
          .hla-icon .hla-group {
            animation: none !important;
            opacity: 1;
          }
        }
      `}</style>

      <svg
        viewBox="0 0 100 100"
        width="72"
        height="72"
        className="hla-icon"
        role="img"
        aria-label="Loading"
      >
        <g className="hla-group">
          {/* roof, drawn left eave -> peak -> right eave */}
          <path
            className="hla-line hla-roof"
            pathLength="1"
            d="M10 52 L51 15 L92 52"
          />

          {/* chimney box on the right roof slope */}
          <path
            className="hla-line hla-chimney"
            pathLength="1"
            d="M63 44 V21 H75 V40"
          />

          {/* wall body */}
          <path
            className="hla-line hla-wall"
            pathLength="1"
            d="M25 52 V88 H78 V52"
          />

          {/* window */}
          <circle
            className="hla-line hla-window"
            pathLength="1"
            cx="38"
            cy="63"
            r="9"
          />

          {/* door */}
          <path
            className="hla-line hla-door"
            pathLength="1"
            d="M52 88 V62 H68 V88"
          />
        </g>
      </svg>
    </div>
  );
}
