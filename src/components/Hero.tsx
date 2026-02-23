import React from "react";
import butterflyLeft from "../assets/pictures/left.png";
import butterflyRight from "../assets/pictures/right.png";

const Hero: React.FC = () => {
  return (
    <header className="hero section-container">
      <div className="hero-butterflies">
        <img
          src={butterflyLeft}
          alt=""
          aria-hidden="true"
          className="butterfly butterfly-left"
        />
        <img
          src={butterflyRight}
          alt=""
          aria-hidden="true"
          className="butterfly butterfly-right"
        />
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
          padding-top: 5rem;
        }

        .hero-butterflies {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          pointer-events: none;
        }

        .butterfly {
          width: 25rem;
          height: auto;
          filter: drop-shadow(0 3px 10px rgba(155, 123, 184, 0.3));
        }

        .butterfly-left {
          transform: rotate(-12deg) translateY(5px) translateX(-150px);
          animation: float-left 7s ease-in-out infinite;
        }

        .butterfly-right {
          transform: rotate(12deg) translateY(10px) translateX(50px);
          animation: float-right 7s ease-in-out infinite 2s;
        }

        @keyframes float-left {
          0%, 100% { transform: rotate(-12deg) translateY(5px) translateX(-150px); }
          50%       { transform: rotate(-12deg) translateY(-3px) translateX(-150px); }
        }

        @keyframes float-right {
          0%, 100% { transform: rotate(12deg) translateY(10px) translateX(50px); }
          50%       { transform: rotate(12deg) translateY(2px) translateX(50px); }
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
          font-weight: normal;
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
          font-size: clamp(4.5rem, 16vw, 7.5rem);
          font-weight: 300;
          color: #b8963e;
          line-height: 1;
        }

        .hero-sup {
          font-size: clamp(1.5rem, 5vw, 2.5rem);
          color: #b8963e;
        }

        .hero-birthday-script {
          font-family: var(--font-script);
          font-size: clamp(4.5rem, 16vw, 7.5rem);
          font-weight: normal;
          color: var(--color-primary);
          margin-left: 0.3rem;
          line-height: 1;
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
