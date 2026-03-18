import React from "react";
import { useIncidentsStore } from "../state/incidentsStore";
export const Filters: React.FC = () => {
  const severityFilter = useIncidentsStore((s) => s.severityFilter);// imported and added severityFilter to the component
  const setSeverityFilter = useIncidentsStore((s) => s.setSeverityFilter);
  const setSearch = useIncidentsStore((s) => s.setSearch);
  const search = useIncidentsStore((s) => s.search);
  // console.log("severityFilter:", severityFilter);
  return (
    <div className="filter">
      <div>
        Severity:{" "}
        <select value={severityFilter} onChange={(e) => setSeverityFilter(e.target.value as any)}>
          <option value="">All</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <br />
      <div>
        <label htmlFor="search">Search incidents</label>
        <input id="search" type="search"
          value={search}
          placeholder="Title contains…"
          onChange={(e) => setSearch(e.target.value)} />

      </div>
    </div>
  );
};
