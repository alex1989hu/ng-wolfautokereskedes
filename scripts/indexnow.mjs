// Tells IndexNow search engines (Bing, Yandex, Naver, Seznam, Yep) about the URLs in the sitemap.
// Run after deploying: the engines fetch the key file from the live site to verify ownership.
// Usage: node scripts/indexnow.mjs [--dry-run]
import { readdirSync, readFileSync } from "node:fs";
import process from "node:process";
import { URL } from "node:url";

const dist = new URL("../dist/", import.meta.url);
const host = "wolfautokereskedes.hu";

// The key is the name of the 32 character hex .txt file in public/, which the build copies to dist/.
const keyFile = readdirSync(dist).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error("IndexNow key file not found in dist/");
const key = keyFile.replace(".txt", "");

const sitemap = readFileSync(new URL("sitemap.xml", dist), "utf8");
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const body = { host, key, keyLocation: `https://${host}/${keyFile}`, urlList };

if (process.argv.includes("--dry-run")) {
  console.log(JSON.stringify(body, null, 2));
} else {
  const response = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  console.log(`IndexNow: ${response.status} ${response.statusText} (${urlList.length} URLs)`);
  // 200 and 202 mean accepted, anything else is reported as a failure.
  if (!response.ok) process.exitCode = 1;
}
