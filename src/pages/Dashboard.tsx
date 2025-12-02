import React, { useEffect } from "react";
import { useIncidentsStore } from "../state/incidentsStore";
import { IncidentList } from "../components/IncidentList";
import { Filters } from "../components/Filters";

export const Dashboard: React.FC = () => {
  const load = useIncidentsStore((s) => s.loadIncidents);
  const loading = useIncidentsStore((s) => s.loading);
  const error = useIncidentsStore((s) => s.error);

  useEffect(() => {
    // BUG: no dependency array, will re-run on every render
    load();
  });

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Filters</h2>
        <Filters />
      </aside>
      <section className="content" aria-label="Incident list">
        {loading && <div>Loading incidents…</div>}
        {error && <div role="alert">Error: {error}</div>}
        {/* BUG: may receive undefined when data not yet loaded */}
        <IncidentList />
      </section>
    </div>
  );
};
