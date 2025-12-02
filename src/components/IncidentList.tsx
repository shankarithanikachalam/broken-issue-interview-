import React from "react";
import { useIncidentsStore } from "../state/incidentsStore";
import { IncidentItem } from "./IncidentItem";

export const IncidentList: React.FC = () => {
  const incidents = useIncidentsStore((s) => s.filteredIncidents);
  const selectIncident = useIncidentsStore((s) => s.selectIncident);

  // BUG: no guard if incidents is undefined / null
  return (
    <ul className="incident-list" role="list">
      {incidents.map((incident) => (
        <IncidentItem
          key={Math.random()} // BUG: unstable key
          incident={incident}
          onClick={() => selectIncident(incident.id)}
        />
      ))}
    </ul>
  );
};
