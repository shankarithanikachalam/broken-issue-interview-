import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import { Dashboard } from "../../pages/Dashboard";
import { MemoryRouter } from "react-router-dom";

test("renders filters section", () => {
  render(
    <MemoryRouter>
      <Dashboard />
    </MemoryRouter>
  );

  const filters = screen.getAllByText(/filters/i);

  expect(filters.length).toBeGreaterThan(0); 
});