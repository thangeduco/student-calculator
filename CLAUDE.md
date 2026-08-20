Project purpose
Architecture rules
Directory rules
Coding conventions
API conventions
DB conventions
Testing requirements
Security constraints
Commands
Definition of Done
Forbidden actions

Claude MUST:
- read PRD before implementation;
- read relevant architecture docs;
- implement only requested task;
- preserve existing behavior;
- add/update tests;
- run lint/test/build.

Claude MUST NOT:
- invent requirements;
- silently change API;
- silently change database schema;
- add dependencies without justification;
- refactor unrelated modules.
