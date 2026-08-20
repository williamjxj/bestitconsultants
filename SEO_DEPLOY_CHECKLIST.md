# Deploy & Verify SEO Changes — Step-by-Step

This guide walks you through deploying the SEO + GEO changes and confirming
everything is live for both sites:

- **bestitconsulting.ca** → https://www.bestitconsulting.ca
- **bestitconsultants.ca** → https://www.bestitconsultants.ca

> Both sites live on Vercel and redirect the bare domain (`bestitconsultants.ca`)
> to `www.bestitconsultants.ca`, so all checks below use the `www.` URL.

---

## 1. Deploy bestitconsultants.ca

1. Make sure the code is committed and pushed to your repository's main branch
   (or trigger a deploy from the Vercel dashboard).
2. Open Vercel, find the **bestitconsultants** project, and wait for the
   production build to finish (green checkmark).
3. Confirm the build log shows the routes **`/sitemap.xml`** and
   **`/robots.txt`** being generated.
4. Check the environment variables in Vercel:
   - `NEXT_PUBLIC_BASE_URL` should be set to
     `https://bestitconsultants.ca` or `https://www.bestitconsultants.ca`.
     Either works — the code automatically normalizes to `www.`.
   - No other SEO variables are required.

### Verify after deploy

Open these URLs in a browser (or incognito window) and confirm each one:

- [ ] https://www.bestitconsultants.ca/robots.txt — contains `User-Agent: GPTBot`,
      `ClaudeBot`, `PerplexityBot`, and `Google-Extended` (AI crawlers allowed)
- [ ] https://www.bestitconsultants.ca/sitemap.xml — lists all 7 pages with
      `www.` URLs
- [ ] https://www.bestitconsultants.ca/llms.txt — loads as a text file with the
      site summary and page list
- [ ] https://www.bestitconsultants.ca/llms-full.txt — loads with full details
- [ ] https://www.bestitconsultants.ca/og-images/home.png — loads as an image
      (branded dark-blue banner with the BestIT Consultants logo)
- [ ] Right-click the homepage → *View Page Source* → confirm
      `<link rel="canonical" href="https://www.bestitconsultants.ca/">` is
      present (this was missing before)

---

## 2. Deploy bestitconsulting.ca

Repeat the same steps for the **bestitconsulting** project:

1. Push the committed changes and wait for the Vercel build to finish.
2. Confirm `NEXT_PUBLIC_BASE_URL` (or `NEXT_PUBLIC_SITE_URL`) is set (apex or
   `www.` both work).

### Verify after deploy

- [ ] https://www.bestitconsulting.ca/robots.txt — AI crawlers allowed
- [ ] https://www.bestitconsulting.ca/sitemap.xml — `www.` URLs for all 8 pages,
      homepage priority `1.0`, no `robots.txt` entry
- [ ] https://www.bestitconsulting.ca/llms.txt — loads
- [ ] https://www.bestitconsulting.ca/llms-full.txt — loads
- [ ] https://www.bestitconsulting.ca/og-images/default.png — loads as an image
- [ ] View page source on the homepage → `<link rel="canonical"
      href="https://www.bestitconsulting.ca/">`

---

## 3. Google Search Console — submit the sitemaps

You need to do this once per domain. If you haven't added a property yet:

1. Go to https://search.google.com/search-console and sign in.
2. Click **Add property** and choose **Domain** (covers both
   `bestitconsultants.ca` and `www.bestitconsultants.ca`).
3. Follow the DNS verification steps shown by Google (add a TXT record at your
   domain registrar). This can take up to an hour to propagate.
4. If DNS verification feels too involved, use **URL prefix** instead and add
   `https://www.bestitconsultants.ca` — verify by uploading the HTML file
   Google gives you to your site, or by copying the meta tag into the site's
   `<head>` via the codebase.

Then submit the sitemap:

5. In the property, open **Sitemaps** (left sidebar).
6. In the "Add a new sitemap" box, enter `sitemap.xml`.
7. Click **Submit**. After a few minutes the status should change to
   **Success** with 7 pages found.

Repeat the whole section for **bestitconsulting.ca** if it's a separate
property.

### Request indexing for the main pages

1. Open **URL Inspection** (top search bar in Search Console).
2. Paste `https://www.bestitconsultants.ca/` → press Enter.
3. Once Google finishes checking, click **Request indexing**.
4. Repeat for the most important pages: `/services`, `/contact-us`,
   `/our-team`.
5. Do the same for `https://www.bestitconsulting.ca/` and its `/services`,
   `/faq`, and `/contact` pages.

Indexing can take from a few hours to a few days — you don't need to do
anything else in the meantime.

---

## 4. Facebook Sharing Debugger — re-test the preview images

The old preview images were broken (404), so you must force Facebook to
re-fetch the page.

1. Go to https://developers.facebook.com/tools/debug/ and sign in.
2. Paste `https://www.bestitconsultants.ca/` into the box and click **Debug**.
3. Click the **Scrape Again** button (this tells Facebook to ignore its cache
   and fetch the page fresh).
4. Confirm the preview now shows:
   - Title: **BestIT Consultants - Vancouver IT & AI Consulting**
   - The new branded dark-blue image (logo + "Home")
5. Repeat for `https://www.bestitconsultants.ca/services` (and any other page
   you share often, e.g. `/case-studies`).
6. Repeat the whole section for **bestitconsulting.ca**:
   - `https://www.bestitconsulting.ca/`
   - `https://www.bestitconsulting.ca/services`

> LinkedIn keeps its own cache. If you share links on LinkedIn, also paste the
> same URLs into https://www.linkedin.com/post-inspector/ and click
> **Inspect** to refresh them.

---

## 5. Optional final checks

- [ ] Run https://search.google.com/test/rich-results on the FAQ page
      (`/contact-us` on consultants, `/faq` on consulting) — the FAQ schema
      should be detected as valid.
- [ ] In Search Console → **Pages** (under Indexing), confirm no unexpected
      "Not found" pages from the old sitemap.
- [ ] Wait a few days, then check Search Console → **Performance** to see
      impressions start for the main pages.
