# MVP Decision Record

## Decision

Build a single-service, multilingual citizen journey guide for Maharashtra Income Certificate applications, with anonymous structured friction feedback and no document storage.

## Evidence behind the decision

- Public research shows confusion, difficulty, language, privacy, and status/feedback gaps in digital service journeys.
- Maharashtra publishes a service list, time limit, designated officers, appeal officers, document requirements, and online/assisted access information for the pilot service.
- A single service keeps the content auditable and reduces the risk of giving incorrect guidance across many departments.
- Aggregate feedback can tell us which parts of the journey require redesign without collecting sensitive complaint narratives.

## Risks and controls

| Risk | Control |
|---|---|
| Stale government requirements | Show source URL and last-verified date; schedule manual review |
| Citizen mistakes the guide for government | Strong visual and text distinction; official destination shown before navigation |
| Sensitive documents are submitted | No upload controls; local checklist only; reject free text |
| Spam distorts insights | Turnstile, allowlisted enums, rate limiting, minimum-count display threshold |
| Citizen expects legal or official resolution | Clear non-authority disclaimer and official escalation links |
| Shared device exposes private progress | No account or server profile; local delete control; warn users on shared devices |

## Not yet decided

- Product name and visual identity
- Whether the first frontend is plain HTML/CSS/JavaScript or a framework
- Whether public aggregate feedback is shown in the first deployment or kept internal until the data-quality threshold is reached
- Domain name and Cloudflare account/project configuration
