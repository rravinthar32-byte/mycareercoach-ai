# AI-Based Personalized Career Guidance System

Prototype that recommends careers, finds skill gaps and builds learning plans for college students.

## Architecture
- TanStack Start v1 (React 19, TypeScript, Vite 7), file-based routes in `src/routes`
- Tailwind CSS v4 design tokens in `src/styles.css`, shadcn/ui components
- `src/lib/career-store.tsx` – `CareerProvider` context (profile, skills, selected career, analysis status)
- `src/lib/career-data.ts` – typed sample data (careers, skill gaps, learning plan, projects)
- `src/components/app-shell.tsx` – shared navigation

## Screens
`/` → `/profile` → `/skills` → `/analysis` → `/recommendations` → `/skill-gap` → `/learning-plan` → `/job-prep` → `/assistant` → `/dashboard`

## Error handling
- `__root.tsx`: `errorComponent` (retry + home, reports via `reportLovableError`) and `notFoundComponent` (404)
- `src/server.ts` + `errorMiddleware` in `src/start.ts`: SSR failures return an HTML error page
- `useCareer()` throws if used outside `CareerProvider`

## Testing (planned)
Vitest + React Testing Library for `src/lib` logic and provider; component tests for forms and boundaries; Playwright for the end-to-end happy path. Run with `bunx vitest run`.

## Data model (planned, Lovable Cloud)
- `profiles`(id, user_id, name, degree, year, cgpa, soft_skills, experience, career_goal)
- `student_skills`(id, user_id, skill, proficiency, type)
- `careers`(id, title, description, salary_range, required_skills[])
- `recommendations`(id, user_id, career_id, match_score, reasons[])
- `learning_items`(id, user_id, month, skill, topic, duration, progress)
- `chat_messages`(id, user_id, role, content)

## API (planned server functions)
`saveProfile`, `analyzeProfile`, `getSkillGap`, `generateLearningPlan`, `askCareerAI`, `updateProgress`.

Currently all data is in-memory sample data; no backend endpoints exist yet.

## Development
```sh
bun install
bun run dev
```
