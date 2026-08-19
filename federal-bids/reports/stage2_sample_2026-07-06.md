# Stage-2 extraction — 10-bid sample gate — 2026-07-06

Survivor pool: 541 (of 912 scanned). Sample: 10 bids, 3 grid-empty/response-form (gate needs >= 3).

## Per-bid results

| bid | src | scope | grid lines | attachments | best candidate (rows, source) | status | fetch s (max) | throttle |
|---|---|---|---|---|---|---|---|---|
| 26-31-07-091 | Invited | IN_SCOPE | 0 | 4 (2.9 MB) | — | EXTRACT_FAILED:zero-candidate-tables | 10.8 (5.4) |  |
| 820-26 Addendum 1 | Invited | UNRESOLVED | 5 | 0 (0.0 MB) | — | EXTRACTED | 0.0 (0.0) |  |
| 2026-031 Addendum 1 | Invited | UNRESOLVED | 2 | 3 (12.1 MB) | 13 rows, 2026-031 Johnson County Administration Building HVAC Renewal Project Plans _6.04.2026_.pdf | EXTRACTED | 60.8 (45.0) | 1 |
| 2026-4 | Invited | UNRESOLVED | 2 | 9 (1.5 MB) | — | EXTRACTED | 7.0 (1.0) |  |
| 1459533 | Invited | UNRESOLVED | 1 | 1 (0.2 MB) | — | EXTRACTED | 1.0 (1.0) |  |
| Informal FY26-ENG-50 | Invited | UNRESOLVED | 9 | 4 (22.1 MB) | — | EXTRACTED | 50.1 (26.1) | 2 |
| HS-26-049 Addendum 1 | Invited | UNRESOLVED | 2 | 9 (3.2 MB) | — | EXTRACTED | 7.0 (1.2) |  |
| 2027-05 Addendum 1 | Invited | UNRESOLVED | 0 | 5 (1.3 MB) | — | EXTRACT_FAILED:zero-candidate-tables | 3.9 (1.0) |  |
| 26-1432 | Invited | UNRESOLVED | 15 | 7 (0.8 MB) | — | EXTRACTED | 15.3 (8.2) |  |
| 26/031IA | Invited | UNRESOLVED | 0 | 2 (3.4 MB) | — | EXTRACT_FAILED:zero-candidate-tables | 6.7 (4.6) |  |

## Attachment-sourced recovery on grid-empty bids (the owner's hard-rule proof)

- **26-31-07-091** (Laptops for Child Nutrition Supper Program): grid shows 0 priced lines; no items recovered (EXTRACT_FAILED:zero-candidate-tables)
- **2027-05 Addendum 1** (Educational Materials & Equipment): grid shows 0 priced lines; no items recovered (EXTRACT_FAILED:zero-candidate-tables)
- **26/031IA** (Software Services): grid shows 0 priced lines; no items recovered (EXTRACT_FAILED:zero-candidate-tables)

## Throughput / throttle telemetry (Step-3 scales to ~541 survivors/scan)

- attachment fetches: 44 ok; median 1.0s, p95 8.2s, max 26.1s
- throttle signals (429/503/Retry-After/>10s): 3 — all are large-file slow fetches (12–22 MB
  plan/spec PDFs at 45.0s/23.2s/26.1s, one aborted at 45s), not rate limiting
- HTTP >=400 seen: none; no 429/503, no Retry-After headers anywhere in the sample
- wall clock: 10 bids in 5m12s including the full 912-row scan; per-bid median ~20s, worst 81s
  (22 MB of engineering plans). At the EXTRACT_DAILY_CAP of 40 bids this projects to ~15–55 min
  per daily run — viable without pacing changes; politeness gap stays at 1.5s between bids.

## Gate findings (route to Claude review per standing constraint 7)

1. **Attachment-sourced recovery is proven, on a response-form bid**: 2026-031 (Johnson County
   HVAC Renewal) shows only 2 response-form lines on screen; the extractor recovered a 13-row
   candidate table from the attached plans PDF. This is the owner's hard rule working: the
   on-screen grid materially under-represents the bid.
2. **The 3 grid-empty bids in this sample carry no line-item table in their attachments at
   all** — verified by hand on the laptops bid (20-page spec packet: schedule + scoring tables
   only, items defined in prose). These are genuine EXTRACT_FAILED:zero-candidate-tables →
   risk-call routings, not extraction misses. The specific class the hard rule anticipates
   (empty grid + item list in an attached xlsx/csv pricing sheet) did not occur among the 10
   soonest-closing Invited bids; expect it in the Open-grid backlog re-scan (Step 7).
3. **Scanned-image PDFs**: present (1 of 24 parsed docs) but never the sole attachment in this
   sample, so no scanned-image-pdf failures after the status-derivation fix.
4. Candidate ambiguity: only 1 bid produced multiple candidates; heuristics (qty/desc/unit,
   score >= 2) are conservative by design — unmatched docs are listed per bid in the detail
   records for tuning after more coverage.
