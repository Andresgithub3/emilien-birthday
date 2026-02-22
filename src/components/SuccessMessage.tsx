import React from 'react';

const SuccessMessage: React.FC = () => {
  return (
    <section
      className="success section-container"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="success-icon" aria-hidden="true">🦋</div>
      <h2 className="success-heading">Thank you!</h2>
      <p className="success-body">
        Your RSVP has been received. We can't wait to celebrate
        Natalia's special day with you!
      </p>
      <p className="success-footnote">
        If you have any questions, please reach out to the family directly.
      </p>

      <style>{`
        .success {
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

        .success-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          display: block;
        }

        .success-heading {
          font-family: var(--font-script);
          font-size: 3.2rem;
          color: var(--color-primary);
          margin-bottom: 1rem;
        }

        .success-body {
          font-size: 1.1rem;
          color: var(--color-text);
          max-width: 380px;
          margin: 0 auto 1rem;
          line-height: 1.75;
        }

        .success-footnote {
          font-size: 0.85rem;
          font-style: italic;
          color: var(--color-text-light);
        }
      `}</style>
    </section>
  );
};

export default SuccessMessage;
