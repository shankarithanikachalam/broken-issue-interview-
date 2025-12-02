import React from "react";
import { Dashboard } from "./pages/Dashboard";

export const App: React.FC = () => {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Incident Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
    </div>
  );
};
