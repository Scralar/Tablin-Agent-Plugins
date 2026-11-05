# Tablin Agent link for Perplexity

This plugin connects Perplexity to the Tablin desk open on your PC, through Agent link. It adds the desk as a connector and a skill that tells the agent how to use it: read the guide first, which actions exist, and what each error means. It sends only what the agent asks the desk for. It holds no keys or passwords; you sign in in your browser when you connect.

Address: https://3.9.77.189/mcp

1. You need Perplexity **Pro**, **Max** or **Enterprise**. Free cannot add a custom connector.
2. In Perplexity, open **Plugins** in the sidebar, choose **Add custom**, then **Plugin**, and upload `tablin-agent-link-perplexity.zip` (saved next to this folder).
3. Open the plugin, connect **tablin**, choose **Streamable HTTP** (not SSE), and sign in when the browser opens.
4. In a chat, select or @ mention the connector so Perplexity actually uses it.
5. If connect fails with a message that a client secret was not returned, open **Advanced OAuth** on the connector and paste a Client ID and Client Secret from a one-time confidential registration against the Agent link address (secret sent in the form body). The secret is shown once. Use the Perplexity OAuth redirect from the Tablin Agent link docs when you register. Do not paste an API key.
6. Organisations: an admin must allow members to add custom plugins and connectors.
7. No plugins yet? Use **Customize > Connectors > Custom connector > Remote** with the address https://3.9.77.189/mcp, **OAuth** and **Streamable HTTP**.

Sign in with the same account that paired the desk under Settings > Agent link > This PC. A different account will not reach this desk.

Keep the desk open with **Settings > Agent link** turned on while you work.
