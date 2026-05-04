import { useState } from "react";
import "./App.css";

type Position = {
  latitude: number;
  longitude: number;
};

function getDistanceMiles(start: Position, end: Position) {
  const earthRadiusMiles = 3958.8;

  const lat1 = (start.latitude * Math.PI) / 180;
  const lat2 = (end.latitude * Math.PI) / 180;
  const deltaLat = ((end.latitude - start.latitude) * Math.PI) / 180;
  const deltaLon = ((end.longitude - start.longitude) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function App() {
  const [tracking, setTracking] = useState(false);
  const [lastPosition, setLastPosition] = useState<Position | null>(null);
  const [distance, setDistance] = useState(0);
  const [message, setMessage] = useState("");

  function startTracking() {
    if (!navigator.geolocation) {
      setMessage("GPS tracking is not supported on this device.");
      return;
    }

    setMessage("Starting GPS tracking...");
    setTracking(true);

    navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLastPosition((previousPosition) => {
          if (previousPosition) {
            const miles = getDistanceMiles(previousPosition, newPosition);
            setDistance((currentDistance) => currentDistance + miles);
          }

          return newPosition;
        });

        setMessage("Tracking your walk.");
      },
      () => {
        setMessage("Unable to access GPS. Check location permissions.");
        setTracking(false);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      }
    );
  }

  function resetTracking() {
    setTracking(false);
    setLastPosition(null);
    setDistance(0);
    setMessage("Tracker reset.");
  }

  return (
    <main className="app">
      <section className="hero">
        <img src="/logo.png" alt="Walk 4 Warriors" className="logo" />
        <h1>Walk 4 Warriors</h1>
        <p>September 19, 2026 • Madison, WI</p>
        <p className="tagline">Every step saves lives.</p>

        <div className="buttons">
          <a href="#challenges">Weekly Challenges</a>
          <a href="#routes">Routes</a>
          <a href="#tracker">Track My Walk</a>
        </div>
      </section>

      <section id="challenges" className="card">
        <h2>Weekly Challenges</h2>
        <p>Walk 15 minutes, 3 times this week.</p>
      </section>

      <section id="routes" className="card">
        <h2>Routes</h2>

        <div className="route-buttons">
          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            5K Route
          </a>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            10K Route
          </a>

          <a
            href="https://www.google.com/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            18K Route
          </a>
        </div>
      </section>

      <section id="tracker" className="card">
        <h2>Track My Walk</h2>
        <p className="distance">{distance.toFixed(2)} miles</p>
        <p>{message || "Tap start when you begin walking."}</p>

        <div className="tracker-buttons">
          <button onClick={startTracking} disabled={tracking}>
            {tracking ? "Tracking..." : "Start Tracking"}
          </button>

          <button onClick={resetTracking} className="secondary-button">
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;