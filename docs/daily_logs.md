# Daily Log – AI Campus Assistant Project

## Day 1 – Planning, Architecture, and Initial Setup
### Work completed
- Defined the project scope for the **AI Campus Assistant**.
- Planned the system structure using a **layered modular monolith architecture**.
- Decided on the main application flow:
  - frontend sends user question
  - backend endpoint receives request
  - classifier determines intent/category
  - repositories fetch relevant database data
  - AI generates final response
- Worked on core documentation and diagrams:
  - SRS document
  - use case diagram
  - sequence diagram
- Planned the monorepo/repository structure for organizing:
  - docs
  - frontend
  - backend
- Started shaping presentation content:
  - project overview
  - problem solved
  - architecture choice
  - implementation flow

### Main decisions
- Chose **layered modular monolith** instead of microservices because it is simpler, faster to build, and better suited for a hackathon-sized project.
- Kept AI responsibilities narrower so the system would be easier to control and debug.

### Challenges
- Needed to understand how to structure the project cleanly while still moving fast.
- Needed an architecture that was scalable enough to look professional, but simple enough to implement quickly.

---

## Day 2 – Backend AI Flow and Database Integration
### Work completed
- Built the **question API endpoint**.
- Connected the **assistant service**.
- Added a **classifier using Gemini API**.
- Implemented repository/database retrieval logic for:
  - exam data
  - office hours
  - course data
- Worked on response formatting so the backend returns structured answers.
- Started handling:
  - unknown questions
  - empty input
- Debugged issues where the frontend displayed the full JSON instead of only the actual answer.
- Reviewed classification and repository alignment issues such as:
  - mismatched filter names
  - weak matching logic
  - incorrect responder/repository flow

### Main decisions
- Reduced classifier complexity so it would classify into broader categories instead of trying to do too much.
- Shifted more responsibility to repository lookups and controlled backend logic instead of relying too heavily on AI reasoning.

### Challenges
- The AI classification was initially too specific, which made fetching the correct data difficult.
- Repository queries and response handling needed cleanup so results could reliably map into the final AI answer.
- JSON parsing on the frontend/backend flow caused output issues.

---

## Day 3 – Auth Migration, Frontend Fixes, Testing, and Deployment
### Work completed
- Worked on authentication and password reset flow.
- Diagnosed problems with the previous database/auth provider, especially around **JWT support**.
- Migrated authentication flow toward **Supabase**.
- Updated backend direction to verify **Supabase JWTs** instead of the older auth approach.
- Investigated password reset redirect problems and routing issues in the frontend.
- Worked on frontend setup/session logic:
  - setup flow was skipping incorrectly
  - personnel requests were firing too early
  - management screen behavior needed fixing
- Reviewed React routing and reset-password flow behavior under `/hackathon`.
- Worked on deployment/server operations:
  - virtual environment activation
  - updating environment variables
  - restarting `systemctl` service
  - checking logs
  - installing requirements
- Continued QA/debug work:
  - integration bugs
  - announcements endpoint issues
  - frontend question form testing
  - final cleanup planning

### Main decisions
- Switched to a more suitable auth/database setup that supports JWT properly.
- Kept role-based management access in the app, while ensuring unauthorized users are blocked from restricted data.

### Challenges
- Major auth challenge: the original database/auth setup only handled sessions and did not fit the JWT-based flow needed by the backend.
- Mid-project migration required learning a new provider and updating both backend and frontend logic.
- Reset password redirects and route handling created confusing behavior during frontend integration.
- Final integration exposed several smaller bugs that needed cleanup before final testing.


## Day 4 – Final Integration, Debugging, and Project Presentation
### Work completed
- Reviewed and organized the project task list into a clean markdown table for documentation.
- Created a reconstructed 3-day development log based on the project history and progress.
- Continued refining presentation material for the **AI Campus Assistant**:
  - project summary
  - architecture explanation
  - challenges encountered
  - reasons for choosing layered modular monolith
- Documented project progress across completed, in-progress, and remaining tasks.
- Worked on converting project work into presentation-friendly and README-friendly format.
- Continued focusing on final-stage polish:
  - integration review
  - remaining bug tracking
  - documentation cleanup
  - final testing preparation

### Main decisions
- Focused today on making the project easier to present, explain, and submit cleanly.
- Prioritized documentation and communication quality alongside technical completion.

### Challenges
- Needed to reconstruct progress clearly from multiple debugging and development discussions.
- Had to convert technical implementation work into a clean format suitable for markdown, presentation slides, and project reporting.

### Current status
- Most core backend and AI features are complete.
- Remaining work is mainly around:
  - unknown question handling
  - frontend form testing
  - integration bug fixes
