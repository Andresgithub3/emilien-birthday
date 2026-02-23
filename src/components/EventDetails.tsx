import React from 'react';

type DetailItem = {
  label: string;
  value: string;
  subvalue?: string;
};

const details: DetailItem[] = [
  {
    label: 'Date',
    value: 'Sunday, April 5th',
    subvalue: '2026',
  },
  {
    label: 'Time',
    value: '3:00 PM to 6:00 PM',
  },
  {
    label: 'Location',
    value: 'Orchards Residents Association - 4059 Orchards Drive SW Edmonton, AB  T6X 1W5',
    subvalue: 'Room: Cherry and Crabapple',
  },
  {
    label: 'RSVP by',
    value: 'March 15th, 2026',
  },
];

const EventDetails: React.FC = () => {
  return (
    <section className="event-details section-container" aria-label="Event details">
      <h2 className="event-details-heading">Party Details</h2>

      <div className="details-grid">
        {details.map((item) => (
          <div key={item.label} className="detail-card">
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
        href="https://maps.google.com/?q=4059+Orchards+Drive+SW,+Edmonton,+AB,+T6X+1W5"
        target="_blank"
        rel="noopener noreferrer"
        className="maps-link"
      >
        View on Google Maps ↗
      </a>

      <style>{`
        .event-details { text-align: center; }

        .event-details-heading {
          font-family: var(--font-script);
          font-size: 2.8rem;
          color: var(--color-primary);
          margin-bottom: 1.8rem;
        }

        .details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 480px) {
          .details-grid { grid-template-columns: 1fr; }
        }

        .detail-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-accent-soft);
          border-radius: 14px;
          padding: 1.2rem;
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          text-align: left;
          transition: box-shadow var(--transition-default),
                      transform var(--transition-default);
        }

        .detail-card:hover {
          box-shadow: 0 4px 20px rgba(155, 123, 184, 0.12);
          transform: translateY(-1px);
        }

        .detail-icon {
          font-size: 1.4rem;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .detail-label {
          font-size: 0.76rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-light);
          margin-bottom: 0.2rem;
        }

        .detail-value {
          font-size: 1rem;
          font-weight: 400;
          color: var(--color-text);
        }

        .detail-subvalue {
          font-size: 0.88rem;
          color: var(--color-text-light);
          margin-top: 0.1rem;
        }

        .maps-link {
          display: inline-block;
          font-size: 0.88rem;
          color: var(--color-primary);
          letter-spacing: 0.04em;
          text-decoration: none;
          border-bottom: 1px solid var(--color-accent-soft);
          padding-bottom: 1px;
          transition: color var(--transition-default),
                      border-color var(--transition-default);
        }

        .maps-link:hover {
          color: var(--color-primary-dark);
          border-color: var(--color-accent);
        }
      `}</style>
    </section>
  );
};

export default EventDetails;
