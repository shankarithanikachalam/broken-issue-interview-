# Frontend Engineering Task – Incident Dashboard

You receive a small React/TypeScript project that loads “incidents” from a fake backend and renders them in a dashboard.

The current implementation is unstable and poorly structured. Your task is to improve the architecture, fix the bugs, and add a small new feature.

Estimated time: **6–8 hours**.

---

## 1. Stabilise data loading

Fix issues in the current implementation:

- loading state is not reliable
- error state is not preserved correctly
- there is an infinite reloading loop in some situations
- rendering breaks with `undefined.map` when no data is available
- the list re-renders too often

Make data loading predictable and robust.

---

## 2. Normalise the API data

The fake API returns inconsistent data:

- randomly sorted
- timestamps as plain strings
- some optional fields missing

Create a normalisation function (e.g. in `src/api/normalize.ts`) that:

- parses timestamps into `Date` (or at least normalised strings)
- ensures required fields exist (`id`, `title`, `severity`, `timestamp`)
- sorts incidents in a stable, descending order by timestamp

Use this normalisation before data is stored in the state.

---

## 3. Implement filtering

There is a `<Filters />` component, but it does not work correctly.

Requirements:

- filter by severity (Critical, High, Medium, Low)
- filter by text search (title contains substring, case-insensitive)
- filters should live in the global store (not only in local component state)
- changing filters should immediately update the list

---

## 4. Improve performance of the list

With 300+ incidents, the list should not fully re-render on each small state change.

Expectation:

- use memoisation (`React.memo`, `useMemo`, selectors, etc.)
- ensure `IncidentItem` only re-renders when the underlying incident actually changes

You are free to adjust the component structure to achieve this.

---

## 5. Add a new feature: Incident details panel

When clicking on a list item:

- open a details panel on the right side
- show additional fields (id, title, severity, timestamp, description)
- allow closing the panel via a close button and the `Esc` key
- keep keyboard accessibility in mind

A very basic UI is enough – correctness and clarity are more important than pixel-perfect design.

---

## 6. Accessibility

Implement at least:

- keyboard navigation through the incident list
- visible focus states
- appropriate ARIA roles/attributes for the list and the details panel

---

## 7. Add 3–5 tests

Using React Testing Library + Vitest, cover some representative behaviours, for example:

- loading state is shown while data is being fetched
- filters reduce the list as expected
- clicking a list item opens the detail panel and `Esc` closes it

You do not need complete coverage – focus on high-signal tests.

---

## 8. Document your approach

Please extend this README or add a separate file with:

- a short explanation of the main problems you found
- how you fixed them
- trade-offs you made
- how to run the app and the tests
- (optional) what you would do next with more time

### AI usage (optional but transparent)

If you use AI tools (e.g. ChatGPT, GitHub Copilot, etc.), add a short note:

- which tools you used
- for which type of work (boilerplate, refactoring help, test ideas, etc.)

We are not interested in policing this – we simply want transparency.

---

## Getting started

```bash
npm install
npm run dev   # start dev server
npm test      # run tests
```

You may adjust scripts or add small utilities if it helps your workflow.
