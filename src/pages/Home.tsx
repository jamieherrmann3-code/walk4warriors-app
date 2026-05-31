import { Link } from "react-router-dom";

function Home() {
  const eventDate = new Date("2026-09-19");
  const today = new Date();

  const daysRemaining = Math.ceil(
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="home-page">
      <section className="home-hero">
        <img src="/logo.png" alt="Walk 4 Warriors" />

        <a
          href="https://w4wvfw1318.redpodium.com/walk-4-warriors"
          target="_blank"
          rel="noopener noreferrer"
          className="hero-register-button"
        >
          Register / Donate →
        </a>
      </section>

      <section className="countdown-panel">
        <div className="countdown-number">{daysRemaining}</div>

        <div>
          <h2>
            Days Until
            <br />
            Walk 4 Warriors
          </h2>

          <p>
        Join Veterans, families, friends, and supporters as we walk together
        to raise awareness of the tragic reality of Veteran suicide and support
        Veterans in need through donations to local organizations serving our
        Veteran community.
        </p>
        </div>
      </section>

      <section className="home-tiles">
        <Link to="/train" className="home-tile blue">
          <div className="tile-icon">🥾</div>

          <h3>Train</h3>

          <p>Build up and prepare for event day.</p>
        </Link>

        <Link to="/track" className="home-tile red">
          <div className="tile-icon">📍</div>

          <h3>Track</h3>

          <p>Track your walks and stay motivated.</p>
        </Link>

        <Link to="/event" className="home-tile green">
          <div className="tile-icon">🗺</div>

          <h3>Event</h3>

          <p>Event details, routes, schedule, and what to know.</p>
        </Link>

        <Link to="/invite" className="home-tile purple">
          <div className="tile-icon">🤝</div>

          <h3>Invite</h3>

          <p>Invite others to walk with you.</p>
        </Link>
      </section>

      <section className="why-panel">
        <h2>Why We Walk</h2>

        <p>
          Walk for Warriors exists to honor our Veterans by raising awareness
          of the tragedy of Veteran suicide and supporting those who are
          struggling.
        </p>

        <p>
          Through community action, education, and donating proceeds to local
          organizations that provide direct services and assistance to Veterans,
          we work to ensure no Veteran walks alone.
        </p>

        <p>
          Walk for Warriors is a fully volunteer-driven effort, helping maximize
          the funds donated to local organizations serving Veterans in need.
        </p>

        <p className="why-quote">
          “No Veteran walks alone.”
        </p>
      </section>
    </div>
  );
}

export default Home;