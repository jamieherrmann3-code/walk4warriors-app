import { useEffect, useState } from "react";

type Position = {
  latitude: number;
  longitude: number;
};

const encouragementMessages = [
  "Every step saves lives.",
  "Walk at your own pace.",
  "Progress matters more than speed.",
  "Thanks for walking with us.",
  "No one walks alone.",
];

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

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function getMilestoneMessage(distance: number) {
  if (distance >= 11.18) {
    return "You reached an 18K distance — thank you for showing up with purpose.";
  }

  if (distance >= 6.21) {
    return "You reached a 10K distance — one step at a time, you’re making a difference.";
  }

  if (distance >= 3.11) {
    return "You reached a 5K distance — every step supports the mission.";
  }

  if (distance >= 1) {
    return "You reached your first mile — great job getting moving today.";
  }

  return "";
}

function Track() {
  const [tracking, setTracking] = useState(false);
  const [paused, setPaused] = useState(false);
  const [, setLastPosition] = useState<Position | null>(null);
  const [distance, setDistance] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [message, setMessage] = useState("");
  const [watchId, setWatchId] = useState<number | null>(null);
  const [encouragementIndex, setEncouragementIndex] = useState(0);

  useEffect(() => {
    if (!tracking || paused) return;

    const timer = window.setInterval(() => {
      setElapsedSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [tracking, paused]);

  useEffect(() => {
    if (!tracking || paused) return;

    const messageTimer = window.setInterval(() => {
      setEncouragementIndex(
        (currentIndex) => (currentIndex + 1) % encouragementMessages.length
      );
    }, 8000);

    return () => window.clearInterval(messageTimer);
  }, [tracking, paused]);

  function startTracking() {
    if (!navigator.geolocation) {
      setMessage("GPS tracking is not supported on this device.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        setLastPosition((previousPosition) => {
          if (previousPosition && !paused) {
            const miles = getDistanceMiles(previousPosition, newPosition);

            setDistance((currentDistance) => {
              const updatedDistance = currentDistance + miles;
              const milestoneMessage = getMilestoneMessage(updatedDistance);

              if (milestoneMessage) {
                setMessage(milestoneMessage);
              } else {
                setMessage(encouragementMessages[encouragementIndex]);
              }

              return updatedDistance;
            });
          }

          return newPosition;
        });
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

    setWatchId(id);
    setTracking(true);
    setPaused(false);
    setMessage(encouragementMessages[0]);
  }

  function togglePause() {
    setPaused((currentPaused) => !currentPaused);
    setMessage(paused ? "Tracking your walk." : "Tracking paused.");
  }

  function resetTracking() {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
    }

    setTracking(false);
    setPaused(false);
    setLastPosition(null);
    setDistance(0);
    setElapsedSeconds(0);
    setMessage("Thanks for getting out and walking today.");
    setWatchId(null);
    setEncouragementIndex(0);
  }

  return (
    <div className="track-page">
      <div className="page-title">
        <h1>Track My Walk</h1>
      </div>

    <div className="card">
      <p className="tracking-intro">
        You’re walking beside a community that cares about our Veterans.
      </p>

      {tracking && !paused && (
        <div className="live-indicator">
          <span className="pulse-dot"></span>
          <span>Walk in progress</span>
        </div>
      )}

      <div className="tracker-stats">
        <div>
          <span className="stat-label">Distance</span>
          <p className="distance">{distance.toFixed(2)} miles</p>
        </div>

        <div>
          <span className="stat-label">Time</span>
          <p className="distance">{formatTime(elapsedSeconds)}</p>
        </div>
      </div>

      <p className="tracking-message">
        {message || "Tap start when you begin walking."}
      </p>

      <div className="tracker-buttons">
        <button onClick={startTracking} disabled={tracking && !paused}>
          {!tracking
            ? "Start Tracking"
            : paused
            ? "Resume Tracking"
            : "Tracking..."}
        </button>

        {tracking && (
          <button onClick={togglePause} className="secondary-button">
            {paused ? "Resume" : "Pause"}
          </button>
        )}

        <button onClick={resetTracking} className="secondary-button">
          Reset
        </button>
           </div>
    </div>
  </div>
  );
}

export default Track;