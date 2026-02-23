import React from 'react';

const InvitationCard: React.FC = () => {
  return (
    <section className="invitation-card-section section-container" aria-label="Invitation">
      <div className="invitation-card-wrapper">
        <img
          src="/invitation.png"
          alt="Natalia's 1st Birthday Invitation"
          className="invitation-card-img"
        />
      </div>

      <style>{`
        .invitation-card-section {
          display: flex;
          justify-content: center;
        }

        .invitation-card-wrapper {
          width: 100%;
          max-width: 420px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow:
            0 8px 32px rgba(155, 123, 184, 0.22),
            0 2px 8px rgba(155, 123, 184, 0.12);
          transition: transform 300ms ease, box-shadow 300ms ease;
        }

        .invitation-card-wrapper:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow:
            0 16px 48px rgba(155, 123, 184, 0.28),
            0 4px 16px rgba(155, 123, 184, 0.16);
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
        }
      `}</style>
    </section>
  );
};

export default InvitationCard;
