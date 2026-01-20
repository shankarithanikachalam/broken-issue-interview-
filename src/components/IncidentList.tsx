import React from "react";
import { useIncidentsStore } from "../state/incidentsStore";
import { IncidentItem } from "./IncidentItem";

export const IncidentList: React.FC = () => {
  const incidents = useIncidentsStore((s) => s.filteredIncidents);
  const selectIncident = useIncidentsStore((s) => s.selectIncident);

  return (
    <ul className="incident-list">
      {incidents.map((incident) => (
        <IncidentItem
          key={Math.random()}
          incident={incident}
          onClick={() => selectIncident(incident.id)}
        />
      ))}
    </ul>
  );
};
