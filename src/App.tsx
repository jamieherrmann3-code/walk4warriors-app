import { useEffect, useRef, useState } from "react";
import "./App.css";
import { collection, doc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

type Position = {
  latitude: number;
  longitude: number;
};
type Participant = {
  id: string;
  name: string;
  bibNumber: string;
  distance: string;
  status: string;
  checkInTime?: string;
  checkOutTime?: string;
};

const weeklySteps = [
  "Week 1: Try walking 10–15 minutes up to 3x this week",
  "Week 2: Try walking 15 minutes up to 3x",
  "Week 3: Try walking 20 minutes up to 3x",
  "Week 4: Try walking 25 minutes up to 3x",
  "Week 5: Try walking 30 minutes up to 3x",
  "Week 6: Consider adding one longer walk, around 40 minutes",
  "Week 7: Try a few shorter walks and one longer walk if you feel ready",
  "Week 8: Optional milestone — try a 5K distance",
  "Week 9: Try walking 35 minutes up to 3x",
  "Week 10: Try walking 40 minutes up to 3x",
  "Week 11: Optional — one 5K walk plus one longer walk",
  "Week 12: Try walking 45 minutes up to 3x",
  "Week 13: Optional milestone — try 7–8K",
  "Week 14: Try walking 50 minutes up to 3x",
  "Week 15: Optional milestone — try a 10K training walk",
  "Week 16: Try walking 60 minutes 1–3x",
  "Week 17: Optional longer walk — 10–12K if you feel ready",
  "Week 18: Maintain movement that feels good",
  "Week 19: Light walks, stretch, and stay loose",
  "Week 20: Event week — rest, hydrate, and join us Saturday 9/19, checkin at 8:00 am",
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

function App() {
  const [volunteerMode, setVolunteerMode] = useState(
  localStorage.getItem("volunteerMode") === "true");
  const [tracking, setTracking] = useState(false);
  const [, setLastPosition] = useState<Position | null>(null);
  const [distance, setDistance] = useState(0);
  const [message, setMessage] = useState("");
  const watchIdRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  
  const [paused, setPaused] = useState(false);
  const [walkPath, setWalkPath] = useState<Position[]>([]);
  const [seconds, setSeconds] = useState(0);

  const [activeSection, setActiveSection] = useState("");
  const [participantName, setParticipantName] = useState(
  localStorage.getItem("participantName") || "");
  const [bibNumber, setBibNumber] = useState(
  localStorage.getItem("bibNumber") || "");
  const [eventDistance, setEventDistance] = useState(
  localStorage.getItem("eventDistance") || "5K");
  const [checkInTime, setCheckInTime] = useState(
  localStorage.getItem("checkInTime") || "");
  const [checkOutTime, setCheckOutTime] = useState(
  localStorage.getItem("checkOutTime") || "");
  const [eventStatus, setEventStatus] = useState(
  localStorage.getItem("eventStatus") || "Not Checked In");
  const [checkedWeeks, setCheckedWeeks] = useState<boolean[]>(() =>
  JSON.parse(localStorage.getItem("checkedWeeks") || "[]"));
  const completedCount = checkedWeeks.filter(Boolean).length;
  const progressPercent = Math.round(
  (completedCount / weeklySteps.length) * 100);

async function shareToFacebook() {
  const url = "https://w4wvfw1318.redpodium.com/walk-4-warriors";

  const message = `I'm getting ready for Walk 4 Warriors 🇺🇸

I'll be walking on September 19 to support veterans.

Join me or support the mission:
${url}`;

  try {
    await navigator.clipboard.writeText(message);
    alert("Invite message copied! Right-Click to paste it into your post.");

    setTimeout(() => {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        "_blank"
      );
    }, 500);
  } catch {
    alert("Copy did not work. Enter your message to friends.");
  }
}

  function getEncouragementMessage() {
    if (completedCount === 0) {
      return "No pressure — start wherever you are. Every step counts.";
    }
    if (completedCount < 5) {
      return "Great start. Keep moving in a way that works for you.";
    }
    if (completedCount < 10) {
      return "You’re building momentum one step at a time.";
    }
    if (completedCount < 15) {
      return "You’re showing up with purpose. Keep going.";
    }
    if (completedCount < 20) {
      return "You’re getting close. Stay steady and listen to your body.";
    }
    return "Amazing — you followed the full path toward September!";
  }

  function toggleWeek(index: number) {
    const updated = [...checkedWeeks];
    updated[index] = !updated[index];
    setCheckedWeeks(updated);
    localStorage.setItem("checkedWeeks", JSON.stringify(updated));
  }

  function resetWeeklyProgress() {
    setCheckedWeeks([]);
    localStorage.removeItem("checkedWeeks");
  }

  function startTracking() {
    if (!navigator.geolocation) {
      setMessage("GPS not supported.");
      return;
    }

    setTracking(true);
    
    timerRef.current = window.setInterval(() => {
    setSeconds((s) => s + 1);
     }, 1000);
    watchIdRef.current = navigator.geolocation.watchPosition(
  (position) => {
    const newPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setWalkPath((path) => [...path, newPosition]);

    setLastPosition((prev) => {
      if (prev) {
        const miles = getDistanceMiles(prev, newPosition);
        setDistance((d) => d + miles);
      }
      return newPosition;
    });

    setMessage("Tracking your walk");
  },
      () => {
        setMessage("Enable location permissions");
        setTracking(false);
      },
      { enableHighAccuracy: true }
    );
  }
function pauseTracking() {
  if (watchIdRef.current !== null) {
    navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
  }

  if (timerRef.current !== null) {
    window.clearInterval(timerRef.current);
    timerRef.current = null;
  }

  setPaused(true);
  setTracking(false);
  setMessage("Tracking paused");
}

function resumeTracking() {
  setPaused(false);
  startTracking();
}
 function resetTracking() {
  if (watchIdRef.current !== null) {
    navigator.geolocation.clearWatch(watchIdRef.current);
    watchIdRef.current = null;
  }

  if (timerRef.current !== null) {
    window.clearInterval(timerRef.current);
    timerRef.current = null;
  }

  setTracking(false);
  setPaused(false);
  setLastPosition(null);

  setDistance(0);
  setSeconds(0);
  setWalkPath([]);

  setMessage("Tracker reset");
}
function formatTime(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

async function saveParticipantToFirebase(status: string) {
  if (!bibNumber.trim()) return;

  await setDoc(
    doc(db, "participants_test", bibNumber.trim()),
    {
      name: participantName.trim(),
      bibNumber: bibNumber.trim(),
      distance: eventDistance,
      status,
      checkInTime,
      checkOutTime,
      lastUpdated: new Date().toISOString(),
    },
    { merge: true }
  );
}
async function checkInParticipant() {
  if (!participantName.trim() || !bibNumber.trim()) {
    alert("Please enter your name and bib number.");
    return;
  }

  const now = new Date().toLocaleString();

  localStorage.setItem("participantName", participantName);
  localStorage.setItem("bibNumber", bibNumber);
  localStorage.setItem("eventDistance", eventDistance);
  localStorage.setItem("checkInTime", now);
  localStorage.setItem("eventStatus", "Still Out");

  setCheckInTime(now);
  setCheckOutTime("");
  setEventStatus("Still Out");

  await saveParticipantToFirebase("Still Out");

  startTracking();
}

async function checkOutParticipant() {
  const now = new Date().toLocaleString();

  localStorage.setItem("checkOutTime", now);
  localStorage.setItem("eventStatus", "Finished");

  setCheckOutTime(now);
  setEventStatus("Finished");

  await saveParticipantToFirebase("Finished");

  resetTracking();
}
useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, "participants_test"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Participant[];

    setParticipants(data);
  });

  return () => unsubscribe();
}, []);

async function volunteerCheckOut(bibNumber: string) {
  const now = new Date().toLocaleString();

  await updateDoc(doc(db, "participants_test", bibNumber), {
    status: "Finished",
    checkOutTime: now,
    checkedOutBy: "Volunteer",
    foodTicketIssued: true,
    lastUpdated: new Date().toISOString(),
  });
}
function unlockVolunteerMode() {
  const code = prompt("Enter volunteer access code:");

  if (code === "W4WVOL2026") {
    localStorage.setItem("volunteerMode", "true");
    setVolunteerMode(true);
    alert("Volunteer dashboard unlocked.");
  } else {
    alert("Incorrect volunteer code.");
  }
}
return (
  <main className="app">
    <section className="hero">
      <img src="/logo.png" alt="Walk 4 Warriors" className="logo" />

      <h2>September 19, 2026 • Madison, WI</h2>
      <p className="tagline">Every step saves lives.</p>

      <div className="buttons">
        {volunteerMode ? (
           <button onClick={() => setActiveSection("dashboard")}>
              Volunteer Dashboard
           </button>
       ) : (
       <button onClick={unlockVolunteerMode}>
        Volunteer Access
      </button>
       )}
        <a
          href="https://w4wvfw1318.redpodium.com/walk-4-warriors"
          target="_blank"
          rel="noopener noreferrer"
          className="primary-button"
        >
          Register / Donate
        </a>
        
        <button onClick={() => setActiveSection("checkin")}>
        Event Check In / Out
        </button>
        
        <button onClick={() => setActiveSection("challenges")}>
          Steps Toward September
        </button>

        <button onClick={() => setActiveSection("invite")}>
          Invite Others
        </button>

        <button onClick={() => setActiveSection("route")}>
          Route
        </button>

        <button onClick={() => setActiveSection("tracker")}>
          Track My Walk
        </button>
      </div>
    </section>
 {activeSection === "" && (
    <section className="card">
      <h2>Welcome to Walk 4 Warriors</h2>
      <p>
          Choose an option above to register, prepare with weekly steps, invite others, or track your walk.
      <br />
      Every step counts.
    </p>
    </section>
)}
    {/* CHALLENGES */}
{activeSection === "challenges" && (
  <section className="card">
    <h2>Steps Toward September</h2>

    <p className="section-intro">
      One step at a time. Check off each challenge to unlock the next one.
    </p>

    <div className="progress-summary">
      <p>
        {completedCount} of {weeklySteps.length} steps checked
      </p>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="encouragement">{getEncouragementMessage()}</p>
    </div>

    {completedCount < weeklySteps.length ? (
      <div className="challenge current-challenge">
        <label>
          <input
            type="checkbox"
            checked={false}
            onChange={() => toggleWeek(completedCount)}
          />
          <span>{weeklySteps[completedCount]}</span>
        </label>
      </div>
    ) : (
      <div className="challenge current-challenge">
        <strong>All challenges completed!</strong>
        <p>Great job showing up one step at a time.</p>
      </div>
    )}

    <button onClick={resetWeeklyProgress} className="secondary-button">
      Reset Progress
    </button>
  </section>
)}

    {/* INVITE */}
    {activeSection === "invite" && (
      <section className="card">
        <h2>Invite Others to Walk With You</h2>

        <p>
          Walk 4 Warriors is better together. Invite someone to join you.
        </p>

        <div className="share-buttons">
          <button onClick={shareToFacebook}>
            Share on Facebook
          </button>
        </div>

        <p className="share-note">
          Message copies automatically — paste into Facebook.
        </p>
      </section>
    )}

    {/* ROUTE */}
{activeSection === "route" && (
  <section className="card">
    <h2>Route</h2>

    <p className="section-intro">
      All participants follow the same shared route.
      Turnaround points are marked for each distance.
    </p>

    <div className="route-buttons">
      <a
        href="https://www.google.com/maps/d/u/0/edit?mid=1mP3SbV3YzA9i2W_SO6apU3tHKerKIPE&usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
      >
        Open Shared Route Map
      </a>
    </div>

    <div className="turnaround-list">
      <div className="turnaround">
        <strong>5K Turnaround - first marked checkpoint</strong>
        <p>Turn around for 5K or keep going towards 10k.</p>
      </div>

      <div className="turnaround">
        <strong>10K Turnaround - second marked checkpoint</strong>
        <p>Turn around for 10k or keep going towards 18k.</p>
      </div>

      <div className="turnaround">
        <strong>18K Turnaround</strong>
        <p>Turn around for 18k and head back into the VFW Post 1318</p>
      </div>
    </div>
  </section>
)}
{/* CHECK IN / OUT */}
{activeSection === "checkin" && (
  <section className="card">
    <h2>Event Check In / Check Out</h2>

    <input
      type="text"
      placeholder="Your name"
      value={participantName}
      onChange={(e) => setParticipantName(e.target.value)}
    />

    <input
      type="text"
      placeholder="Bib number"
      value={bibNumber}
      onChange={(e) => setBibNumber(e.target.value)}
    />

    <select
      value={eventDistance}
      onChange={(e) => setEventDistance(e.target.value)}
    >
      <option value="5K">5K</option>
      <option value="10K">10K</option>
      <option value="18K">18K</option>
    </select>

    <button onClick={checkInParticipant}>Check In / Start</button>
    <button onClick={checkOutParticipant} className="secondary-button">
      Check Out / Finished
    </button>

    <p>Status: <strong>{eventStatus}</strong></p>
  </section>
)}

   {/* VOLUNTEER DASHBOARD */}
{volunteerMode && activeSection === "dashboard" && (
  <section className="card">
    <h2>Volunteer Dashboard</h2>

    <p className="section-intro">
      Use this to see who is still out and manually check people out when they return.
    </p>

    <h3>Still Out</h3>

    {participants.filter((p) => p.status === "Still Out").length === 0 ? (
      <p>No participants currently marked still out.</p>
    ) : (
      participants
        .filter((p) => p.status === "Still Out")
        .map((p) => (
          <div key={p.id} className="challenge">
            <strong>Bib {p.bibNumber}</strong>
            <p>{p.name} • {p.distance}</p>
            <p>Checked in: {p.checkInTime}</p>

            <button onClick={() => volunteerCheckOut(p.bibNumber)}>
              Mark Finished / Give Food Ticket
            </button>
          </div>
        ))
    )}

    <h3>Finished</h3>

    {participants
      .filter((p) => p.status === "Finished")
      .map((p) => (
        <div key={p.id} className="challenge">
          <strong>Bib {p.bibNumber}</strong>
          <p>{p.name} • {p.distance}</p>
          <p>Checked out: {p.checkOutTime}</p>
        </div>
      ))}
  </section>
)}

{/* TRACKER */}
{activeSection === "tracker" && (
      <section className="card">
        <h2>Track My Walk</h2>

        <p className="distance">{distance.toFixed(2)} miles</p>
        <p className="distance">{formatTime(seconds)}</p>

        <p className="section-intro">
           GPS points recorded: {walkPath.length}
        </p>

<p>{message || "Tap start when you begin walking"}</p>
        <div className="tracker-buttons">
  {!tracking && !paused && (
    <button onClick={startTracking}>
      Start Tracking
    </button>
  )}

  {tracking && (
    <button onClick={pauseTracking}>
      Pause
    </button>
  )}

  {paused && (
    <button onClick={resumeTracking}>
      Resume
    </button>
  )}

  <button onClick={resetTracking} className="secondary-button">
    Reset
  </button>
</div>
      </section>
    )}
  </main>
);
};

export default App;