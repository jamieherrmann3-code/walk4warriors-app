import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Train from "./pages/Train";
import Track from "./pages/Track";
import Event from "./pages/Event";
import Invite from "./pages/Invite";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/train" element={<Train />} />
          <Route path="/track" element={<Track />} />
          <Route path="/event" element={<Event />} />
          <Route path="/invite" element={<Invite />} />
        </Routes>

        <nav className="bottom-nav">
          <Link to="/">Home</Link>
          <Link to="/train">Train</Link>
          <Link to="/track">Track</Link>
          <Link to="/event">Event</Link>
          <Link to="/invite">Invite</Link>
        </nav>
      </main>
    </BrowserRouter>
  );
}

export default App;