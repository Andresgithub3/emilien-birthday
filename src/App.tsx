import React, { useState } from 'react';
// import Hero from './components/Hero';
import InvitationCard from './components/InvitationCard';
import EventDetails from './components/EventDetails';
import RSVPForm from './components/RSVPForm';
import SuccessMessage from './components/SuccessMessage';
import './index.css';

const App: React.FC = () => {
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  return (
    <main className="page-wrapper">
      {/* <Hero /> */}

      <div className="soft-divider" />

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
        <p>With love, celebrating Natalia's first trip around the sun. We can't wait to see you there!</p>
      </footer>

      <style>{`
        .page-footer {
          font-size: 0.82rem;
          font-style: italic;
          color: var(--color-text-light);
          text-align: center;
          padding: 0.5rem 0 2rem;
          letter-spacing: 0.04em;
        }
      `}</style>
    </main>
  );
};

export default App;
