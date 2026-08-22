# Research Plan

## Objective

Identify the most common and consequential points of confusion or frustration in Indian public-service journeys, using public grievance and feedback data instead of starting with live interviews.

## Scope for phase one

- Geography: India-wide public sources, with Maharashtra retained as a possible pilot because it is one of the higher-connectivity states in the available national research.
- Evidence: CPGRAMS and DARPG aggregate statistics, official monthly reports, NeSDA citizen assessment results, and public service-directory metadata.
- Output: a ranked friction taxonomy, a shortlist of high-friction service journeys, and UX requirements for a safe citizen-service guide.

## What the data can and cannot tell us

Public sources can show:

- volume by department, state, or period;
- receipts, disposal, pendency, and disposal time;
- satisfaction and feedback patterns;
- whether a service is discoverable through a public directory.

Public sources generally cannot show:

- the exact step where an individual abandoned a journey;
- whether the same person submitted through multiple channels;
- the complete narrative of a citizen's experience;
- whether a complaint is true, malicious, duplicated, or misunderstood.

Therefore, all findings will be labelled as either measured evidence, a proxy, or a hypothesis requiring later validation.

## Friction taxonomy

1. Discovery: cannot find the correct service or authority.
2. Eligibility: cannot tell whether the service applies to them.
3. Documentation: unclear, excessive, or rejected documents.
4. Language and comprehension: terminology, translation, or reading burden.
5. Authentication: OTP, identity, account, or shared-device problems.
6. Transaction: payment, upload, network, or form failure.
7. Status and closure: no receipt, tracking, timeline, or meaningful resolution.
8. Trust and privacy: uncertainty about officialness, data use, or safety.
9. Assisted access: dependence on a CSC, cybercafe, family member, or intermediary.

## Analysis rules

- Do not rank a department as “bad” from grievance volume alone; normalise by service usage when a denominator is available.
- Separate grievance intake volume from dissatisfaction and unresolved pendency.
- Preserve source dates and publication dates for every observation.
- Keep raw source files immutable after acquisition; write cleaned outputs separately.
- Suppress small cells in any future public visualisation to reduce re-identification risk.

## Planned outputs

- `docs/data-sources.md`: source register and access status.
- `data/raw/`: downloaded public source files with provenance metadata.
- `data/processed/`: normalized tables and derived indicators.
- `reports/`: evidence-backed findings and UX implications.
- `src/`: reproducible collection and analysis code after the source contracts are confirmed.

## First product hypothesis

The safest useful product is a citizen-service journey layer: explain the correct service, documents, fee, timeline, official link, tracking method, and safe fallback. It should complement existing government and assisted channels rather than replace them.
