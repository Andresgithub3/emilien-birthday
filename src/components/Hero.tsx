import React from 'react';

const ButterflyLeft: React.FC = () => (
  <svg
    viewBox="0 0 140 120"
    className="butterfly butterfly-left"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="wing-l-top" cx="60%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#ddb8ee" stopOpacity="0.9" />
        <stop offset="55%" stopColor="#b87fd4" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#9b5fba" stopOpacity="0.25" />
      </radialGradient>
      <radialGradient id="wing-l-bot" cx="55%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ecd4f8" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#c49bdb" stopOpacity="0.35" />
      </radialGradient>
    </defs>
    {/* Upper wing */}
    <path
      d="M72,62 C60,28 12,12 5,42 C-1,65 36,72 72,62Z"
      fill="url(#wing-l-top)"
      stroke="#c49bdb"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />
    {/* Lower wing */}
    <path
      d="M72,62 C54,70 18,94 24,108 C34,122 65,100 72,62Z"
      fill="url(#wing-l-bot)"
      stroke="#c49bdb"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />
    {/* Wing vein details */}
    <path d="M72,62 C55,50 20,28 8,22" stroke="#b87fd4" strokeWidth="0.4" fill="none" strokeOpacity="0.35" />
    <path d="M72,62 C48,60 22,64 10,58" stroke="#b87fd4" strokeWidth="0.4" fill="none" strokeOpacity="0.3" />
    <path d="M72,62 C58,72 36,90 30,102" stroke="#b87fd4" strokeWidth="0.4" fill="none" strokeOpacity="0.3" />
    {/* Body */}
    <ellipse cx="73" cy="62" rx="3" ry="16" fill="#9b7bb8" opacity="0.75" />
    {/* Head */}
    <circle cx="73" cy="46" r="3.5" fill="#9b7bb8" opacity="0.7" />
    {/* Antennae */}
    <path d="M72,44 Q64,28 60,18" stroke="#9b7bb8" strokeWidth="0.9" fill="none" strokeOpacity="0.65" />
    <circle cx="59" cy="17" r="2" fill="#9b7bb8" opacity="0.65" />
    <path d="M74,44 Q80,28 84,18" stroke="#9b7bb8" strokeWidth="0.9" fill="none" strokeOpacity="0.65" />
    <circle cx="85" cy="17" r="2" fill="#9b7bb8" opacity="0.65" />
  </svg>
);

const ButterflyRight: React.FC = () => (
  <svg
    viewBox="0 0 140 120"
    className="butterfly butterfly-right"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="wing-r-top" cx="40%" cy="40%" r="65%">
        <stop offset="0%" stopColor="#ddb8ee" stopOpacity="0.9" />
        <stop offset="55%" stopColor="#b87fd4" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#9b5fba" stopOpacity="0.25" />
      </radialGradient>
      <radialGradient id="wing-r-bot" cx="45%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#ecd4f8" stopOpacity="0.85" />
        <stop offset="100%" stopColor="#c49bdb" stopOpacity="0.35" />
      </radialGradient>
    </defs>
    {/* Upper wing - mirrored */}
    <path
      d="M68,62 C80,28 128,12 135,42 C141,65 104,72 68,62Z"
      fill="url(#wing-r-top)"
      stroke="#c49bdb"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />
    {/* Lower wing - mirrored */}
    <path
      d="M68,62 C86,70 122,94 116,108 C106,122 75,100 68,62Z"
      fill="url(#wing-r-bot)"
      stroke="#c49bdb"
      strokeWidth="0.6"
      strokeOpacity="0.5"
    />
    {/* Wing vein details */}
    <path d="M68,62 C85,50 120,28 132,22" stroke="#b87fd4" strokeWidth="0.4" fill="none" strokeOpacity="0.35" />
    <path d="M68,62 C92,60 118,64 130,58" stroke="#b87fd4" strokeWidth="0.4" fill="none" strokeOpacity="0.3" />
    <path d="M68,62 C82,72 104,90 110,102" stroke="#b87fd4" strokeWidth="0.4" fill="none" strokeOpacity="0.3" />
    {/* Body */}
    <ellipse cx="67" cy="62" rx="3" ry="16" fill="#9b7bb8" opacity="0.75" />
    {/* Head */}
    <circle cx="67" cy="46" r="3.5" fill="#9b7bb8" opacity="0.7" />
    {/* Antennae */}
    <path d="M68,44 Q76,28 80,18" stroke="#9b7bb8" strokeWidth="0.9" fill="none" strokeOpacity="0.65" />
    <circle cx="81" cy="17" r="2" fill="#9b7bb8" opacity="0.65" />
    <path d="M66,44 Q60,28 56,18" stroke="#9b7bb8" strokeWidth="0.9" fill="none" strokeOpacity="0.65" />
    <circle cx="55" cy="17" r="2" fill="#9b7bb8" opacity="0.65" />
  </svg>
);

const Hero: React.FC = () => {
  return (
    <header className="hero section-container">
      <div className="hero-butterflies">
        <ButterflyLeft />
        <ButterflyRight />
      </div>

      <div className="hero-text">
        <p className="hero-join-us">join us for</p>
        <h1 className="hero-name">Natalia's</h1>
        <p className="hero-subtitle">
          <span className="hero-ordinal">1</span>
          <sup className="hero-sup">st</sup>
          <span className="hero-birthday-script"> birthday</span>
        </p>
      </div>

      <style>{`
        .hero {
          text-align: center;
          padding-top: 2.5rem;
          position: relative;
        }

        .hero-butterflies {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          position: relative;
          margin-bottom: -3rem;
          pointer-events: none;
        }

        .butterfly {
          width: 150px;
          height: auto;
          filter: drop-shadow(0 3px 10px rgba(155, 123, 184, 0.3));
        }

        .butterfly-left {
          transform: rotate(-12deg) translateY(10px);
          animation: float-left 7s ease-in-out infinite;
        }

        .butterfly-right {
          transform: rotate(12deg) translateY(10px);
          animation: float-right 7s ease-in-out infinite 2s;
        }

        @keyframes float-left {
          0%, 100% { transform: rotate(-12deg) translateY(10px); }
          50%       { transform: rotate(-12deg) translateY(2px); }
        }

        @keyframes float-right {
          0%, 100% { transform: rotate(12deg) translateY(10px); }
          50%       { transform: rotate(12deg) translateY(2px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .butterfly-left, .butterfly-right { animation: none; }
        }

        /* Watercolor blob background behind the text */
        .hero-text {
          position: relative;
          z-index: 1;
          padding: 1.5rem 1rem 2rem;
        }

        .hero-text::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 70% at 50% 55%, rgba(193, 156, 216, 0.18) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-join-us {
          font-family: var(--font-body);
          font-size: 0.85rem;
          font-style: italic;
          letter-spacing: 0.35em;
          color: var(--color-accent);
          text-transform: uppercase;
          margin-bottom: 0.6rem;
        }

        .hero-name {
          font-family: var(--font-script);
          font-size: clamp(4.5rem, 16vw, 7.5rem);
          color: var(--color-primary);
          line-height: 1;
          margin-bottom: 0.4rem;
          text-shadow: 0 2px 16px rgba(155, 123, 184, 0.25);
        }

        .hero-subtitle {
          font-family: var(--font-body);
          font-size: 1.1rem;
          letter-spacing: 0.05em;
          color: var(--color-text-light);
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.15rem;
        }

        .hero-ordinal {
          font-size: 2.2rem;
          font-weight: 300;
          color: #b8963e;
        }

        .hero-sup {
          font-size: 1rem;
          color: #b8963e;
        }

        .hero-birthday-script {
          font-family: var(--font-script);
          font-size: 2.8rem;
          color: var(--color-primary);
          margin-left: 0.3rem;
        }

        @media (max-width: 480px) {
          .butterfly { width: 100px; }
          .hero-butterflies { margin-bottom: -2rem; }
        }
      `}</style>
    </header>
  );
};

export default Hero;
