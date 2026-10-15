/**
 * Post-build static prerender step.
 *
 * This app is a plain client-side-rendered CRA build (see CLAUDE.md) — every
 * route ships the same generic index.html and only gets its real
 * title/meta/OG tags after React mounts (src/components/SeoMeta.jsx). That
 * means crawlers/link-preview bots that don't execute JS (and Google's first
 * crawl pass) only ever see the homepage's meta.
 *
 * This script boots a static server over build/, visits every public route
 * with a headless browser after react-scripts build has already run, and
 * writes the fully-rendered DOM (title/meta/OG/canonical/schema included)
 * back out as build/<route>/index.html. Wired up as the "postbuild" script
 * so `npm run build` does this automatically.
 *
 * Keep ROUTES in sync with src/config/routes.js. dashboard/admin are
 * excluded — they're auth-gated and have no SEO value.
 */
const fs = require("fs");
const path = require("path");
const http = require("http");

const BUILD_DIR = path.join(__dirname, "..", "build");
const PORT = 45679;

const ROUTES = [
  "/pricing",
  "/contact",
  "/blog",
  "/terms",
  "/privacy",
  "/login",
  "/get-started",
  "/ai-receptionist-for-small-business",
  "/ai-receptionist-for-plumbers",
  "/ai-receptionist-for-salons",
  "/ai-receptionist-for-clinics",
  "/ai-receptionist-for-law-firms",
  "/missed-call-lead-capture",
  "/ai-appointment-booking",
  "/blog/after-hours-call-answering-service",
  "/blog/ai-phone-answering-service-for-service-businesses",
  "/", // last: this overwrites build/index.html, the SPA fallback shell used
       // while prerendering every other route above — keep it last so that
       // fallback keeps serving the original generic shell until then.
];

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webmanifest": "application/manifest+json",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function startServer() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    const filePath = path.join(BUILD_DIR, urlPath);

    if (!filePath.startsWith(BUILD_DIR)) {
      res.writeHead(403);
      res.end();
      return;
    }

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      res.writeHead(200, { "Content-Type": MIME_TYPES[path.extname(filePath)] || "application/octet-stream" });
      fs.createReadStream(filePath).pipe(res);
      return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(path.join(BUILD_DIR, "index.html")).pipe(res);
  });

  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

function outputPathFor(route) {
  if (route === "/") return path.join(BUILD_DIR, "index.html");
  return path.join(BUILD_DIR, route, "index.html");
}

// Vercel's build container is a minimal Amazon Linux image missing the
// desktop shared libraries (libnspr4, libnss3, ...) plain puppeteer's
// downloaded Chromium needs — confirmed via a real failed deploy
// (`error while loading shared libraries: libnspr4.so`). @sparticuz/chromium
// ships a build made for exactly this environment. Locally (Windows/Mac dev)
// we use full puppeteer instead, since @sparticuz/chromium only targets
// serverless Linux.
async function launchBrowser() {
  if (process.env.VERCEL) {
    const chromium = require("@sparticuz/chromium");
    const puppeteerCore = require("puppeteer-core");
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    });
  }
  const puppeteer = require("puppeteer");
  return puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
}

async function main() {
  if (!fs.existsSync(path.join(BUILD_DIR, "index.html"))) {
    console.error("[prerender] build/index.html not found — run the build before this script.");
    process.exit(1);
  }

  const server = await startServer();
  let browser;
  try {
    browser = await launchBrowser();
    for (const route of ROUTES) {
      const page = await browser.newPage();
      try {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: "networkidle0", timeout: 30000 });
        // SeoMeta's effect runs on mount, but give animated/lazy content a beat to settle.
        await new Promise((resolve) => setTimeout(resolve, 300));
        await page.waitForFunction(() => document.querySelector('#root')?.innerText.trim().length > 100 && document.querySelector('link[rel="canonical"]'));
        const canonical = await page.$eval('link[rel="canonical"]', el => el.href);
        if (canonical !== `https://letconvo.live${route}`) {
          throw new Error(`Wrong canonical for ${route}: ${canonical}`);
        }
        // Reveal sections before taking the snapshot so static HTML is visible
        // without waiting for JavaScript or IntersectionObserver.
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 600) {
            window.scrollTo(0, y);
            await new Promise(resolve => setTimeout(resolve, 40));
          }
          window.scrollTo(0, 0);
        });
        await new Promise(resolve => setTimeout(resolve, 1000));
        const html = await page.content();
        const outPath = outputPathFor(route);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);
        console.log(`[prerender] ${route} -> ${path.relative(BUILD_DIR, outPath)}`);
      } finally {
        await page.close();
      }
    }
  } finally {
    if (browser) await browser.close();
    server.close();
  }
}

main().catch((err) => {
  console.error("[prerender] failed:", err);
  process.exit(1);
});
