<!-- Last updated: 2026-05-14 -->
<!-- Last change: Initial PRD creation -->

# DeShawn's Dog Walking - Product Requirements Document

## Problem Statement

DeShawn's Dog Walking needs a web application to manage dogs, walkers, and service areas (cities). The business needs to assign walkers to dogs, manage which cities each walker serves, and track all dogs in the system. This is a student project at Nashville Software School (NSS), Book 2 of the server-side C# curriculum.

## Core Requirements

### Planning Deliverables (before coding begins)

- Entity Relationship Diagram (ERD) covering Dogs, Walkers, and Cities
- Wireframes for each of the 9 user stories
- GitHub project board with one issue ticket per user story
- Feature branches named `feature/#/short-description` for each story
- Pull requests that auto-close their linked issue on merge

### User Stories

1. **View All Dogs** - Home page lists all dogs in the system
2. **View Dog Details** - Detail view shows a dog's info and its assigned walker (if any)
3. **Add Dog** - Form to register a new dog with name and city
4. **View Walkers by City** - Dropdown filters the walker list by selected city
5. **Assign Walker to Dog** - Select an available walker from the dog's city and save the assignment
6. **Add City** - Form to add a new city to the service area list
7. **Manage Walker Cities** - Edit a walker's service cities via checkboxes
8. **Delete Dog** - Remove a dog from the system
9. **Delete Walker** - Remove a walker and unassign them from any dogs they were walking

> Note: User story 9 (Delete Walker) has an implied data change: all dogs assigned to that walker must have their walker assignment cleared. This is the "missing data change" flagged in the assignment.

## Data Model

Three entities with the following relationships:

- **Dog**: Name, City (required), Walker (optional assignment)
- **Walker**: Name, Cities (many-to-many via WalkerCity join table)
- **City**: Name; referenced by Dogs and Walkers

Relationships:
- A Dog belongs to one City, has zero or one Walker
- A Walker serves one or more Cities (many-to-many)
- A City has many Dogs and many Walkers

## Technical Stack

### Stack Decisions

| Layer | Technology | Rationale |
|---|---|---|
| API | ASP.NET Core Minimal API (C#) | NSS curriculum requirement; already scaffolded |
| Data storage | In-memory list (no database) | Matches Book 2 patterns; database is introduced in a later book |
| Frontend | React 18 + Vite | Already scaffolded in the repo |
| Routing | React Router v6 | Already included in the scaffold |
| UI | Reactstrap + Bootstrap 5 | Already included in the scaffold |
| API communication | Fetch API via `apiManager.js` | Matches the pattern from the guided tour project |

All stack choices follow the scaffold already in the repo and the patterns from Honey Rae's Repairs (the guided tour) and Car Builder (the hands-on project).

## Scope

### In Scope (v1)

- All 9 user stories listed above
- All planning deliverables (ERD, wireframes, GitHub board, issues, branches, PRs)
- In-memory data storage only (no database)
- ASP.NET Core Minimal API endpoints (GET, POST, PUT, DELETE)
- React frontend consuming the API via fetch
- Query string parameter support (filter walkers by city)

### Out of Scope

- Authentication and authorization
- Persistent database storage
- OpenAPI/Swagger documentation beyond the auto-generated default
- REST design explorer chapter content
- Unit or integration tests
- Deployment to any hosting environment

## Success Criteria

- All 9 user stories work end-to-end in the browser
- Each story was developed on its own feature branch with a linked PR
- ERD and wireframes are complete before coding begins
- API follows the Minimal API patterns from the coursework (route handlers in `Program.cs`, entity classes in a `Models` folder)
- React components follow the patterns from the guided tour (components folder, `apiManager.js` for fetch calls, React Router for navigation)
- The "Delete Walker" story correctly clears walker assignments on associated dogs

## Learning Goals

This project is the independent practice component of NSS Book 2. The goal is to apply the following concepts without guided instruction:

- Defining C# entity classes that model relationships (composition, collections)
- Writing Minimal API route handlers for GET, POST, PUT, and DELETE
- Using URL parameters and query strings in API routes
- Consuming a REST API from React using `fetch`
- Managing component state and passing data via props
- Translating user stories into database design (ERD) and UI sketches (wireframes)
- Using Git feature branches and PRs as a professional workflow
