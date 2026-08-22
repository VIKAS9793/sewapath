# SewaPath search and measurement launch plan

**Status:** Implemented as a launch-ready baseline; production verification is still required.
**Audience:** Maharashtra citizens searching for income-certificate help in Marathi, Hindi, or English.
**Positioning:** SewaPath is an independent navigation aid. It is not the government portal and does not decide eligibility.

## Search intent strategy

The first page deliberately owns one narrow, high-intent problem instead of making a generic “all government services” claim:

- Primary intent: `Maharashtra income certificate online`
- Marathi intent: `उत्पन्न प्रमाणपत्र महाराष्ट्र ऑनलाइन`
- Hindi intent: `महाराष्ट्र आय प्रमाण पत्र ऑनलाइन`
- Support intent: `income certificate documents Maharashtra`, `Aaple Sarkar income certificate`

The page should answer the searcher’s next decision in under one screen: what route is this, what should I prepare, and where is the official service list? The copy must never imply that SewaPath is an official department, guarantees approval, or replaces the Aaple Sarkar process.

## Implemented technical SEO

- Descriptive title, meta description, robots directives, Open Graph, Twitter card, and theme metadata.
- `WebApplication` JSON-LD with free access, supported languages, and independent-product disclosure.
- Crawlable `noscript` fallback with useful service language and the official portal link.
- Three crawlable preparation guides for English, Marathi, and Hindi intent:
  - `/maharashtra-income-certificate-documents/`
  - `/mr/maharashtra-income-certificate-documents/`
  - `/hi/maharashtra-income-certificate-documents/`
- Responsive public-site presentation for desktop, tablet, and mobile; the deployed page hides the phone-frame showcase shell.
- Public disclosure pages for purpose/independence, privacy, safety/non-competence, and accessibility, all linked from the app footer and sitemap.
- Root `robots.txt` and `sitemap.xml`; the build rewrites them to absolute URLs.
- Build-time `SEWAPATH_SITE_URL` support so the canonical URL, social image URL, sitemap, and robots sitemap directive follow the real Cloudflare Pages/custom domain.
- No fake review, FAQ, government, or eligibility structured data. Add only when the page genuinely contains that content.
- Each language guide includes reciprocal `hreflang` links; the interactive homepage remains a single multilingual experience.

Run a production build with the real origin:

```powershell
$env:SEWAPATH_SITE_URL = "https://your-final-domain.example"
npm.cmd run build
```

## Measurement contract

The UI emits only allowlisted, aggregate events through `src/analytics.ts` when a consented `gtag` or Bing `uetq` integration exists:

| Event | Parameters | Decision supported |
| --- | --- | --- |
| `language_selected` | `language` | Which language entry point needs improvement |
| `voice_demo_started` | `language` | Whether voice-first discovery is used |
| `typed_entry_opened` | `language` | Whether typing remains the preferred fallback |
| `service_request_submitted` | `language`, `input_method`, `service` | Completion of first-step intake |
| `official_portal_clicked` | `service` | Handoff intent to the official route |
| `official_source_check_clicked` | `service` | Whether visitors verify current instructions on the official source |
| `official_portal_reopened` | `service` | Return to the official route after preparation or handoff |
| `journey_restarted` | `language` | Whether the guide needs another attempt |
| `friction_prompt_opened` | `language` | Demand for anonymous friction reporting |
| `friction_feedback_selected` | `language`, `friction_reason` | Which allowlisted blocker needs product improvement |

Never add request text, names, phone numbers, addresses, document names, exact locations, or accusations to analytics parameters. Analytics is disabled until the build has a configured Measurement ID and the visitor explicitly consents. `src/analytics.ts` loads `gtag.js` dynamically after consent rather than placing a tracking tag in `index.html`.

## Google Analytics 4 setup

1. Create or select the GA4 web data stream for the final domain.
2. In Cloudflare Pages, open `sewapath` → Settings → Environment variables and add `VITE_GA_MEASUREMENT_ID` with the supplied `G-R6V2MX3SLC` value for Production and Preview. Keep the value out of research data and citizen-submitted payloads.
3. Save the variable and trigger a new deployment. Do not paste the raw Google tag into `index.html`; the app presents a consent choice and loads GA4 only after “Allow analytics”.
4. Mark `official_portal_clicked` and `service_request_submitted` as conversions only after baseline data is available.
5. In DebugView, verify event names and confirm that no free text is sent. Google Signals and ad personalization are disabled by the app configuration.
6. Build an exploration by `language`, `input_method`, and device—not by identity.

## Search Console setup

1. Verify the final domain property.
2. Submit `/sitemap.xml`.
3. Inspect `/` and request indexing after the first production deploy.
4. Review Page indexing, Core Web Vitals, and Search performance weekly for the first month.
5. Segment queries by Marathi/Hindi/English intent and compare clicks to `official_portal_clicked` rather than treating raw traffic as success.

## Bing Webmaster Tools setup

1. Verify the same final domain.
2. Submit `/sitemap.xml` and run URL inspection.
3. Check crawl/index coverage and SEO reports after the first crawl cycle.
4. Use IndexNow only when a real public URL changes; do not submit private or user-specific routes.

## Launch scorecard

Primary outcome: `official_portal_clicked / unique landing sessions`.

Guardrails:

- No document uploads.
- No personal identifiers in analytics or feedback payloads.
- No public friction insight is shown until an aggregation threshold is defined and audited.
- At least one successful official-portal handoff in each supported language before promoting the pilot.
- Monitor Search Console/Bing impressions and queries, but do not optimize for clicks if the result causes citizens to misunderstand SewaPath’s independent role.

## Source guidance

- [Google Search Central: SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Google Search Central: title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google Analytics: set up events](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Google Search Central: build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Bing Webmaster Tools: webmaster guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a)
- [Bing Webmaster Tools: sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed)
- [Cloudflare Pages: custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
