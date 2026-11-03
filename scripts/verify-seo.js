const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const build = path.join(root, "build");
const config = require("../vercel.json");
const sitemap = fs.readFileSync(path.join(build, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const titles = new Set();
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(build, pathname, "index.html");
  const html = fs.readFileSync(file, "utf8");
  assert(html.includes(`rel="canonical" href="${url}"`), `Canonical: ${pathname}`);
  assert(!/name="robots" content="noindex/.test(html), `Indexable: ${pathname}`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `Single H1: ${pathname}`);
  const title = html.match(/<title>(.*?)<\/title>/)?.[1];
  assert(title && !titles.has(title), `Unique title: ${pathname}`);
  titles.add(title);
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) {
    JSON.parse(match[1]);
  }
}
assert.equal(config.routes.at(-1).status, 404);
assert.equal(config.routes.at(-1).dest, "/404.html");
assert(config.routes.some(route => route.handle === "filesystem"));
const login = fs.readFileSync(path.join(build, "login/index.html"), "utf8");
assert(/name="robots" content="noindex/.test(login));
const missing = fs.readFileSync(path.join(build, "404.html"), "utf8");
assert(/name="robots" content="noindex/.test(missing));
const home = fs.readFileSync(path.join(build, "index.html"), "utf8");
assert(!home.includes("Avg. booking increase"));
assert(!home.includes("Trusted Worldwide"));
assert(!home.includes("View Demo"));
assert(home.includes("Try 15 Free Minutes"));
const pricing = fs.readFileSync(path.join(build, "pricing/index.html"), "utf8");
assert(!pricing.includes("334"));
assert(pricing.includes("AI Receptionist Pricing"));
console.log(`SEO verification passed for ${urls.length} sitemap pages, login and 404 output.`);
