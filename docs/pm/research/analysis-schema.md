# Analysis Schema

The first normalized table is designed for aggregate public sources and must preserve the distinction between observed facts and derived proxies.

| Field | Type | Meaning |
|---|---|---|
| `source_id` | string | Stable identifier from the source register |
| `publisher` | string | Publishing authority |
| `published_on` | date | Publication date, when available |
| `period_start` | date | Start of observation period |
| `period_end` | date | End of observation period |
| `geography` | string | India, state, UT, or other published geography |
| `service_or_department` | string | Published department or service label |
| `metric` | string | receipts, disposed, pending, satisfaction, feedback, or other |
| `value` | number | Numeric value as published |
| `unit` | string | count, percent, days, or other |
| `denominator` | number/null | Denominator when the source provides one |
| `evidence_class` | enum | observed, derived_proxy, hypothesis |
| `limitation` | string | Known caveat or comparability warning |

## Derived proxy rules

- `disposal_rate = disposed / total_receipt` only when both values share the same period and scope.
- `pendency_rate` is calculated only when the source explicitly defines pending records for the same period.
- `satisfaction_gap = 100 - satisfaction_percent` is not a failure rate; it includes neutral and missing responses unless the source says otherwise.
- Grievance volume is a demand signal, not a prevalence estimate, unless a service-usage denominator is available.
- A department or state must not receive a public “risk” label from this table alone.
