// Checks plugins.json and every plugin manifest. Usage: node scripts/validate.mjs
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const fail = (m) => errors.push(m);
const json = (p) => {
  try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { fail(`${p}: ${e.message}`); return null; }
};
const ADDRESS = "https://3-9-77-189.sslip.io/mcp";
const REPO = "https://github.com/Scralar/Tablin-Agent-Plugins";
const LOGO = "https://raw.githubusercontent.com/Scralar/Tablin-Agent-Plugins/main/assets/logo.png";
const ROOTS = [".cursor-plugin/marketplace.json", ".claude-plugin/marketplace.json", ".github/plugin/marketplace.json", ".agents/plugins/marketplace.json", "gemini-extension.json"];
const m = json("plugins.json");
if (m) {
  if (m.schema !== 1) fail("plugins.json: schema must be 1");
  if (!/^\d+\.\d+\.\d+$/.test(m.version ?? "")) fail("plugins.json: version must be x.y.z");
  if (m.address !== ADDRESS) fail("plugins.json: address must be the public relay address");
  const ids = new Set();
  for (const p of m.plugins ?? []) {
    const where = `plugins.json ${p.id}`;
    for (const k of ["id", "label", "folder", "archive", "sha256"]) if (typeof p[k] !== "string" || !p[k]) fail(`${where}: ${k} missing`);
    if (ids.has(p.id)) fail(`${where}: duplicate id`);
    ids.add(p.id);
    if (p.archive !== `dist/${p.folder}.zip`) fail(`${where}: archive must be dist/<folder>.zip`);
    if (!(p.zip === null || /^[\w.-]+\.zip$/.test(p.zip))) fail(`${where}: zip must be null or a file name`);
    if (!/^[0-9a-f]{64}$/.test(p.sha256 ?? "")) fail(`${where}: sha256`);
    for (const f of p.files ?? []) {
      if (f.path.startsWith("/") || f.path.includes("\\") || f.path.split("/").includes("..")) fail(`${where}: unsafe path ${f.path}`);
      if (!existsSync(join("plugins", p.folder, f.path))) fail(`${where}: missing ${f.path}`);
      if (/\.json$/.test(f.path)) json(join("plugins", p.folder, f.path));
    }
  }
}
// Every json file in the packages parses, and every server url is the public relay address.
const walk = (d) => readdirSync(d).flatMap((n) => (statSync(join(d, n)).isDirectory() ? walk(join(d, n)) : [join(d, n)]));
for (const file of [...walk("plugins"), ...walk("cursor").filter((f) => !f.endsWith(".png")), ...walk("skills"), ...ROOTS]) {
  if (!existsSync(file)) { fail(`${file}: missing`); continue; }
  const text = readFileSync(file, "utf8");
  if (text.includes("\u2014")) fail(`${file}: em dash`);
  if (/openrouter|tailscale|\.ts\.net/i.test(text)) fail(`${file}: banned term`);
  for (const url of text.match(/https?:\/\/[^\s"'`)<,]+/g) ?? []) {
    if (url !== ADDRESS && url !== REPO && url !== LOGO && !url.startsWith("https://agent-plugins.org/schemas/")) fail(`${file}: unexpected url ${url}`);
  }
  if (file.endsWith(".json")) json(file);
}
const mk = json(".cursor-plugin/marketplace.json");
for (const p of mk?.plugins ?? []) if (!existsSync(join(p.source, ".cursor-plugin", "plugin.json"))) fail(`marketplace: ${p.source} has no .cursor-plugin/plugin.json`);
for (const f of ["assets/logo.png", "cursor/assets/logo.png"]) if (!existsSync(f)) fail(`${f}: missing`);
// Each platform root points at a real package and carries the release version.
const V = m?.version;
const has = (dir, file) => existsSync(join(dir, file)) || fail(`${dir}: no ${file}`);
const cc = json(".claude-plugin/marketplace.json");
for (const p of cc?.plugins ?? []) { has(p.source, ".claude-plugin/plugin.json"); if (p.version !== V) fail(`claude marketplace: version ${p.version} != ${V}`); }
const vs = json(".github/plugin/marketplace.json");
for (const p of vs?.plugins ?? []) { has(p.source, "plugin.json"); if (p.version !== V) fail(`vscode marketplace: version ${p.version} != ${V}`); }
const ag = json(".agents/plugins/marketplace.json");
for (const p of ag?.plugins ?? []) { has(p.source?.path ?? "", "plugin.json"); if (!p.policy?.installation || !p.policy?.authentication || !p.category) fail("agents marketplace: policy and category required"); }
const gx = json("gemini-extension.json");
if (gx && gx.version !== V) fail(`gemini-extension.json: version ${gx.version} != ${V}`);
// Every plugin manifest carries the release version.
for (const f of walk("plugins").filter((f) => /(plugin|gemini-extension)\.json$/.test(f) && !f.includes("perplexity"))) { const j = json(f); if (j && j.version !== V) fail(`${f}: version ${j.version} != ${V}`); }
const cm = json("cursor/.cursor-plugin/plugin.json");
if (cm && cm.version !== V) fail(`cursor plugin version ${cm.version} != ${V}`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("valid");
