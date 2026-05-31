function Event() {
  return (
    <div className="event-page">
      <section className="card event-hero-card">
        <h2>Event Day HQ</h2>

        <p className="section-intro">
          Schedule, location, route, and event-day reminders.
        </p>
      </section>

      <section className="event-info-grid">
        <div className="event-info-card">
          <span className="event-icon">📅</span>
          <h3>Date</h3>
          <p>Saturday, September 19, 2026</p>
        </div>

        <div className="event-info-card">
          <span className="event-icon">⏰</span>
          <h3>Schedule</h3>
          <p>Check-in: 8:00 AM</p>
          <p>Kickoff: 9:00 AM</p>
          <p>Ruck/Walk begins after the National Anthem</p>
        </div>

        <div className="event-info-card">
          <span className="event-icon">📍</span>
          <h3>Location</h3>
          <p>VFW Post 1318</p>
          <p>2740 Ski Lane</p>
          <p>Madison, WI</p>
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
          View the Walk 4 Warriors route before event day.
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

    
    </div>
  );
}

export default Event;