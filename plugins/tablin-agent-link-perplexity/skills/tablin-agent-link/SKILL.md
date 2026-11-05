---
name: tablin-agent-link
description: >-
  Drive the open Tablin desk through Agent link. Use when the user wants to
  read or change jobs, candidates or screening on the desk, or when a tool on
  that server fails.
---

# Tablin Agent link

The server at `https://3.9.77.189/mcp` is the open desk. Sign-in happens in the browser page your agent opens. There is no key to paste.

## Before a call

1. The desk is open, **Settings > Agent link** is on, and the PC is paired.
2. Sign in with the same account that paired the desk under Settings > Agent link > This PC. A different account will not reach this desk.
3. Call `guide_read` first and follow it. Do not invent tools. Mail tools are not on this link.

## When a call fails

The tool result names `errorCode`:

- `desk_offline`: the desk is not open. Retry after they open it.
- `agent_off`: Agent link is off. Do not retry.
- `writes_off`: writing is off. Do not retry.
- `tool_off`: that action is off. Do not retry.
- `link_interrupted`: the link dropped or the call took over 120 seconds. Retry that one call once.
- `sign_in_required`: connect the agent again. Do not retry.
- `invalid_input`: an argument was rejected. Read the message, fix the argument, and do not retry unchanged.
- `not_found`: no record with that id. Check the id; do not retry unchanged.
- `conflict`: clashes with an existing record. Do not retry unchanged.
- `tool_failed`: the desk could not do it. Do not retry unchanged.
- `desk_busy`: the desk has too many calls open. Wait a few seconds, then retry. Do not send many calls at once.

Do not paste CV text, mail, or tokens into chat logs. Ids, counts, file names, and scores are enough unless the task needs that one record.
