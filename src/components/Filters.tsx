import React from "react";
import { useIncidentsStore } from "../state/incidentsStore";

export const Filters: React.FC = () => {
  const setSeverityFilter = useIncidentsStore((s) => s.setSeverityFilter);
  const setSearch = useIncidentsStore((s) => s.setSearch);

  // BUG: no value binding, component is uncontrolled and store may never update correctly
  return (
    <div className="filters">
      <label>
        Severity
        <select onChange={(e) => setSeverityFilter(e.target.value as any)}>
          <option value="">All</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </label>
      <label>
        Search
        <input
          type="search"
          placeholder="Title contains…"
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </div>
  );
};
