import React from 'react';

const InvitationCard: React.FC = () => {
  return (
    <section className="invitation-card-section section-container" aria-label="Invitation">
      <div className="invitation-card-wrapper">
        <img
          src="/invitation.png"
          alt="Emilien's 2nd Birthday Party Invitation"
          className="invitation-card-img"
        />
      </div>

      <style>{`
        .invitation-card-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.2rem;
        }

        .invitation-header {
          display: flex;
          align-items: center;
          gap: 0.7rem;
        }

        .sesame-badge {
          background: var(--color-yellow);
          color: var(--color-text);
          font-family: var(--font-display);
          font-size: 1.1rem;
          padding: 0.2rem 0.6rem;
          border-radius: 6px;
          border: 2px solid #ccc;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
          letter-spacing: 0.05em;
        }

        .invitation-title {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--color-primary);
          text-shadow: 2px 2px 0 var(--color-primary-dark);
          letter-spacing: 0.04em;
        }

        .invitation-card-wrapper {
          width: 100%;
          max-width: 420px;
          border-radius: 20px;
          overflow: hidden;
          border: 4px solid var(--color-yellow);
          box-shadow:
            0 6px 0 var(--color-yellow-dark),
            0 10px 32px rgba(249,193,14,0.25),
            0 2px 8px rgba(0,0,0,0.12);
          transition: transform 300ms ease, box-shadow 300ms ease;
        }

        .invitation-card-wrapper:hover {
          transform: translateY(-5px) rotate(0.5deg);
          box-shadow:
            0 10px 0 var(--color-yellow-dark),
            0 18px 48px rgba(249,193,14,0.3),
            0 4px 16px rgba(0,0,0,0.15);
        }

        .invitation-card-img {
          width: 100%;
          height: auto;
          display: block;
        }

        @media (max-width: 480px) {
          .invitation-card-wrapper {
            max-width: 100%;
            border-radius: 14px;
          }
          .invitation-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </section>
  );
};

export default InvitationCard;
