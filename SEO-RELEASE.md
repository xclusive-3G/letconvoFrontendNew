# SEO changes — 3 November 2026

Implemented:

- Explicit Vercel routes for known public pages and account routes, static assets, and a final HTTP 404 response. A standalone 404 page works without JavaScript. Unknown client routes also show a noindex error page.
- Homepage now identifies the AI receptionist product, offers 15 free minutes, and labels the pricing destination accurately. Removed unsubstantiated homepage statistics and testimonials pending verification.
- Starter stays at the existing $120 USD / 400 minutes offer. Unavailable plans show “Coming soon” instead of uncertain prices/minutes. Removed unsupported overage and integration promises from public pricing and the cost guide. No backend prices or entitlements changed.
- Added setup/testing instructions and carrier/integration qualifications to solution pages. Differentiated the small-business page toward setup intent.
- Replaced the unsourced competitor price table and future-year ranking with a practical buyer checklist. Added visible article attribution, article URLs/publisher, Organization and breadcrumb metadata.
- Preserved the installed Google tag for G-Q46LYZW19K and connected successful registrations to its sign_up event without adding a second tag or manual page_view events. Custom signup payloads exclude names, email addresses, phone numbers, transcripts, auth fragments and query strings.
- Build output verifier checks sitemap page metadata, unique titles, single H1s, JSON-LD syntax, login noindex, 404 configuration and key copy regressions.

## Activation and verification

1. GA4 uses the existing Google tag in public/index.html, configured with G-Q46LYZW19K. No additional Measurement ID environment variable is needed.
2. Keep automatic Page views enabled in the GA4 web stream, including page changes based on browser history events. There is no separate manual page-view sender. Verify one page_view per public navigation and one sign_up after a successful registration in DebugView. Mark sign_up as a key event. First successful call and payment attribution still need authoritative backend integration.
3. Deploy the frontend build and vercel.json together. Verify unknown URLs return HTTP 404, sitemap routes return their own HTML/canonicals, static assets load, and login retains noindex. The local output/configuration checks do not prove production hosting behavior.
4. In the verified Search Console property, check indexing exclusions, security/manual actions and representative URL Inspection results. Submit or refresh `https://letconvo.live/sitemap.xml` and request indexing for representative changed pages as appropriate.
5. Measure mobile PageSpeed Insights and field Core Web Vitals. No unmeasured performance score is claimed.

Still requires business evidence: actual supported markets/numbers, approved testimonials, genuine case studies and a real demo recording. Public copy avoids inventing these. The GA4 ID is installed; checking reports and Search Console needs account access. No publication/update dates were fabricated for old articles.

## Validation completed

- `npm.cmd run build` completed successfully, including prerendering and SEO checks for all 20 sitemap pages plus login and the static 404 output.
- Mobile headless-browser checks passed for homepage rendering, pricing navigation and canonical updates, the signup heading, and an unknown URL returning the static 404 through the configured routing rules in a local test server.
- Signup tracking checks cover the configured property ID, sanitized payload, browser/privacy guards, and ensuring analytics failures do not interrupt registration.
- These are local validations. Changes have not been deployed, and live HTTP status and Search Console indexing must be checked after deployment.
