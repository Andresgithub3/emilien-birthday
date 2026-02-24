import React from 'react';

type DetailItem = {
  label: string;
  value: string;
  subvalue?: string;
  emoji: string;
  color: string;
};

const details: DetailItem[] = [
  {
    label: 'Date',
    value: 'Sunday, April 19th',
    subvalue: '2026',
    emoji: '📅',
    color: '#e63d2f',
  },
  {
    label: 'Time',
    value: '3:00 PM',
    emoji: '⏰',
    color: '#1a8fc1',
  },
  {
    label: 'Location',
    value: '16720 64 St NW',
    subvalue: 'Edmonton, Alberta',
    emoji: '📍',
    color: '#4caf50',
  },
  {
    label: 'RSVP by',
    value: 'March 31st, 2026',
    emoji: '✉️',
    color: '#f47b20',
  },
];

const EventDetails: React.FC = () => {
  return (
    <section className="event-details section-container" aria-label="Event details">
      <div className="characters-banner">
        <img
          src="/sesame-characters.png"
          alt="Sesame Street characters"
          className="characters-img"
        />
      </div>

      <h2 className="event-details-heading">Party Details</h2>

      <div className="details-grid">
        {details.map((item) => (
          <div
            key={item.label}
            className="detail-card"
            style={{ borderTopColor: item.color }}
          >
            <div className="detail-emoji">{item.emoji}</div>
            <div className="detail-text">
              <p className="detail-label">{item.label}</p>
              <p className="detail-value">{item.value}</p>
              {item.subvalue && (
                <p className="detail-subvalue">{item.subvalue}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <a
        href="https://maps.google.com/?q=16720+64+St+NW,+Edmonton,+AB"
        target="_blank"
        rel="noopener noreferrer"
        className="maps-link"
      >
        View on Google Maps ↗
      </a>

      <style>{`
        .event-details { text-align: center; }

        .characters-banner {
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .characters-img {
          max-width: 100%;
          width: 520px;
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.1));
        }

        .event-details-heading {
          font-family: var(--font-display);
          font-size: 2.6rem;
          color: var(--color-primary);
          text-shadow: 3px 3px 0 var(--color-primary-dark);
          margin-bottom: 1.8rem;
          letter-spacing: 0.03em;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 480px) {
          .details-grid { grid-template-columns: 1fr; }
          .characters-img { width: 100%; }
        }

        .detail-card {
          background: #fff;
          border: 2px solid var(--color-accent-soft);
          border-top: 4px solid;
          border-radius: 14px;
          padding: 1.2rem;
          display: flex;
          align-items: flex-start;
          gap: 0.8rem;
          text-align: left;
          transition: box-shadow var(--transition-default),
                      transform var(--transition-default);
          box-shadow: 0 3px 0 var(--color-accent-soft);
        }

        .detail-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          transform: translateY(-2px);
        }

        .detail-emoji {
          font-size: 1.6rem;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .detail-label {
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-light);
          margin-bottom: 0.2rem;
        }

        .detail-value {
          font-size: 1rem;
          font-weight: 700;
          color: var(--color-text);
          font-family: var(--font-body);
        }

        .detail-subvalue {
          font-size: 0.88rem;
          color: var(--color-text-light);
          margin-top: 0.1rem;
        }

        .maps-link {
          display: inline-block;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--color-blue);
          letter-spacing: 0.03em;
          text-decoration: none;
          border-bottom: 2px solid var(--color-blue);
          padding-bottom: 1px;
          transition: color var(--transition-default),
                      border-color var(--transition-default);
        }

        .maps-link:hover {
          color: var(--color-blue-dark);
          border-color: var(--color-blue-dark);
        }
      `}</style>
    </section>
  );
};

export default EventDetails;
