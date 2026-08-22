# Initial Evidence Review

**Status:** Desk research complete; public aggregate acquisition in progress
**Research question:** Where do citizens experience enough uncertainty or effort to abandon a digital public-service journey or switch to assisted/offline access?

## Evidence summary

### 1. Access is not the same as readiness

The IAMAI/Kantar *Internet in India 2024* report estimates that 41% of India's population were non-active internet users, rising to 51% in rural India. Among non-active users, the reported barriers included lack of awareness of internet benefits (25%), difficulty understanding and using the internet (20%), no home internet connection (22%), confusion (16%), and privacy concerns (13%). These are population-level internet barriers, not direct government-portal abandonment measures, so they are treated as context rather than a service funnel rate.

Source: [IAMAI/Kantar Internet in India 2024](https://www.iamai.in/sites/default/files/research/Kantar_%20IAMAI_report_2024_.pdf)

### 2. Shared devices create a private-service problem

The same report records that 20% of internet users accessed the internet through someone else's mobile in 2024, with a higher rural share of 24%. This makes persistent login, OTP delivery, uploaded documents, saved drafts, and private grievance reporting potentially unsafe or unreliable for some users.

Source: [IAMAI/Kantar Internet in India 2024](https://www.iamai.in/sites/default/files/research/Kantar_%20IAMAI_report_2024_.pdf)

### 3. Language and voice are core UX requirements

The report states that 98% of internet users accessed content in Indic languages in 2024, while 57% of urban users preferred Indic-language content. It also reports 140 million voice users. This supports a multilingual, voice-assisted discovery layer, but it does not prove that voice alone will solve public-service completion.

Source: [IAMAI/Kantar Internet in India 2024](https://www.iamai.in/sites/default/files/research/Kantar_%20IAMAI_report_2024_.pdf)

### 4. The official service experience is acceptable for many users but not reliably complete

The NeSDA 2021 citizen assessment reports 74% satisfaction for end-service availability without manually visiting a government office or kiosk, 74% for tracking an e-service or grievance, and 70% for the user-feedback facility. For the feedback facility, 21% of respondents were neutral and 9% dissatisfied. The important gap is not only filing; it is feedback, tracking, and confidence in what happens next.

Source: [NeSDA 2021 report](https://nesda.gov.in/publicsite/NeSDA2021_Report.pdf)

### 5. Resolution quality is a separate problem from portal access

The DARPG November 2024 CPGRAMS report records 517,338 feedback calls collected from January through November 2024 for central ministries and shows monthly satisfaction ranging from 44% to 63%. This is a feedback-call-centre measure, not a universal citizen satisfaction rate, but it supports treating resolution clarity and closure as separate UX problems.

Source: [DARPG CPGRAMS November 2024 monthly report](https://www.darpg.gov.in/sites/default/files/2024-11-01.pdf)

### 6. Offline assistance is often a successful service channel

In a July 2026 government release, the government reported 5,01,731 functional Common Service Centres and 48.54 crore transactions in FY 2025–26. The same release cites impact assessments reporting 98% of beneficiaries obtained the required service and 95% were satisfied. These are government-reported figures and should not be generalized to every CSC, but they show why an offline or assisted route can remain attractive: it reduces uncertainty and provides a human guide.

Source: [MeitY/PIB release on CSCs and digital public services](https://www.pib.gov.in/PressReleasePage.aspx?PRID=2290995&lang=2&reg=48)

## Working conclusion

The product opportunity is not “put more government services online.” It is to reduce uncertainty across a mixed journey:

`citizen goal → correct service → eligibility → documents → official channel → submission → receipt → tracking → fallback`

The product should support self-service and assisted service equally. It should explain the journey, preserve a private checklist, link only to official destinations, and collect anonymous aggregate friction feedback after the citizen has attempted the service.

## Research limitations

- Public aggregate sources do not expose a complete step-by-step abandonment funnel.
- CPGRAMS detailed grievance and movement records are identified as restricted in the public access guide.
- Grievance volume is affected by awareness, campaign effects, service population, and channel availability.
- Satisfaction measures may have non-response and selection bias.
- The current evidence identifies high-value hypotheses; it does not yet select the first service to build.

## Next evidence task

Acquire and normalize public CPGRAMS aggregate files, then compare three signals where possible:

1. receipt volume;
2. disposal and pendency;
3. feedback or satisfaction.

The first candidate service journey should be selected only after this comparison and a manual audit of the official online and assisted paths.
