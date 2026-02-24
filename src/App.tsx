import React, { useState } from 'react';
import InvitationCard from './components/InvitationCard';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPForm';
import SuccessMessage from './components/SuccessMessage';
import './index.css';

const App: React.FC = () => {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  return (
    <main className="page-wrapper">

      <InvitationCard />

      <div className="soft-divider" />

      <EventDetails />

      <div className="soft-divider" />

      {rsvpSubmitted ? (
        <SuccessMessage />
      ) : (
        <RSVPForm onSuccess={() => setRsvpSubmitted(true)} />
      )}

      <footer className="page-footer">
        <p>Can't wait to celebrate with you on Sesame Street! 🎉</p>
      </footer>

      <style>{`
        .page-footer {
          font-family: var(--font-body);
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-light);
          text-align: center;
          padding: 0.5rem 0 2rem;
          letter-spacing: 0.02em;
        }
      `}</style>
    </main>
  );
};

export default App;
