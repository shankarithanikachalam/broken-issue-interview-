import { create } from "zustand";
import { fetchIncidents, type IncidentDto } from "../api/incidents";

type SeverityFilter = "" | "critical" | "high" | "medium" | "low";

export type IncidentState = {
  incidents: IncidentDto[] | null;
  loading: boolean;
  error: string | null;
  severityFilter: SeverityFilter;
  search: string;
  selectedId: string | null;
  loadIncidents: () => Promise<void>;
  setSeverityFilter: (value: SeverityFilter) => void;
  setSearch: (value: string) => void;
  selectIncident: (id: string | null) => void;
  filteredIncidents: IncidentDto[];
};

export const useIncidentsStore = create<IncidentState>((set, get) => ({
  incidents: null,
  loading: false,
  error: null,
  severityFilter: "",
  search: "",
  selectedId: null,
  async loadIncidents() {
    set({ loading: true, error: null });
    try {
      const data = await fetchIncidents();
      set({ incidents: data, loading: false });
    } catch (e: any) {
      set({ error: e?.message ?? "Unknown error" });
    }
  },
  setSeverityFilter(value) {
    set({ severityFilter: value });
  },
  setSearch(value) {
    set({ search: value });
  },
  selectIncident(id) {
    set({ selectedId: id });
  },
  get filteredIncidents() {
    const { incidents, severityFilter, search } = get();

    if (!incidents) return [] as IncidentDto[];

    return incidents.filter((i) => {
      if (severityFilter && i.severity !== severityFilter) {
        return false;
      }
      if (search && !i.title.includes(search)) {
        return false;
      }
      return true;
    });
  }
}));
