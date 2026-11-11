# Tablin Agent link for Claude Code

This plugin connects Claude Code to the Tablin desk open on your PC, through Agent link. It adds the desk as a connector and a skill that tells the agent how to use it: read the guide first, which actions exist, and what each error means. It sends only what the agent asks the desk for. It holds no keys or passwords; you sign in in your browser when you connect.

Address: https://3-9-77-189.sslip.io/mcp

1. In Claude Code, run `/plugin marketplace add` followed by the path to this folder.
2. Run `/plugin install tablin-agent-link@tablin`, then restart Claude Code.
3. Run `/mcp`, choose **tablin**, then **Authenticate**, and sign in in the browser.
4. No plugin? Run `claude mcp add --transport http tablin https://3-9-77-189.sslip.io/mcp` instead.

Use the same account you use with your agent.

Keep the desk open with **Settings > Agent link** turned on while you work.
