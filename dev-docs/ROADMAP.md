<!-- Last updated: 2026-05-15 -->
<!-- Last change: Initial roadmap creation -->

# DeShawn's Dog Walking - Implementation Roadmap

Generated from: dev-docs/PRD.md

## Steps

- [x] **Step 1: Planning Deliverables**
  Draw the ERD, sketch wireframes for all 9 user stories, and set up the GitHub project board before writing any code. These artifacts should reflect the data model in the architecture doc (4 entities: Dog, Walker, City, WalkerCity).

  **Acceptance Criteria:**
  - **Given** the architecture doc's data model, **When** you draw the ERD, **Then** it shows Dog, Walker, City, and WalkerCity with correct relationships and cardinality (including the nullable Walker on Dog).
  - **Given** the 9 user stories, **When** wireframes are complete, **Then** there is one sketch per story showing the layout and interactive elements.
  - **Given** a GitHub repo, **When** the project board is set up, **Then** there is one issue per user story, issues are numbered, and the board is ready to accept feature branches.

- [x] **Step 2: Backend Foundation - Models and Seed Data**
  Create the `Models/` folder with the four entity classes (`Dog.cs`, `Walker.cs`, `City.cs`, `WalkerCity.cs`). Declare the four in-memory lists at the top of `Program.cs` and populate them with enough seed data to test every user story (at least 3 dogs, 3 walkers, 3 cities, and several WalkerCity entries).

  **Acceptance Criteria:**
  - **Given** the project compiles, **When** you inspect the lists at startup, **Then** dogs have varied CityIds and some have WalkerIds while others have null.
  - **Given** the seed data, **When** you trace the WalkerCity entries, **Then** each walker serves at least one city, and at least two walkers share a city (needed to test the city filter in story 4).

- [x] **Step 3: Story 1 - View All Dogs**
  Add `GET /api/dogs` to `Program.cs`. The response should include each dog's city name (joined from the cities list). Create `client/src/components/dogs/DogList.jsx`, wire it into the router at `/`, and replace the current `Home.jsx` placeholder. Add `getAllDogs` to `apiManager.js`.

  Branch: `feature/1/view-all-dogs`

  **Acceptance Criteria:**
  - **Given** the app is running, **When** you navigate to `/`, **Then** a list of all seeded dogs is displayed, each showing the dog's name and city name.
  - **Given** the dog list, **When** you call `GET /api/dogs` in Postman, **Then** the response is a JSON array where each object has at least `id`, `name`, and `cityName`.

- [x] **Step 4: Story 2 - View Dog Details**
  Add `GET /api/dogs/{id}` to `Program.cs`. The response should include the dog's walker name if one is assigned (null or omitted otherwise). Create `DogDetails.jsx`, add a route at `/dogs/:id`, and link each dog's name in `DogList` to its detail page. Add `getDogById` to `apiManager.js`.

  Branch: `feature/2/view-dog-details`

  **Acceptance Criteria:**
  - **Given** a dog with an assigned walker, **When** you navigate to `/dogs/:id`, **Then** the page shows the dog's name, city, and the walker's name.
  - **Given** a dog with no walker assigned, **When** you navigate to its detail page, **Then** the page shows the dog's name and city, and the walker field shows "None" or similar.
  - **Given** the dog list, **When** you click a dog's name, **Then** you land on that dog's detail page.

- [x] **Step 5: Story 8 - Delete Dog**
  Add `DELETE /api/dogs/{id}` to `Program.cs`. Add a Delete button to `DogDetails.jsx` that calls the endpoint and then navigates back to the dog list. Add `deleteDog` to `apiManager.js`.

  Branch: `feature/8/delete-dog`

  **Acceptance Criteria:**
  - **Given** a dog detail page, **When** you click Delete, **Then** the dog is removed from the in-memory list, and the browser navigates back to `/`.
  - **Given** the dog list after deletion, **Then** the deleted dog no longer appears.

- [x] **Step 6: Story 6 - Add City**
  Add `GET /api/cities` and `POST /api/cities` to `Program.cs`. Create `client/src/components/cities/CityForm.jsx` with a single name input and submit button. Add a `/cities/add` route and a "Add City" nav link in `App.jsx`. Add `getAllCities` and `createCity` to `apiManager.js`.

  Note: `GET /api/cities` is also needed by stories 3, 4, and 7, so this step lays shared groundwork.

  Branch: `feature/6/add-city`

  **Acceptance Criteria:**
  - **Given** the Add City form, **When** you submit a new city name, **Then** the city is added to the in-memory list and the form navigates away (or clears).
  - **Given** a fresh submission, **When** you call `GET /api/cities`, **Then** the new city appears in the response.

- [x] **Step 7: Story 3 - Add Dog**
  Add `POST /api/dogs` to `Program.cs`. Create `DogForm.jsx` with a name text input and a city dropdown (populated from `GET /api/cities`). Add a `/dogs/add` route and an "Add Dog" link from `DogList`. Add `createDog` to `apiManager.js`.

  Branch: `feature/3/add-dog`

  **Acceptance Criteria:**
  - **Given** the Add Dog form, **When** you fill in a name, select a city, and submit, **Then** the new dog is added to the list and the browser navigates to `/`.
  - **Given** the dog list after adding, **Then** the new dog appears with its correct city name.
  - **Given** the form loads, **When** the page mounts, **Then** the city dropdown is populated with all current cities.

- [x] **Step 8: Story 4 - View Walkers by City**
  Add `GET /api/walkers` to `Program.cs` with an optional `?cityId=` query string parameter. When `cityId` is provided, return only walkers who have a matching entry in `walkerCities`; otherwise return all walkers. Create `WalkerList.jsx` with a city dropdown that triggers a filtered fetch. Add a `/walkers` route and update the existing "Walkers" nav link. Add `getWalkers` to `apiManager.js`.

  Branch: `feature/4/walkers-by-city`

  **Acceptance Criteria:**
  - **Given** the walkers page, **When** you select a city from the dropdown, **Then** only walkers assigned to that city are shown.
  - **Given** no city is selected, **When** the page loads, **Then** all walkers are shown.
  - **Given** `GET /api/walkers?cityId=2` in Postman, **Then** the response only includes walkers with a WalkerCity entry for city 2.

- [ ] **Step 9: Story 5 - Assign Walker to Dog**
  Add `PUT /api/dogs/{id}` to `Program.cs` that accepts `{ walkerId }` in the body and updates the dog's `WalkerId`. On `DogDetails.jsx`, add a dropdown of walkers who serve the dog's city and a Save button. The dropdown should be populated by calling `GET /api/walkers?cityId=` with the dog's city. Add `assignWalker` to `apiManager.js`.

  Branch: `feature/5/assign-walker`

  **Acceptance Criteria:**
  - **Given** a dog detail page, **When** you select a walker from the dropdown and click Save, **Then** the dog's walker is updated and the page re-renders showing the new walker's name.
  - **Given** the dropdown, **When** it loads, **Then** it only shows walkers who serve the dog's city (not all walkers).
  - **Given** a dog with an existing walker, **When** you select a different walker and save, **Then** the assignment is replaced (not duplicated).

- [ ] **Step 10: Story 9 - Delete Walker**
  Add `DELETE /api/walkers/{id}` to `Program.cs`. Before removing the walker, loop through the dogs list and set `WalkerId = null` for any dog assigned to this walker. Add a Delete button to `WalkerList.jsx`. Add `deleteWalker` to `apiManager.js`.

  Branch: `feature/9/delete-walker`

  **Acceptance Criteria:**
  - **Given** a walker who is assigned to one or more dogs, **When** you delete that walker, **Then** those dogs' `WalkerId` is set to null (verified by visiting a dog's detail page).
  - **Given** the walker list after deletion, **Then** the deleted walker no longer appears.
  - **Given** `GET /api/dogs` after deletion, **Then** none of the deleted walker's former dogs reference that walker.

- [ ] **Step 11: Story 7 - Manage Walker Cities**
  Add `GET /api/walkers/{id}/cities` and `PUT /api/walkers/{id}/cities` to `Program.cs`. The PUT replaces the walker's city assignments: delete all existing `WalkerCity` entries for the walker, then insert new ones for the submitted city IDs. Create `WalkerCities.jsx` showing all cities as checkboxes with the walker's current cities pre-checked. Link to it from `WalkerList`. Add `getWalkerCities` and `updateWalkerCities` to `apiManager.js`.

  Branch: `feature/7/manage-walker-cities`

  **Acceptance Criteria:**
  - **Given** the walker cities page, **When** it loads, **Then** checkboxes for all cities are shown and the walker's current cities are pre-checked.
  - **Given** checked and unchecked cities, **When** you submit the form, **Then** the walker's city assignments are replaced with exactly the checked cities.
  - **Given** story 4's city filter, **When** you change a walker's cities and then filter by a newly added city, **Then** the walker appears in results for that city.
