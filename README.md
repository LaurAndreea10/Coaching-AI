# CoachingAI Health Companion

Browser-first wellness and productivity app built for portfolio/demo use with vanilla HTML, CSS, and JavaScript.

## Live Demo

https://laurandreea10.github.io/Coaching-AI/

## What exists now (v1.0.0 prototype)

- Mood check-in
- Task list with priorities + XP rewards
- Focus timer (Pomodoro)
- Goals tracking
- Local coach suggestions and quick prompts
- Optional modules: exercises, meal plan, mini-games, progress dashboard, accessibility settings
- Local persistence via `localStorage`

## What is simulated / mock

- “AI coach” replies are rule-based local responses
- API mode is a placeholder toggle (no real backend in this repo)
- Weekly progress and meal data are sample datasets

## What comes next

- Real coach adapter wired to backend (`services/coachService.js`)
- Config-based environment setup (`config.example.js`)
- Cloud sync and auth
- PWA packaging and offline support

## MVP Focus

Current recommended MVP scope:

1. Mood check-in
2. Task list
3. Focus timer
4. Goals
5. Coach suggestions

The health planner, meal planner, and games are intentionally positioned as secondary modules.

## Architecture snapshot

Project moved from a single-file demo to a modular structure:

- `index.html`
- `styles/main.css`
- `scripts/app.js`
- `scripts/modules/{tasks,coach,goals,storage}.js`
- `data/{exercises,meals}.js`
- `services/coachService.js`

## Accessibility decisions

- Keyboard-friendly controls (buttons, toggles, focusable sections)
- Theme variants: light, dark, high contrast
- Font scaling: normal / large / xlarge
- Reduced motion toggle
- Larger touch targets option
- ARIA live region for status toast updates

## Portfolio story

**Problem:** Users juggle productivity and wellbeing tools across disconnected apps.  
**Persona:** Busy student/knowledge worker needing lightweight daily structure.  
**Trade-off:** Fast local prototype over backend complexity for faster UX iteration.  
**Learnings:** State management, UI modularization, accessibility-first defaults, and safe data handling for import/export.

## Run locally

No build step is required:

1. Clone/download the repository.
2. Open `index.html` in a modern browser.

## Repository metadata suggestions (GitHub UI)

- **Description:** Accessible wellness + productivity companion prototype (vanilla JS).
- **Topics:** `html`, `css`, `javascript`, `wellness-app`, `accessibility`, `productivity`

## License

MIT — see [LICENSE](./LICENSE).
