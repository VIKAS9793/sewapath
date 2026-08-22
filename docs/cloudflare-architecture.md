# Cloudflare Deployment Architecture

## Components

### Cloudflare Pages

Hosts the static, mobile-first frontend and the public service-guide content. Static content is preferred because the public guide contains no personal data and should remain available even if the feedback API is unavailable.

### Cloudflare Workers

Exposes one narrow endpoint:

`POST /api/feedback`

The Worker validates the schema, verifies the Turnstile token, applies rate limits, and increments an aggregate counter. It must reject unknown fields and never log request bodies.

### Cloudflare D1

Stores only aggregate rows:

```sql
CREATE TABLE friction_counts (
  service_id TEXT NOT NULL,
  language TEXT NOT NULL,
  channel TEXT NOT NULL,
  blocker_code TEXT NOT NULL,
  outcome TEXT NOT NULL,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (service_id, language, channel, blocker_code, outcome)
);
```

No citizen profile, document, IP address, phone number, email, name, address, case ID, or free-text narrative is stored.

### Cloudflare Turnstile

Protects the anonymous feedback endpoint from automated submissions. The server verifies the token with Cloudflare and discards it after validation.

## Free-tier operating assumptions

Cloudflare documents a Workers Free limit of 100,000 requests per day and a Pages Free limit of 500 builds per month. Turnstile's free plan supports up to 20 widgets and unlimited challenges. These limits are sufficient for a small pilot, but the application must fail safely if the feedback API quota is exceeded: the static guide remains usable and feedback becomes temporarily unavailable.

Sources: [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [Pages limits](https://developers.cloudflare.com/pages/platform/limits/), [Turnstile plans](https://developers.cloudflare.com/turnstile/plans/).

## Data-flow safety

```text
Citizen browser
  ├─ local checklist only ──> browser storage
  ├─ official application ──> official government portal
  └─ structured feedback ──> Turnstile -> Worker -> D1 aggregate counter
```

The product never proxies identity documents or takes custody of the official application.

## Failure behavior

- If Pages is available and Worker is down, the guide still works.
- If Turnstile fails, no feedback is written.
- If D1 limits are reached, return a neutral retry message and do not queue personal data.
- If an official link changes, show the last verified date and a safe link back to the official service directory.
