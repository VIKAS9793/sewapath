# SewaPath

SewaPath is a calm, multilingual guide that helps Maharashtra residents understand a public-service route before they open the official portal.

The first pilot focuses on the Maharashtra income certificate journey in Marathi, Hindi, and English. It turns an uncertain first step into a small checklist, an official Aaple Sarkar handoff, and a safer way to signal where digital service steps feel confusing.

> SewaPath is an independent navigation aid. It is not a government portal, does not decide eligibility, and does not guarantee approval.

## Product promise

- Start with the citizen's language.
- Explain the next step before sending people to an external portal.
- Keep documents and personal identifiers out of the prototype.
- Preserve official and assisted channels instead of forcing a digital-only path.
- Learn from anonymous, aggregated friction signals rather than publishing accusations.

## First user flow

1. Choose Marathi, Hindi, or English.
2. Say or type the service needed.
3. See a short preparation checklist.
4. Open the official Aaple Sarkar service list.
5. Optionally signal where the digital journey became confusing.

The voice control is a safe prototype interaction: it demonstrates the voice-first path but does not record audio.

## Research foundation

The product direction is based on desk research into public evidence about digital-service friction, including language preference, confusion, assisted access, tracking, and satisfaction signals. The research plan deliberately excludes restricted grievance text and personal case records.

- [Public PM documentation](docs/pm/README.md)
- [Data-source boundary](docs/pm/research/data-sources.md)
- [Analysis schema](docs/pm/research/analysis-schema.md)
- [Cloudflare architecture](docs/pm/technical/cloudflare-architecture.md)
- [SEO and analytics launch plan](docs/pm/growth/seo-analytics-launch.md)
- [Production product boundary](docs/pm/product/production-product-spec.md)

## Run locally

Requirements: Node.js 22 or later.

```powershell
npm.cmd ci --prefer-offline --no-audit --no-fund
npm.cmd run dev
```

Open the local Vite URL shown in the terminal. The mobile runtime provides an in-browser iPhone/Pixel preview for checking the citizen flow.

## Verify the project

```powershell
npm.cmd run check:runtime
npm.cmd run build
npm.cmd run test:sites
```

The build output for Cloudflare Pages is:

```text
dist/client
```

To generate absolute canonical, sitemap, robots, and social URLs for a final domain:

```powershell
$env:SEWAPATH_SITE_URL = "https://your-final-domain.example"
npm.cmd run build
```

## Cloudflare Pages configuration

**[Open the live SewaPath public portal](https://sewapath.pages.dev)**

Public disclosures: [Purpose](https://sewapath.pages.dev/purpose/), [Privacy](https://sewapath.pages.dev/privacy/), [Safety](https://sewapath.pages.dev/safety/), and [Accessibility](https://sewapath.pages.dev/accessibility/).

For Git-integrated Pages deployment:

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist/client` |
| Root directory | `/` |
| Node version | `22` |
| Environment variable | `SEWAPATH_SITE_URL` |
| Analytics variable | `VITE_GA_MEASUREMENT_ID` |

Deploy first to the free `*.pages.dev` hostname. Attach a custom domain only after the first deployment is verified.

## Privacy and safety boundary

The prototype does not upload documents, request an account, or send citizen-entered text to analytics. Product events are allowlisted and contain only aggregate attributes such as language, input method, and service slug. GA4 loads only after the visitor chooses “Allow analytics”; Google Signals and ad personalization remain disabled. The product must not be extended into public accusations, individual case tracking, or a promise of official action without a new safety and legal review.

## Project structure

```text
src/Prototype.tsx       Citizen-facing flow
src/prototype.css       Product-owned visual system
src/analytics.ts        Privacy-safe optional event bridge
public/assets/sewapath  Approved product illustrations and logo
public/seo-guide.css    Responsive public guide styling
public/*/index.html     Crawlable English, Marathi, and Hindi guides
public/{purpose,privacy,safety,accessibility}
                       Public disclosure pages
docs/pm/                Public product, growth, technical, and research docs
worker/                 Cloudflare static-site worker shell
```

## License and status

This is the production foundation for the first SewaPath service journey. Confirm the final license, support contact, privacy notice, and jurisdiction-specific service details before public promotion.
