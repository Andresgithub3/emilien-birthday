import React from 'react';

const SuccessMessage: React.FC = () => {
  return (
    <section
      className="success section-container"
      aria-live="polite"
      aria-atomic="true"
    >
      <img
        src="/elmo.png"
        alt=""
        aria-hidden="true"
        className="success-elmo"
      />
      <h2 className="success-heading">Thank you!</h2>
      <p className="success-body">
        Your RSVP has been received. We can't wait to celebrate Emilien's
        2nd birthday with you on Sesame Street!
      </p>
      <p className="success-footnote">
        If you have any questions, please reach out to the family directly.
      </p>

      <style>{`
        .success {
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: 2.5rem 2rem 2rem;
          background: #fff;
          border: 3px solid var(--color-yellow);
          border-radius: 20px;
          box-shadow: 0 6px 0 var(--color-yellow-dark), 0 10px 30px rgba(249,193,14,0.2);
          animation: success-fade-in 500ms ease forwards;
        }

        @keyframes success-fade-in {
          from { opacity: 0; transform: translateY(14px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .success { animation: none; }
        }

        .success-elmo {
          width: 130px;
          height: auto;
          margin: 0 auto 1rem;
          display: block;
          filter: drop-shadow(0 4px 12px rgba(230,61,47,0.25));
          animation: elmo-bounce 1s ease-in-out infinite alternate;
        }

        @keyframes elmo-bounce {
          from { transform: translateY(0); }
          to   { transform: translateY(-8px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .success-elmo { animation: none; }
        }

        .success-heading {
          font-family: var(--font-display);
          font-size: 3rem;
          color: var(--color-primary);
          text-shadow: 3px 3px 0 var(--color-primary-dark);
          margin-bottom: 1rem;
        }

        .success-body {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--color-text);
          max-width: 380px;
          margin: 0 auto 1rem;
          line-height: 1.75;
        }

        .success-footnote {
          font-size: 0.85rem;
          color: var(--color-text-light);
        }
      `}</style>
    </section>
  );
};

export default SuccessMessage;
