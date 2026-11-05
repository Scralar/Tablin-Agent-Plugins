---
name: tablin-agent-link
description: >-
  Use the Tablin desktop app from Cursor through the tablin server: jobs,
  candidates and screening. Use when the user asks about their Tablin jobs or
  candidates, or when a tablin tool fails.
---

# Agent link from Cursor

This plugin's `tablin` server reaches the Tablin desktop app open on your PC, through Agent link. Sign-in is the browser page Cursor opens from **Authenticate**. Do not paste a key.

## Before a call

1. The desk is open. **Settings > Agent link** is on, and this PC is paired.
2. This plugin's server address is already `https://3.9.77.189/mcp`. Do not paste a key.
3. If Cursor shows **Authenticate**, finish that in the browser. There is no key to copy.
4. Call `guide_read` and follow it. Do not invent tools. Mail tools are not on this link.

## Which connection

The plugin server is the one whose calls respect **Read** and **Write** and show on **Agent link** activity. The in-repo developer host (loopback, **Settings > Developer > MCP**) is separate. Its calls do not count as Agent link. Do not point this plugin at `127.0.0.1`.

## When a call fails

The tool result names `errorCode`. Stop or retry as follows:

- `desk_offline`: the desk is not open. Retry after they open it.
- `agent_off`: Agent link is off. Do not retry.
- `writes_off`: writing is off. Do not retry.
- `tool_off`: that action is off. Do not retry.
- `link_interrupted`: the link dropped or the call took over 120 seconds. Retry that one call once.
- `desk_busy`: the desk has too many calls open. Wait a few seconds, then retry. Do not send many calls at once.
- `invalid_input`: an argument was rejected. Read the message, fix the argument, and do not retry unchanged.
- `not_found`: no record with that id. Check the id; do not retry unchanged.
- `conflict`: clashes with an existing record. Do not retry unchanged.
- `tool_failed`: the desk could not do it. Do not retry unchanged.
- `sign_in_required`: connect the agent again. Do not retry.

Do not paste CV text, mail, or tokens into chat logs. Ids, counts, file names, and scores are enough unless the task needs that one record.
