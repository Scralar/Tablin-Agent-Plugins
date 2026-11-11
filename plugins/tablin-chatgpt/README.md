# Tablin Agent link for ChatGPT

This plugin connects ChatGPT to the Tablin desk open on your PC, through Agent link. It adds the desk as a connector and a skill that tells the agent how to use it: read the guide first, which actions exist, and what each error means. It sends only what the agent asks the desk for. It holds no keys or passwords; you sign in in your browser when you connect.

Address: https://3-9-77-189.sslip.io/mcp

1. Install with the ChatGPT desktop app: copy `.agents/plugins/marketplace.json` from this folder to `~/.agents/plugins/marketplace.json`, and copy `plugins/tablin-agent-link` to `~/.agents/plugins/plugins/tablin-agent-link`. Or run `codex plugin marketplace add` followed by the path to this folder.
2. Restart the ChatGPT desktop app, open **Plugins**, choose the **Tablin** source, and install **tablin-agent-link**. Sign in when the browser opens.
3. Workspace admins can then **Publish** it to the workspace from **Plugins > Personal**.
4. ChatGPT on the web only: open **Settings > Apps**, add a custom server with the address https://3-9-77-189.sslip.io/mcp and **OAuth**. Business, Enterprise and Edu can read and write, Pro can read only, Plus and Free cannot add one.

Use the same account you use with your agent.

Keep the desk open with **Settings > Agent link** turned on while you work.
