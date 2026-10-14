# Privacy and limitations

Followup Desk is a fictional-data workflow prototype. Do not enter real customer phone numbers, addresses, payment details, identity documents, health information, children's information, passwords, or other sensitive records.

## Local storage

Customer names, reception notes, structured fields, plans, and timelines are stored in localStorage for this site and browser profile. This is not an encrypted vault or an access-controlled CRM. Other people using the profile and scripts running with this site's permissions may access it.

There is no cloud customer database, account system, device sync, role-based access, tamper-resistant audit log, or automatic recovery. Private browsing, clearing browser data, or changing origins can remove or separate records. Export a backup regularly.

JSON backups are plaintext and contain the recorded text. Keep them secure. Deleting a record here does not delete exported files, clipboard contents, screenshots, or operating-system backups.

## Network and models

AI is an optional evidence-review beta. The app does not start model downloads automatically, and there is no remote inference API. Downloading requires a deliberate click after a size and limitations disclosure.

The local worker downloads pinned model assets from Hugging Face and runtime files from jsDelivr. Providers receive normal connection data such as IP addresses and requested asset paths. The design passes reception text to a local browser Worker, but a full network audit is still required before claiming no customer-text transmission. Do not infer privacy certification from the word 'local'.

System fonts are used. No advertising, analytics, contact synchronization, or outbound messaging integration is included. Offline model use is not guaranteed; caches and browser memory vary.

## Human control

Copying a draft only writes text to the clipboard. The salesperson decides whether, when, and through which permitted channel to send it. There is no automated sending, calling, campaign enrollment, or repeated follow-up scheduling.

Consent, no-contact instructions, and channel restrictions override model suggestions. Conservative text checks supplement explicit fields but do not solve arbitrary natural-language consent. A matching quote or valid JSON cannot prove an AI interpretation is correct. Historical statements may no longer apply. Explicit retraction/resolution markers pause AI, and strategy adoption requires the associate to confirm current relevance; the marker checks are conservative rules, not comprehensive language understanding. Dates, amounts, negation, product conditions, and promises always need human review.

A completed purchase is not permission for further promotions. Only expressly arranged delivery-service tasks belong in the purchased customer's next actions.

## Before production use

A real deployment needs a separate security and privacy review covering consent and notice, staff access, retention and deletion, device security, network behavior, vendor dependencies, and backups. This prototype does not make a legal-compliance claim.
