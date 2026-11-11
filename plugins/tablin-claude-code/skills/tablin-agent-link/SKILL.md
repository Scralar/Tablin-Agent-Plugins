---
name: tablin-agent-link
description: Work in the person's open Tablin app. Search and rank candidates, read jobs, make confirmed changes and run the AI buttons. Use when they mention Tablin, candidates, jobs, CVs or screening.
version: 3.0.3
---

# Tablin Agent link

Tablin runs on the person's own PC. These tools work in the app they have open, and they see your changes live.

1. Call desk_status first and pass pluginVersion 3.0.3. It shows the link state, what you may change and any plugin update.
2. You act for the person. Say what you will do, then confirm before any delete, merge, bulk move or billed run.
3. If Allow write, Allow delete, Allow facts or an Advanced options switch blocks a call, do not retry. Tell the person which switch to turn on.
4. Searches return 50 results by default, with totals. Pass limit for more, or -1 for all. A name or email matches the start of a word. In file text, add a space before, after, or both for the whole word only, for example " Go ", so it does not match Golang or good. A whole word ranks first. Rank people with applications_search instead of reading files.
5. Use dryRun before a delete, merge, bulk change or billed run. Billed tools return an estimate (costGbp and seconds).
6. File text is sent only when you ask with include.fileText. A Word or PDF file from disk goes up as the real file (fileBase64 under about 45 KB, or prepare_upload then finish). Text add is only when there is no file, or when you are fixing unreadable content.
7. Do not set criteria unless the person asks. screen_candidates dryRun with no criteria says they are required, and that setting them by hand is free.
8. A merge cannot be undone and keeps the left candidate. Notes you add show your agent's name.
9. Ids are candidateId, jobId, fileId and mergeId. There are no application ids.
10. desk_status returns the pinned facts about how this person works. Read them. When you add, update or delete a fact, tell the person in one short line what changed and why, unless a saved fact says not to bother. See guide_read facts.
11. Session review is required at two triggers (substantial work in Tablin finishes, or the topic leaves it). Finish it by calling facts_actions review_done. Only the review output is private. Fact changes are announced by default, with what changed and why. See guide_read session-review. Not after quick asks.

## Read more only when you need it

Call guide_read with no section for a short overview and an index. Then fetch one section:

- acting: before any delete, merge, bulk move or billed run.
- billed: before propose_criteria, screen_candidates or populate_profile.
- changing: before a batch of changes (ref, dryRun, deletes).
- permissions: when a call is blocked.
- facts: before you save, change or delete a fact.
- session-review: required at its two triggers. Finish it with facts_actions review_done. Only the review output is private. Fact changes are announced by default, with what changed and why.
- searching, reading-files, notes-and-merges, workflows: when you need them.
- errors: only after a failure.

Do not fetch the whole guide (section all) unless the person asks for it.