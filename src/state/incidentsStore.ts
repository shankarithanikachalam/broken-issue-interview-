import { create } from "zustand";
import { fetchIncidents, type IncidentDto } from "../api/incidents";
import { persist } from "zustand/middleware";

type SeverityFilter = "" | "critical" | "high" | "medium" | "low";

export type IncidentState = {
  incidents: IncidentDto[] | null;
  loading: boolean;
  error: string | null;
  severityFilter: SeverityFilter;
  search: string;
  selectedId: string | null;
  loadIncidents: () => Promise<IncidentDto[] | undefined>;// Updated to return the loaded incidents or undefined in case of error
  setSeverityFilter: (value: SeverityFilter) => void;
  setSearch: (value: string) => void;
  selectIncident: (id: string | null) => void;
  filteredIncidents: () => IncidentDto[];
};

export const useIncidentsStore = create<IncidentState>()(
  persist((set, get) => ({
    incidents: [],// Updated to initialize as an empty array instead of null to avoid issues with filtering
    loading: false,
    error: null,
    severityFilter: "",
    search: "",
    selectedId: null,
    async loadIncidents() {

      set({ loading: true, error: null });
      try {
        const data = await fetchIncidents();
        console.log("Fetched incidents:", data);
        set({ incidents: data, loading: false });
        // console.log("Incidents in store after loading:", get().incidents); // Log the incidents in the store after loading
        return data;// Return the loaded incidents
      } catch (e: any) {
        set({ error: e?.message ?? "Unknown error", loading: false });
        // retry once after 1 sec
        setTimeout(() => {
          get().loadIncidents();
        }, 1000);
      }
    },
    setSeverityFilter(value) {
      // console.log("Setting severity filter to:", value);
      set({ severityFilter: value });
    },
    setSearch(value) {

      // console.log("Setting search to:", value);
      set({ search: value });
    },
    selectIncident(id) {
      // console.log("Selecting incident with ID:", id);
      set({ selectedId: id });
    },
    filteredIncidents() {//changed from getter to a function to allow logging and debugging of the filtering process
      const { incidents = [], severityFilter, search } = get();// Updated to provide a default empty array for incidents to avoid issues with filtering when incidents is null
      const term = search.trim().toLowerCase(); // Trim and convert search term to lowercase for case-insensitive comparison
      // console.log("data", incidents);// Log the number of incidents in the store
      // console.log("Filtering incidents with severityFilter:", severityFilter, "and search:", search, "");// Log the current filter values
      if (!incidents) return [] as IncidentDto[];
      // console.log("Incidents before filtering:", incidents);// Log the incidents before filtering
      const c = incidents.filter((i) => {
        if (severityFilter && i.severity !== severityFilter) {
          return false;
        }

        if (term && !i.title.toLowerCase().includes(term)) {
          return false;
        }
        return true;
      });
      // console.log("Incidents after filtering:", c);// Log the incidents after filtering
      return c;
    }
  }), {
    name: "incidents-storage", // name of the item in storage
  })
);
