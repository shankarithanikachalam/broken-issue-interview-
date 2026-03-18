import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { IncidentItem } from "../../components/IncidentItem";

const mockIncident = {
  id: "1",
  title: "Server Down",
  severity: "high" as const,
  timestamp: new Date().toISOString(),
};

test("renders incident title", () => {
  render(<IncidentItem incident={mockIncident} />);

  const title = screen.getByText(/server down/i);

  expect(title).toBeInTheDocument();
});

test("renders severity text", () => {
  render(<IncidentItem incident={mockIncident} />);

  const severity = screen.getByText(/high/i);

  expect(severity).toBeInTheDocument();
});

test("calls onClick when clicked", () => {
  const handleClick = vi.fn();

  render(
    <IncidentItem incident={mockIncident} onClick={handleClick} />
  );

  const item = screen.getByText(/server down/i);

  fireEvent.click(item);

  expect(handleClick).toHaveBeenCalled();
});