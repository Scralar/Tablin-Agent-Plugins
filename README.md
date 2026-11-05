# Tablin agent plugins

Plugin packages that connect an AI agent to the Tablin desk open on your PC, through Agent link. One repo holds the package for every supported agent. The Tablin desktop app downloads the latest packages from here when you choose **Get plugin** or **Save to folder**, and checks each download against the SHA-256 in `plugins.json`.

## What is in it

- `plugins/<folder>/`: the package for each agent, as plain files.
- `dist/<folder>.zip`: the same package as a zip, paths at the zip root.
- `cursor/`: the Cursor plugin, with a rule and a slash command as well as the skill.
- `.cursor-plugin/marketplace.json`: lets Cursor install the Cursor plugin straight from this repo.
- `plugins.json`: the version, and for each agent the folder, zip and SHA-256 of the zip and of every file.

Every package holds only the public Agent link relay address (`https://3.9.77.189/mcp`) and the skill text. There are no keys, tokens or passwords. You sign in in your browser when the agent connects.

## Install

Sign in to the agent with the same account as the PC running the desk. On the desk, **This PC** under **Settings** > **Agent link** shows which account that is.

| Agent | Package | Steps |
| --- | --- | --- |
| Claude (web or desktop) | `dist/tablin-agent-link-claude.zip` | **Customize > Plugins**, **Add**, **Upload plugin**, pick the zip. |
| Claude Code | `plugins/tablin-claude-code` | `/plugin marketplace add` followed by the folder path, then install the plugin. |
| ChatGPT desktop | `plugins/tablin-chatgpt` | Follow `README.md` in the folder. |
| Codex | `plugins/tablin-codex` | `codex plugin marketplace add` followed by the folder path. |
| Perplexity | `dist/tablin-agent-link-perplexity.zip` | **Plugins**, **Add custom**, **Plugin**, upload the zip. |
| Cursor | this repo | Add this repo as a plugin source and install **Tablin Agent Link**. Or copy `plugins/tablin-cursor` to `~/.cursor/plugins/local/tablin-agent-link`. |
| VS Code | `plugins/tablin-vscode` | **Chat: Install Plugin from Source** and enter the folder path. |
| Windsurf | `plugins/tablin-windsurf` | Follow `README.md` in the folder. |
| Gemini CLI | `plugins/tablin-gemini` | `gemini extensions install` followed by the folder path. |

Each folder has its own `README.md` with the full steps.

## Updates

The packages are generated from the Tablin app repo with `scripts/export-agent-plugins.mts`. Each update raises the version in `plugins.json`. The desktop app reads that file, downloads only what changed, and keeps the last good copy so it still works offline.

## Licence

TODO: licence not chosen yet. Until one is added, all rights are reserved.
