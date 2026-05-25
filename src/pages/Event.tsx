function Event() {
  return (
    <div className="event-page">
      <section className="card event-hero-card">
        <h2>Event Day HQ</h2>

        <p className="section-intro">
          Everything you need to know for Walk 4 Warriors.
        </p>
      </section>

      <section className="event-info-grid">
        <div className="event-info-card">
          <span className="event-icon">📅</span>
          <h3>Date</h3>
          <p>September 19, 2026</p>
        </div>

        <div className="event-info-card">
          <span className="event-icon">⏰</span>
          <h3>Schedule</h3>
          <p>Check-in: 8:00 AM</p>
          <p>Ruck/Walk Start: 9:00 AM</p>
          <p>Start follows the National Anthem</p>
        </div>

        <div className="event-info-card">
          <span className="event-icon">📍</span>
          <h3>Location</h3>
          <p>VFW Post 1318</p>
          <p>2740 Ski Lane</p>
        </div>

        <div className="event-info-card">
          <span className="event-icon">🎒</span>
          <h3>What to Bring</h3>
          <p>Water</p>
          <p>Proper shoes</p>
          <p>Extra socks</p>
        </div>
      </section>

      <section className="card">
        <h2>Route Map</h2>

        <p className="section-intro">
          View the Walk 4 Warriors route map before event day.
        </p>

        <a
          href="https://www.google.com/maps/d/u/0/edit?mid=1mP3SbV3YzA9i2W_SO6apU3tHKerKIPE&usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="primary-button"
        >
          Open Route Map
        </a>
      </section>

      <section className="card">
        <h2>Before You Arrive</h2>

        <p>
          Drink plenty of fluids leading up to the ruck/walk. Come prepared,
          listen to your body, and take breaks as needed.
        </p>
      </section>

      <section className="card">
        <h2>Add to Your Phone</h2>

        <p className="section-intro">
          Save this app to your home screen for quick access on event day.
        </p>

        <div className="phone-instructions">
          <div className="phone-card">
            <h3>📱 iPhone Safari</h3>
            <ol>
              <li>Open this app in Safari.</li>
              <li>Tap the Share button.</li>
              <li>Scroll down and tap Add to Home Screen.</li>
              <li>Tap Add.</li>
            </ol>
          </div>

          <div className="phone-card">
            <h3>🤖 Android Chrome</h3>
            <ol>
              <li>Open this app in Chrome.</li>
              <li>Tap the three dots in the top right.</li>
              <li>Tap Add to Home screen or Install App.</li>
              <li>Tap Add.</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Event;