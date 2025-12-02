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
};

function severityClass(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "badge badge-critical";
    case "high":
      return "badge badge-high";
    case "medium":
      return "badge badge-medium";
    case "low":
    default:
      return "badge badge-low";
  }
}

export const IncidentItem: React.FC<Props> = ({ incident, onClick }) => {
  return (
    <li
      className="incident-item"
      onClick={onClick}
      tabIndex={0}
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
