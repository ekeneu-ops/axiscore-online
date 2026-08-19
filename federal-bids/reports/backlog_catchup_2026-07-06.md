# Backlog catch-up — Stage-2 extraction + Stage-3 qualification — 2026-07-06

One-time run clearing the survivor backlog before cutover (pre-cutover checklist item 1).

## Extraction (551 bids, 19:00–20:09 + earlier session, headed Chrome)

| outcome | n | notes |
|---|---|---|
| EXTRACTED | 333 | items recovered, counts recorded |
| EXTRACT_FAILED:zero-candidate-tables | 215 | attachments read, no line-item table — risk-call routing |
| EXTRACT_FAILED:broken-link | 2 | transient, retried automatically (attempt cap 3) |
| EXTRACT_FAILED:scanned-image-pdf | 1 | terminal, risk-call routing |

- Incremental selection proven: the 10 sample-gate bids were skipped as terminal; 36
  deadline-guaranteed bids (close ≤ 5d) ran first, exempt from cap rank.
- **Owner's-hard-rule proof at scale: 54 grid-empty bids recovered their item list from
  attachments** (107 attachment-sourced EXTRACTED total). Largest: 765 lines (Denton
  warehouse alliance), 424 lines (El Paso heavy-duty parts). The grid-empty +
  parseable-attachment-table class routes to EXTRACTED — Step-7 checklist item confirmed.
- No IonWave rate limiting across ~2,400 attachment fetches (no 429/503/Retry-After).

## Qualification (340 EXTRACTED bids, 7,138 lines vs best_cost_full_2026-07-06.csv, 2.97M rows)

| outcome | n | capture routing (0013) |
|---|---|---|
| coverage >= 70 | 0 | staged / submit |
| coverage 1–69 | 13 | risk_call with % on card |
| coverage 0, lines_total > 0 | 261 | no_bid "0/<N> lines matched" — evidenced |
| EXTRACTED, no qualifiable product lines | 66 | risk_call "no qualifiable product lines" |

Zero staged is the honest result: this backlog is v1's reject pile (services, construction,
one-off equipment). Three fabricated stagings were caught and killed during audit, each now
a regression test:
1. school-bus bid 100%-"matched" a $0.60 'OPTIONS' SKU — part regex grabbed the word
   "options" from prose ("all manufacturer options"); parts now require an explicit
   `#/no/number` marker AND a digit;
2. "Security Guard Services Renewal Year 2" -> VIPRE-renewal SKU; 3. "License and Annual
   Subscription Year 1" -> $0.01 monitoring SKU — generic contract/time/commerce tokens
   (year, renewal, annual, license, total, project, scope-of-work...) no longer carry match
   weight; lump-sum/scope-of-work lines are non-product.

Accepted limit (report to Step 8): token-overlap remains the weakest evidence tier — real
staged candidates are expected from fresh IN_SCOPE bids carrying part numbers or xlsx
pricing sheets, which match at part/spec grade. Every unmatched line is listed as a gap in
fb_records/<bid>/coverage.json (evidence_path on each row).
