// Checks plugins.json and every plugin manifest. Usage: node scripts/validate.mjs
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const errors = [];
const fail = (m) => errors.push(m);
const json = (p) => {
  try { return JSON.parse(readFileSync(p, "utf8")); } catch (e) { fail(`${p}: ${e.message}`); return null; }
};
const ADDRESS = "https://3.9.77.189/mcp";
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
for (const file of [...walk("plugins"), ...walk("cursor"), ".cursor-plugin/marketplace.json"]) {
  const text = readFileSync(file, "utf8");
  if (text.includes("\u2014")) fail(`${file}: em dash`);
  if (/openrouter|tailscale|\.ts\.net/i.test(text)) fail(`${file}: banned term`);
  for (const url of text.match(/https?:\/\/[^\s"'`)<,]+/g) ?? []) {
    if (url !== ADDRESS && !url.startsWith("https://agent-plugins.org/schemas/")) fail(`${file}: unexpected url ${url}`);
  }
  if (file.endsWith(".json")) json(file);
}
const mk = json(".cursor-plugin/marketplace.json");
for (const p of mk?.plugins ?? []) if (!existsSync(join(p.source, ".cursor-plugin", "plugin.json"))) fail(`marketplace: ${p.source} has no .cursor-plugin/plugin.json`);
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
console.log("valid");
