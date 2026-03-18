import React, { useEffect } from "react";
import { useIncidentsStore } from "../state/incidentsStore";
import { IncidentItem } from "./IncidentItem";
import { useNavigate } from "react-router-dom";
export const IncidentList: React.FC = () => {
  const incidents = useIncidentsStore((s) => s.incidents);
  const filteredIncidentsFn = useIncidentsStore((s) => s.filteredIncidents);// Access the filteredIncidents function from the store
  const filteredIncidents = filteredIncidentsFn(); // Call the function to get the filtered incidents
  // console.log("Filtered incidents:", incidents);
  console.log("Before:", incidents?.length);
  console.log("After:", filteredIncidents.length);
  const selectIncident = useIncidentsStore((s) => s.selectIncident);
  const severityFilter = useIncidentsStore((s) => s.severityFilter);
  const search = useIncidentsStore((s) => s.search);
  const navigate = useNavigate();
  useEffect(() => {
    filteredIncidents; // Access filteredIncidents to trigger the getter and log its value
    // console.log("Filtered incidents:", incidents);
  }, [severityFilter, search]); // Add severityFilter and search to the dependency array to log changes   

  const handleOnClick = (id: string) => {
    // console.log("Incident clicked with ID:", id);
    selectIncident(id);
    navigate(`/details`); // Navigate to the details page for the selected incident
  }
  return (
    <ul className="incident-list">
      <div aria-live="polite">
        <b>
          <span>{search ? `Search: "${search}"` : ""} </span>
          <span>{severityFilter ? `Severity: ${severityFilter.toUpperCase()}` : ""} </span>
          <span>{(search || severityFilter) && " "} </span>
          <span>{filteredIncidents.length === 0 && "No incidents match the current filters."}</span>
          <span>{filteredIncidents.length > 0 && `${filteredIncidents.length} incident${filteredIncidents.length > 1 ? "s" : ""} loaded`}</span>
        </b>
      </div>
      <br />
      {filteredIncidents && filteredIncidents.map((incident) => (
        <IncidentItem
          key={incident.id} //math.random() 
          incident={incident}
          onClick={() => handleOnClick(incident.id)}
          onKeyDown={(e: React.KeyboardEvent<HTMLLIElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              handleOnClick(incident.id);
            }
          }}
        />
      ))}
    </ul>
  );
};
