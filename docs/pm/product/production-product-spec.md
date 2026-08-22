# SewaPath production product boundary

**Status:** Production foundation in progress
**Owner:** Vikas Sahani
**Last official-source check:** 2026-08-22

## Product promise

SewaPath is an independent, multilingual preparation and navigation layer for
citizens. It reduces uncertainty before a person uses an official public-service
portal. The first production journey is the Maharashtra income-certificate
route through Aaple Sarkar.

SewaPath does not issue a certificate, decide eligibility, verify documents,
accept an application, process payment, show official status, or promise an
approval. Those actions belong to the official government service.

## Information-parity rule

Every citizen-facing instruction must be classified as one of these:

1. **Preparation aid:** a broad, non-authoritative suggestion that helps a
   citizen get ready without collecting documents or personal data.
2. **Official-source instruction:** a link or wording that is explicitly
   attributed to the official Maharashtra service portal.
3. **Safety boundary:** a statement that SewaPath cannot confirm eligibility,
   fees, documents, timelines, application status, or outcome.

SewaPath must never present a preparation aid as an exhaustive checklist. Before
the citizen acts, the interface must urge a second check on the official
Maharashtra service list. The official site is the final source for current
documents, fees, eligibility, forms, timelines, application status, and appeal
instructions.

The official destination currently used by the product is the [Aaple Sarkar
notified-services list](https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS).
The link must be reviewed whenever the official site changes, returns an error,
or moves the service to another government domain.

## First production journey

| State | Citizen need | SewaPath responsibility | Safe exit and back path |
| --- | --- | --- | --- |
| Listen | Start in a familiar language | Offer voice-demo or typed entry without storing the request | Language switch and back to start |
| Route | Know what to prepare | Show broad preparation categories and a visible official-source check | Return to intake or open official source |
| Handoff | Continue correctly | Open the official service directory in a new tab and clearly mark the domain | Citizen remains on SewaPath and can reopen official source |
| Next | Know what to do after leaving | Remind the citizen to save the official acknowledgement and use only the official status route | Reopen official source or restart |
| Friction | Signal what was confusing | Accept only fixed, anonymous blocker categories | Return to the route; no allegation or case details |

The application never claims that a click equals an application submission. It
also never claims that a return to SewaPath proves an official outcome.

## Liability and safety controls

- Place the non-government and non-competence disclosure near the decision to
  open the official portal, not only in a footer.
- Tell citizens to verify the current official instructions before uploading,
  paying, sharing an OTP, or relying on a timeline.
- Never ask for Aadhaar, OTP, password, identity documents, application IDs,
  phone numbers, or free-form allegations in SewaPath.
- Never send a citizen to an unofficial form, agent, payment page, or status
  page. Assisted access must be described as an authorised government channel,
  and the citizen must verify it on the official site.
- Preserve a clear route to purpose, privacy, safety, accessibility, and the
  owner contact: vikassahani17@gmail.com.

## Analytics and data boundary

Analytics is optional and consent-gated. Only allowlisted event names and
aggregate attributes may be sent. Request text, identity, document names,
application numbers, exact locations, and accusations are prohibited in
analytics and feedback payloads.

## Production completion gates

This product foundation is not a claim of government integration. Before public
promotion, complete and record:

- official-source review for each service page and language;
- domain, HTTPS, Cloudflare environment variables, deployment rollback, and
  error-monitoring checks;
- GA4 Realtime/DebugView verification after explicit consent, plus Search
  Console and Bing sitemap inspection;
- keyboard, screen-reader, mobile, desktop, slow-network, and no-JavaScript
  checks;
- dependency, security-header, privacy, and content review;
- a written agreement and secure backend review before adding any official API,
  account, status, document, or payment integration.
