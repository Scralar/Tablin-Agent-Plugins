# Tablin for Cursor

Work your Tablin jobs and candidates from Cursor: search candidates, read and update jobs, and run screening in the Tablin desktop app through Agent link. The app must be open with Agent link on. Sign in with **Authenticate**. There is no key to paste.

## What is in it

- `mcp.json`: one server, `tablin`, at `https://3.9.77.189/mcp`. Sign-in is OAuth in the browser.
- `skills/tablin-agent-link`: when to use the link, and what to do for each error code.
- `rules/agent-link.mdc`: call `guide_read` first, confirm before bulk changes, and keep the developer connection separate. Writes show live in the app.
- `commands/connect-desk.md`: the connect steps as a slash command.

## Install

In Cursor, add this repository as a plugin source (the install file is `.cursor-plugin/marketplace.json` at the repo root), then install **Tablin for Cursor**. Reload the window and open **Customize** to check it is listed.

## Connect

1. On the desk, open **Settings**, then **Agent link**. Choose **Connect** if this PC is not paired, then turn **Turn Agent link on** on.
2. In Cursor, choose **Authenticate** on this plugin and sign in in the browser.
3. Ask Cursor to do something in Tablin. While it works, the desk glows and a toast names Cursor and what it is doing.

## Other clients

Any MCP client with OAuth (for example Perplexity) uses the same address and the same error codes. The client name shown on the desk comes from the name the client sends when it connects.

## Upgrading from the desk server

Before plugin 1.1.0 the server was named `desk`. After updating, it shows as `tablin`. Choose **Authenticate** on it once. If an old `desk` entry is still listed, remove it.

## When it does not work

The tool result carries an `errorCode`. The skill lists all of them. The common ones:

- `desk_offline`: the desk is closed. Open it and retry.
- `agent_off`: Agent link is off in Settings.
- `sign_in_required`: choose **Authenticate** again.
- `desk_busy`: too many calls at once. Wait a few seconds and retry.
- `link_interrupted`: the call did not finish in time. Retry once.
- `invalid_input`: an argument was wrong. Fix it before retrying.
