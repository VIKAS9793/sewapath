# MVP Specification: SewaPath

**Working name:** SewaPath
**Purpose:** Help a citizen understand and complete one public-service journey through the correct official or assisted channel.
**Pilot:** Maharashtra Income Certificate on Aaple Sarkar.
**Primary languages:** Marathi, Hindi, English.
**Hosting:** Cloudflare Pages for the static app, Cloudflare Workers for the small feedback API, Cloudflare D1 for aggregate counters, and Turnstile for abuse protection.

## Why this pilot

The Maharashtra Right to Public Services information lists Income Certificate as a notified Revenue Department service with a 15-day time limit and named appeal officers. The official Aaple Sarkar materials also expose document requirements and online/assisted access paths. This makes the journey concrete enough to audit and measure without collecting sensitive citizen records.

Sources: [Aaple Sarkar notified services](https://aaplesarkar.mahaonline.gov.in/en/CommonForm/CitizenServices_RTS), [Aaple Sarkar registration and assisted access](https://aaplesarkar.mahaonline.gov.in/en/Registration/Register/1000), [Maharashtra Income Certificate requirements](https://www.satara.gov.in/en/service/income-certificate/).

## Target user problem

“I need an income certificate, but I do not know whether I qualify, which documents are actually required, which website is official, whether I should apply myself or use a service centre, or what to do if the application is delayed or rejected.”

## MVP user journey

1. **Choose a goal** — The user selects “Income Certificate.”
2. **Understand the route** — The product explains eligibility, official time limit, responsible office, appeal path, online option, and assisted option.
3. **Prepare privately** — A local checklist groups identity, address, income, age, and self-declaration evidence. The product does not upload or store documents.
4. **Continue to the official channel** — The user opens the official Aaple Sarkar destination in a new tab or follows an assisted-service route.
5. **Keep a local record** — The user can save a reference number, submission date, expected date, and next step on the device. No account is required.
6. **Report friction safely** — The user can submit structured feedback using fixed categories, without free-text allegations or personal information.

## Friction feedback categories

- Could not find the correct service
- Eligibility was unclear
- Required documents were unclear
- Language or terminology was difficult
- OTP, login, or identity verification failed
- Upload, payment, or network failed
- Could not find status or receipt
- Application was delayed or rejected
- Needed help from a person or service centre
- Chose offline because it felt safer or clearer

## Public insight rules

The MVP may show only aggregate counts by blocker category and language. It must not show:

- names of citizens, officials, operators, or departments as targets;
- case IDs, phone numbers, addresses, images, recordings, or free-text allegations;
- exact locations or small geographic cells;
- claims that a service or official is corrupt.

Do not display an aggregate category until it has at least 10 independent feedback events. If independence cannot be established, suppress the public count and use it only for internal quality analysis.

## MVP non-goals

- Filing or forwarding official grievances
- Acting as a government authority
- Holding identity documents or evidence
- Providing legal advice
- Building a public accusation map
- Automating eligibility or approval decisions
- Supporting every Indian state or service at launch

## Success measures

- At least 70% of usability-test participants find the correct official route without facilitator intervention.
- At least 80% can identify the expected timeline and next step.
- At least 80% can identify the minimum document groups before leaving the guide.
- At least 60% of feedback submissions identify a specific friction category rather than “other.”
- Zero production requests persist a document, phone number, Aadhaar number, name, address, or free-form complaint text.

## First release acceptance criteria

- Works on a low-end mobile viewport and a slow connection.
- Marathi, Hindi, and English content is manually reviewed; machine translation is not the source of truth.
- All external application links are visible as official destinations before navigation.
- The local checklist works without an account and has a clear “delete my local checklist” action.
- Feedback endpoint accepts only an allowlisted service ID, language, channel, completion state, and blocker code.
- Turnstile verification happens server-side; tokens are not stored.
- D1 stores only aggregate counters and no raw submissions.
- Privacy notice, data-minimization statement, and emergency disclaimer are visible before feedback submission.

## Extension after MVP evidence

Only after the pilot produces reliable friction data should we add Age/Nationality/Domicile Certificate and Temporary Residence Certificate journeys. The extension decision must be based on observed friction and service usefulness, not feature volume.
