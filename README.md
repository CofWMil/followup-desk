# Followup Desk

A local-first reception and customer-follow-up workspace for furniture and appliance retail. It helps a salesperson answer four questions: who needs a reply today, why, what must be verified first, and what single next step to propose.

## Current release status

Public fictional-data beta: https://followup-desk.yjbao2008.chatgpt.site/

Optional local AI uses a pinned Apache-2.0 NLI language model to highlight source passages about fit, delivery, price, service, and comfort. It does not generate customer facts or sales copy. Reviewable templates turn supported cues into preparation questions and a suggested strategy; a human chooses the date, permitted channel, and final draft.

The precision-first 16-note evaluation produced 7 supported suggestions and 9 abstentions. Abstentions include real misses. A separate four-note retraction test found two stale historical cues; explicit resolution/retraction markers now pause AI in the app, and adopting any suggested strategy requires a current-relevance checkbox. These controls do not guarantee detection of unseen paraphrases. This is a limited evidence-review assistant, not comprehensive extraction, purchase-readiness prediction, or a demonstrated sales-conversion lift. The model never sets budget, dates, stage, or contact permission.

The initial model download is about 87 MB plus runtime and tokenizer assets. It starts only after a deliberate click and disclosure. Manual work remains available without it. Hosted-browser inference and network verification are tracked separately from Node tests.

## Run

Requires a modern browser and Node.js 20.x (20.19+) or Node.js 22.12 and newer. Install dependencies with npm ci, then run npm run dev. Use npm test for core safety/workflow tests and npm run build for a production static build.

No accounts, backend customer database, outbound messages, analytics, paid inference service, or real customer import are included.

## Five-minute workflow check

1. Open the action queue. Sam Rivera has an overdue cost/service comparison; Alex Morgan has today's refrigerator follow-up. Jordan Lee and Casey Brooks have future appointments. These six people are fictional, with tasks scheduled relative to the first opening date.
2. Inspect a reception note and the confirmed fields. Unknown information stays unknown.
3. Edit the goal, preparation checklist, date, approved channel, and draft. Confirm the review checkbox before saving the plan.
4. Record Alex's follow-up as rescheduled to tomorrow at 14:00. Today's task should disappear without creating a duplicate task, and the timeline should retain the outcome.
5. Change an original fact. The old plan must require review. A no-reply outcome must not lower the customer stage or schedule daily retries.
6. Reload to verify local persistence. Export a backup, then import it to test restoration. Resetting demo customers must retain custom records.

Copying a draft writes only to the clipboard. It never sends a message. Inventory, prices, installation, warranty, and delivery must be verified before making customer commitments.

## Fictional scenarios

- Alex Morgan: broken refrigerator, explicit budget and space constraint, delivery deadline, text-only appointment.
- Jordan Lee: sofa entry and room-fit concerns; measurement first, no premature discount or purchase pressure.
- Sam Rivera: an overdue promised cost and service comparison; unknown competitor details remain unknown.
- Taylor Chen: renovation delay and explicit no-contact request override earlier buying interest.
- Casey Brooks: exploratory mattress comparison; no confirmed budget or purchase date and no daily follow-ups.
- Riley Park: purchased dining table; only an agreed delivery-service task remains.

## Guardrails

- Explicit permission, channel restrictions, no-contact requests, and agreed dates take priority.
- No opaque lead scores, conversion probabilities, wealth inference, or protected-trait profiling.
- Original-record changes invalidate confirmed plans; outcomes replace the next action rather than accumulating duplicate reminders.
- AI suggestions remain untrusted and human-reviewed. Verbatim quote matching alone does not establish semantic correctness.
- Purchased customers retain delivery-service tasks, not sales pressure.

## Data and limitations

Read PRIVACY.md. Records live in this browser's localStorage and are not encrypted or synchronized. Clearing site data, using private browsing, changing browsers, or changing origins can lose records. JSON backups contain reception text and must be protected.

The prototype is for fictional or appropriately authorized de-identified test records. It is not ready for a production customer database. See MODEL_CARD.md and [the test report](artifacts/TEST_REPORT.md) for actual verification results. Node inference tests do not prove browser inference or offline capability.

## License

Project source is available under the [MIT License](LICENSE). Third-party components and model weights retain their respective licenses; see [THIRD_PARTY.md](THIRD_PARTY.md).
