# Incident-Dashboard-Assessment

## Overview

A production-style Incident Management Dashboard built to provide reliable monitoring and quick response to system issues.

---

## Key Improvements

* Replaced unstable mock API with a **consistent in-memory data model**
* Implemented **auto-refresh (polling)** for near real-time updates
* Fixed **filtering logic** (search + severity)
* Resolved **state persistence issues** in Zustand
* Added proper **loading and error handling**

---

## Testing

Basic behavior-focused tests using React Testing Library and Vitest:

* Rendering
* User interactions
* State updates

> Currently learning testing; with more time, I would expand coverage and add integration tests.

---

## AI Usage

AI tools (ChatGPT) were used only for:

* Clarifying concepts (state management, testing basics)
* Debugging errors and understanding issues
* Small guidance on test structure

All core implementation, logic decisions, and architecture were written and understood by me.

---

## Future Scope

* Real-time updates using WebSockets
* Performance improvements for large datasets
* Enhanced test coverage

---

## Tech Stack

React, TypeScript, Zustand, React Router, Vitest

---

## Summary

Improved the application to be **stable, predictable, and closer to production-ready**, with clean state management and reliable UI behavior.
