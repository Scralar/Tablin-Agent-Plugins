# Tablin-Agent-Plugins

Plugins that let your AI agent work your Tablin jobs, candidates and screening in the Tablin desktop app, through Agent link. The app must be open with Agent link on. Every agent shows the server as `tablin` (the Cursor plugin called it `desk` before 1.1.0). One repo holds the package for every supported agent. The Tablin desktop app downloads the latest GitHub Release (its `plugins.json` and zips) when you choose **Get plugin** or **Save to folder**, and checks each download against the SHA-256 in `plugins.json`.

## What is in it

- `plugins/<folder>/`: the package for each agent, as plain files.
- `dist/<folder>.zip`: the same package as a zip, paths at the zip root.
- `cursor/`: the Cursor plugin, with a rule and a slash command as well as the skill.
- `.cursor-plugin/marketplace.json`: lets Cursor install the Cursor plugin straight from this repo.
- `plugins.json`: the version, and for each agent the folder, zip and SHA-256 of the zip and of every file.

Every package holds only the public Agent link relay address (`https://3-9-77-189.sslip.io/mcp`) and the skill text. There are no keys, tokens or passwords. You sign in in your browser when the agent connects.

## Install

Sign in to the agent with the same account as the PC running the desk. On the desk, **This PC** under **Settings** > **Agent link** shows which account that is.

| Agent | Package | Steps |
| --- | --- | --- |
| Claude (web or desktop) | `dist/tablin-agent-link-claude.zip` | **Customize > Plugins**, **Add**, **Upload plugin**, pick the zip. |
| Claude Code | this repo | `/plugin marketplace add Scralar/Tablin-Agent-Plugins`, then install **tablin-agent-link**. |
| ChatGPT desktop | this repo | `codex plugin marketplace add Scralar/Tablin-Agent-Plugins`, restart the app, install from the **Tablin plugins** source. Or follow `plugins/tablin-chatgpt/README.md`. |
| Codex | this repo | `codex plugin marketplace add Scralar/Tablin-Agent-Plugins`. |
| Perplexity | `dist/tablin-agent-link-perplexity.zip` | **Plugins**, **Add custom**, **Plugin**, upload the zip. |
| Cursor | this repo | Add this repo as a plugin source and install **Tablin for Cursor**. Or copy `plugins/tablin-cursor` to `~/.cursor/plugins/local/tablin-agent-link`. |
| VS Code | this repo | Add `Scralar/Tablin-Agent-Plugins` to `chat.plugins.marketplaces` and install from it. Or **Chat: Install Plugin from Source** with `plugins/tablin-vscode`. |
| Windsurf | `plugins/tablin-windsurf` | No plugin marketplace. Add the server address as the folder `README.md` shows. |
| Gemini CLI | this repo | `gemini extensions install https://github.com/Scralar/Tablin-Agent-Plugins --auto-update`. |

Each folder has its own `README.md` with the full steps.

## Keeping it updated

Every plugin version is bumped on every user-facing release, so agents that track this repo see the change.

| Agent | How it updates |
| --- | --- |
| Claude Code | Enable auto-update for the `tablin` marketplace in `/plugin`. |
| VS Code | Plugin auto-update is on by default. |
| Gemini CLI | Install with `--auto-update`, or run `gemini extensions update`. |
| ChatGPT, Codex | The marketplace syncs daily, or choose **Sync now**. |
| Cursor | Install from the Cursor Marketplace, or add this repo as a team marketplace with **Auto Refresh**. Do not use `/add-plugin` with a link: it pins one commit. |
| Claude web and desktop, Perplexity | A zip upload is a one-off snapshot. Download the new zip and upload it again. Perplexity update behaviour after a GitHub import is unverified. |
| Windsurf | Nothing to update; it uses only the server address. |

Install roots at the repo root, all checked by CI: `.cursor-plugin/marketplace.json`, `.claude-plugin/marketplace.json`, `.github/plugin/marketplace.json` (VS Code), `.agents/plugins/marketplace.json` (ChatGPT and Codex) and `gemini-extension.json` with `skills/` (Gemini CLI).

## Updates and releases

Work happens on `dev`. Changes reach `main` only by pull request. Every pull request runs `ci`: it validates `plugins.json` and every plugin manifest, checks that `dist/` and the hashes match the files (`node scripts/build.mjs --check`), and runs a secret scan.

The packages are generated from the Tablin app repo with `scripts/export-agent-plugins.mts`, then `node scripts/build.mjs` rebuilds the zips and hashes. To publish, raise `version` in `plugins.json` and merge into `main`. The `release` workflow (also runnable by hand from **Actions**) rebuilds the zips, writes the hashes into `plugins.json`, and publishes a GitHub Release tagged `v<version>` with `plugins.json` and every zip attached. A version that is already released is skipped.

The desktop app reads `https://github.com/Scralar/Tablin-Agent-Plugins/releases/latest/download/plugins.json`, downloads only what changed, and keeps the last good copy so it still works offline.

## Licence

MIT, see [LICENSE](LICENSE). This covers the plugin manifests, skill text and install files here. The Tablin app itself is proprietary.
