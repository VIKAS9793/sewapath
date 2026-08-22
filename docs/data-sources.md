# Public Data Source Register

Status is recorded before any dataset is used in analysis.

| Source | Owner | What it provides | Access status | Intended use |
|---|---|---|---|---|
| [CPGRAMS public grievance catalog](https://www.data.gov.in/catalog/public-grievance-details-cpgrams-along-feedback-details) | DARPG | Public grievance and feedback catalog metadata | Detailed records listed as restricted | Confirm the boundary; do not ingest restricted records |
| [CPGRAMS keyword index](https://www.data.gov.in/keywords/CPGRAM) | Data.gov.in | Links to aggregate CPGRAMS resources | Public | Discover current aggregate resources |
| [Year-wise CPGRAMS receipts and redressal, 2020–2024](https://www.data.gov.in/resource/year-wise-total-number-grievances-received-and-redressed-centralised-public-grievance) | Rajya Sabha / DARPG | Brought-forward, receipts, total receipts, and disposed counts | Public, small CSV resource | Baseline national trend |
| [Monthly department-wise receipts and disposals](https://www.data.gov.in/catalog/monthly-department-wise-public-grievance-receipts-and-disposals) | DARPG | Department-level monthly receipts and disposals | Public catalog; resource access to verify | Department and time-series signals |
| [CPGRAMS November 2024 monthly report](https://www.darpg.gov.in/sites/default/files/2024-11-01.pdf) | DARPG | Feedback-call-centre volume and satisfaction by month | Public PDF | Resolution and satisfaction proxy |
| [NeSDA 2021 report](https://nesda.gov.in/publicsite/NeSDA2021_Report.pdf) | DARPG / NeSDA | Citizen satisfaction across 14 e-service criteria | Public PDF | UX benchmark: feedback, tracking, language, end-to-end access |
| [National Government Services Portal](https://services.india.gov.in) | NIC / MeitY | Searchable public service directory | Public website | Discovery and fragmentation audit |

## Restricted-data boundary

The DARPG CPGRAMS access guide identifies detailed grievance records and movement records as restricted datasets. This project will not bypass access controls, scrape authenticated pages, or reproduce personal grievance text.

## Provenance fields

Every acquired file or extracted table must retain:

- source URL;
- publisher;
- publication date and last-updated date, if available;
- retrieval date;
- file checksum;
- license or access note;
- transformation performed;
- limitations and known denominators.
