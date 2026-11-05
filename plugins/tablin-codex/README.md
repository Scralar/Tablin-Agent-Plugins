# Tablin Agent link for Codex

This plugin connects Codex to the Tablin desk open on your PC, through Agent link. It adds the desk as a connector and a skill that tells the agent how to use it: read the guide first, which actions exist, and what each error means. It sends only what the agent asks the desk for. It holds no keys or passwords; you sign in in your browser when you connect.

Address: https://3.9.77.189/mcp

1. Run `codex plugin marketplace add` followed by the path to this folder.
2. Install **tablin-agent-link** from the **Tablin** source (in the ChatGPT desktop app's Plugins, or Codex's plugin browser), then sign in when the browser opens.
3. No plugin? Add `[mcp_servers.tablin]` with `url = "https://3.9.77.189/mcp"` to `~/.codex/config.toml`, then run `codex mcp login tablin`.

Sign in with the same account that paired the desk under Settings > Agent link > This PC. A different account will not reach this desk.

Keep the desk open with **Settings > Agent link** turned on while you work.
