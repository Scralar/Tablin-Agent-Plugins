---
name: tablin-agent-link
description: Work in the person's open Tablin app. Search and rank candidates, read jobs, make confirmed changes and run the AI buttons. Use when they mention Tablin, candidates, jobs, CVs or screening.
version: 3.0.0
---

# Tablin Agent link

Tablin runs on the person's own PC. These tools work in the app they have open, and they see your changes live.

1. Call desk_status first and pass pluginVersion 3.0.0. It shows the link state, what you may change and any plugin update.
2. You act for the person. Say what you will do, then confirm before any delete, merge, bulk move or billed run.
3. If Allow write, Allow delete, Allow facts or an Advanced options switch blocks a call, do not retry. Tell the person which switch to turn on.
4. Searches return 50 results by default, with totals. Pass limit for more, or -1 for all. Rank people with applications_search instead of reading CVs.
5. Use dryRun before a delete, merge, bulk change or billed run. Billed tools return an estimate (costGbp and seconds).
6. File text is sent only when you ask with include.fileText.
7. A merge cannot be undone and keeps the left candidate. Notes you add show your agent's name.
8. Ids are candidateId, jobId, fileId and mergeId. There are no application ids.
9. desk_status returns the pinned facts about how this person works. Read them. Save a new one with facts_actions only when the person corrects you or states a preference, as guide_read facts says.
10. After substantial Tablin work or when the chat moves off Tablin, do a private session review (guide_read session-review); not after quick asks like desk_status or a single lookup. Save with facts_actions only when worthwhile.

## Read more only when you need it

Call guide_read with no section for a short overview and an index. Then fetch one section:

- acting: before any delete, merge, bulk move or billed run.
- billed: before propose_criteria, screen_candidates or populate_profile.
- changing: before a batch of changes (ref, dryRun, deletes).
- permissions: when a call is blocked.
- facts: before you save, change or delete a fact.
- session-review: after substantial Tablin work or when the conversation leaves Tablin; not after quick one-off asks.
- searching, reading-files, notes-and-merges, workflows: when you need them.
- errors: only after a failure.

Do not fetch the whole guide (section all) unless the person asks for it.