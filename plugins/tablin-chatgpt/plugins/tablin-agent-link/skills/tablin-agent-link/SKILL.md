---
name: tablin-agent-link
description: >-
  Use the Tablin desktop app through the tablin server for jobs,
  candidates, screening and notes. Use when the user mentions Tablin,
  their jobs or candidates, screening, shortlists, or when a tablin tool fails.
---

# Tablin Agent link

Tablin is a desktop app on the person's own computer: an employer CV-screening desk that is growing into a recruiter toolkit. The `tablin` server at `https://3.9.77.189/mcp` is a relay to that open app. The data lives on their PC. Sign-in is the browser page. There is no key to paste. There are no mail tools.

## Before a call

1. The app is open, **Settings > Agent link** is on, and this PC is paired.
2. Sign in with the same account that paired the desk under Settings > Agent link > This PC. A different account will not reach this desk.
3. Call `tablin_status`. If online, link or read is false, stop and tell them.
4. Call `guide_read` once this session and follow it. Do not invent tools.

## What they see

Calls run on their open window. The edge glows and a sticky Live toast stays up while a call runs. Successful writes reload the open lists, so they watch cards move. After guide_read once per session, confirm before a delete, a screen, a profile filing, or a bulk move. Name titles and counts. Prefer one batch call.

## Timing

Propose criteria often takes 30 to 60 seconds. On large or niche boards prefer manual criteria on the desk. Before matching_run run extract_pending or check applications_list parsePendingCount is 0 on the job.

## Credit

`matching_run`, `criteria_propose` and `candidates_profile_file_run` are billed by the token. Read `usage_summary` first, and `candidates_profile_file_estimate` before filing. Confirm before those calls.

## Ids

An application id starts with `cand-`. A person id starts with `cdn-`. List rows also include applicationId, personId, and displayName when this link calls. Notes, documents and profile tools want the person id. Pass the id the tool names.

## When a call fails

The tool result names `errorCode`:

- `desk_offline`: Tablin is not open on the linked PC (named when known). Retry after they open it.
- `agent_off`: Agent link is off in Settings. Do not retry.
- `writes_off`: Allow write is off. Do not retry.
- `deletes_off`: Allow delete is off. Do not retry.
- `tool_off`: That action is turned off in Agent link. Do not retry.
- `link_interrupted`: The link dropped or the call took over 120 seconds. Retry that one call once.
- `sign_in_required`: This agent is not connected. Reconnect from Settings or Authenticate. Do not retry.
- `no_desk_linked`: No PC is linked to this account. Open the app, turn Agent link on, and connect again. Do not retry.
- `desk_removed`: The link to this PC was removed. Reconnect from Settings. Do not retry.
- `invalid_input`: Bad argument. Fix the arguments and do not retry unchanged.
- `not_found`: No record with that id, or the id type is wrong. Check the id.
- `conflict`: Clashes with an existing record. Do not retry unchanged.
- `tool_failed`: The desk could not do it. Do not retry unchanged.
- `desk_busy`: Too many open calls (max 16). Wait, then retry.

Do not paste CV text, notes or tokens into logs. Ids, counts, file names and scores are enough unless the task needs that one record.

Call `guide_read` for workflows and enums.
