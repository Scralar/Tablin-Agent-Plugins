// Rebuilds dist/<folder>.zip from plugins/<folder>/ and the SHA-256 values in plugins.json.
// Usage: node scripts/build.mjs [--check]   (--check fails if anything would change)
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const sha = (d) => createHash("sha256").update(d).digest("hex");
const CRC = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});
const crc32 = (d) => {
  let c = 0xffffffff;
  for (const b of d) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};

/** Stored (uncompressed) zip, byte for byte the same as the app's zipFiles. */
export function zipFiles(files) {
  const parts = [], central = [];
  let offset = 0;
  for (const { path, data } of files) {
    const name = Buffer.from(path, "utf8");
    const crc = crc32(data);
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(data.length, 18); local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    const head = Buffer.alloc(46);
    head.writeUInt32LE(0x02014b50, 0); head.writeUInt16LE(20, 4); head.writeUInt16LE(20, 6); head.writeUInt16LE(0x0800, 8);
    head.writeUInt32LE(crc, 16); head.writeUInt32LE(data.length, 20); head.writeUInt32LE(data.length, 24);
    head.writeUInt16LE(name.length, 28); head.writeUInt32LE(offset, 42);
    parts.push(local, name, data);
    central.push(head, name);
    offset += 30 + name.length + data.length;
  }
  const size = central.reduce((s, p) => s + p.length, 0);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0); end.writeUInt16LE(files.length, 8); end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(size, 12); end.writeUInt32LE(offset, 16);
  return Buffer.concat([...parts, ...central, end]);
}

const check = process.argv.includes("--check");
const manifestText = readFileSync("plugins.json", "utf8");
const manifest = JSON.parse(manifestText);
let changed = false;
mkdirSync("dist", { recursive: true });
for (const entry of manifest.plugins) {
  const files = entry.files.map((f) => ({ path: f.path, data: readFileSync(join("plugins", entry.folder, f.path)) }));
  entry.files = files.map((f) => ({ path: f.path, sha256: sha(f.data) }));
  const zip = zipFiles(files);
  entry.sha256 = sha(zip);
  const out = join("dist", `${entry.folder}.zip`);
  if (!existsSync(out) || !readFileSync(out).equals(zip)) {
    changed = true;
    if (!check) writeFileSync(out, zip);
  }
}
const next = JSON.stringify(manifest, null, 2) + "\n";
if (next !== manifestText) {
  changed = true;
  if (!check) writeFileSync("plugins.json", next);
}
if (check && changed) {
  console.error("dist/ or plugins.json is out of date. Run: node scripts/build.mjs");
  process.exit(1);
}
console.log(check ? "build is up to date" : "built", manifest.version);
