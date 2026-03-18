import React, { useEffect } from "react";
import { Dashboard } from "./pages/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./pages/Details";
import { useIncidentsStore } from "./state/incidentsStore";
export const App: React.FC = () => {
  const load = useIncidentsStore((s) => s.loadIncidents);
  useEffect(() => {
    load(); // initial load

    const interval = setInterval(() => {
      load(); // keep fetching latest data
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, [load]);
  return (
    <Router>
      <div className="app-root">
        <div className="app-header">
          <h1><i>Incident Dashboard</i></h1>
        </div>
        <main>
          <Routes >
            <Route path="/" element={<Dashboard />} />
          </Routes>
          <Routes>
            <Route path="/details" element={<Details />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
