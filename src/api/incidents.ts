export type Severity = "critical" | "high" | "medium" | "low";

export type IncidentDto = {
  id: string;
  title: string;
  severity: Severity;
  timestamp: string; // ISO string
  description?: string;
};

const SEVERITIES: Severity[] = ["critical", "high", "medium", "low"];

function randomSeverity(): Severity {
  return SEVERITIES[Math.floor(Math.random() * SEVERITIES.length)];
}

function generateIncidents(count: number): IncidentDto[] {
  const now = Date.now();
  const incidents: IncidentDto[] = [];

  for (let i = 0; i < count; i++) {
    const offset = Math.floor(Math.random() * 1000 * 60 * 60 * 72); // up to 72h
    incidents.push({
      id: String(i + 1),
      title: `Incident #${i + 1}`,
      severity: randomSeverity(),
      timestamp: new Date(now - offset).toISOString(),
      description: Math.random() > 0.7 ? `Additional context for incident ${i + 1}` : undefined
    });
  }

  // Randomise order each time
  incidents.sort(() => Math.random() - 0.5);

  return incidents;
}
// 1. Initialize an in-memory database with a set of incidents that will be updated on 
// each fetch to simulate changing data from the backend. 
// This allows us to test the filtering and searching functionality with dynamic data.
let INCIDENTS_DB: IncidentDto[] = generateIncidents(300);

// 2. Function to update the in-memory database with new incidents on each fetch
function updateIncidents() {
  const updates = Math.floor(Math.random() * 5);

  for (let i = 0; i < updates; i++) {
    const index = Math.floor(Math.random() * INCIDENTS_DB.length);

    INCIDENTS_DB[index] = {
      ...INCIDENTS_DB[index],
      severity: randomSeverity(),
      timestamp: new Date().toISOString(),
    };
  }
}
export async function fetchIncidents(): Promise<IncidentDto[]> {
  // simulate network
  await new Promise((resolve) => setTimeout(resolve, 200));

  // 2% random error
  if (Math.random() < 0.02) { // Simulate a random backend failure with a 2% chance from the original 5% to make it less disruptive during testing
    throw new Error("Random backend failure");
  }

  updateIncidents(); // Update the in-memory database with new incidents on each fetch

  return [...INCIDENTS_DB];
}
