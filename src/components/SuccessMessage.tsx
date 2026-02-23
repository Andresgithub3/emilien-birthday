import React from "react";
import butterflyLeft from "../assets/pictures/left.png";

const SuccessMessage: React.FC = () => {
  return (
    <section
      className="success section-container"
      aria-live="polite"
      aria-atomic="true"
    >
      <img
        src={butterflyLeft}
        alt=""
        aria-hidden="true"
        className="success-butterfly"
      />
      <h2 className="success-heading">Thank you!</h2>
      <p className="success-body">
        Your RSVP has been received. We can't wait to celebrate Natalia's
        special day with you!
      </p>
      <p className="success-footnote">
        If you have any questions, please reach out to the family directly.
      </p>

      <style>{`
        .success {
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: 2.5rem;
          background: var(--color-bg-card);
          border: 1px solid var(--color-accent-soft);
          border-radius: 20px;
          animation: success-fade-in 500ms ease forwards;
        }

        @keyframes success-fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .success { animation: none; }
        }

        .success-butterfly {
          position: absolute;
          width: 15rem;       
          height: auto;
          top: -4rem;         
          left: 3rem;        
          filter: drop-shadow(0 3px 10px rgba(155, 123, 184, 0.3));
          pointer-events: none;
        }

        .success-heading {
          position: relative;
          z-index: 1;
          font-family: var(--font-script);
          font-size: 3.2rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .success-body {
          position: relative;
          z-index: 1;
          font-size: 1.1rem;
          color: var(--color-text);
          max-width: 380px;
          margin: 0 auto 1rem;
          line-height: 1.75;
        }

        .success-footnote {
          position: relative;
          z-index: 1;
          font-size: 0.85rem;
          font-style: italic;
          color: var(--color-text-light);
        }
      `}</style>
    </section>
  );
};

export default SuccessMessage;
