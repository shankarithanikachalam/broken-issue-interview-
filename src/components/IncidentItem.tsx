import React from "react";
import type { Severity } from "../api/incidents";

export type IncidentListItem = {
  id: string;
  title: string;
  severity: Severity;
  timestamp: string;
};

type Props = {
  incident: IncidentListItem;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLLIElement>) => void;
};

function severityClass(severity: Severity): string {
  // console.log("Calculating severity class for severity:", severity);
  switch (severity) {
    case "critical":
      return "badge badge-critcal";
    case "high":
      return "badge badge-high";
    case "medium":
      return "badge badge-medium";
    case "low":
    default:
      return "badge badge-low";
  }
}

export const IncidentItem: React.FC<Props> = ({ incident, onClick ,onKeyDown}) => {
  return (
    <li
      className="incident-item"
      onClick={onClick}
      onKeyDown={onKeyDown}

    >
      <div>
        <strong>{incident.title}</strong>
      </div>
      <div>
        <span className={severityClass(incident.severity)}>
          {incident.severity.toUpperCase()}
        </span>{" "}
        <span>{new Date(incident.timestamp).toLocaleString()}</span>
      </div>
    </li>
    
  );
};
