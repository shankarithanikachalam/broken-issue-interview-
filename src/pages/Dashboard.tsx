import React from "react";
import { useIncidentsStore } from "../state/incidentsStore";
import { IncidentList } from "../components/IncidentList";
import { Filters } from "../components/Filters";

export const Dashboard: React.FC = () => {
  const loading = useIncidentsStore((s) => s.loading);
  const error = useIncidentsStore((s) => s.error);
  const incidents = useIncidentsStore((s) => s.incidents);// Added to get the incidents from the store for logging and debugging purposes


  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>Filters</h2>
        <Filters />
      </aside>
      <section className="content">
        {loading && incidents?.length === 0 && <div>Loading incidents…</div>}
        {error && <div>Error: {error}</div>}
        <IncidentList />
      </section>
    </div>
  );
};
