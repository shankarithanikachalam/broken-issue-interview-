import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, beforeEach } from "vitest";
import { Filters } from "../../components/Filters";
import { useIncidentsStore } from "../../state/incidentsStore";

beforeEach(() => {
  // reset store before each test
  useIncidentsStore.setState({
    severityFilter: "",
    search: "",
  });
});

test("changes severity filter", () => {
  render(<Filters />);

  const dropdown = screen.getByRole("combobox");

  fireEvent.change(dropdown, { target: { value: "high" } });

  expect(useIncidentsStore.getState().severityFilter).toBe("high");
});