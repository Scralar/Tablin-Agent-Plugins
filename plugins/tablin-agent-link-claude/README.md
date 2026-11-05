# Tablin Agent link for Claude

This plugin connects Claude to the Tablin desk open on your PC, through Agent link. It adds the desk as a connector and a skill that tells the agent how to use it: read the guide first, which actions exist, and what each error means. It sends only what the agent asks the desk for. It holds no keys or passwords; you sign in in your browser when you connect.

Address: https://3.9.77.189/mcp

1. In Claude on the web or desktop, open **Customize > Plugins**, choose **Add**, then **Upload plugin**, and pick `tablin-agent-link-claude.zip` (saved next to this folder).
2. Open the plugin's **Connectors** tab and connect **tablin**. Sign in when the browser opens.
3. Team and Enterprise plans: an owner may need to add the plugin or connector for the organisation first.
4. No plugin upload on your plan? Use **Settings > Connectors > Add custom connector** with the address https://3.9.77.189/mcp instead.

Sign in with the same account that paired the desk under Settings > Agent link > This PC. A different account will not reach this desk.

Keep the desk open with **Settings > Agent link** turned on while you work.
