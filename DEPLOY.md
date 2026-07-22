# Deploying Claude Mastery

The course is a fully static single-page app — HTML, CSS, and plain JavaScript with no build step. You can host it anywhere that serves static files. The easiest free option is **GitHub Pages**.

## Option A — GitHub Pages (recommended, free)

### 1. Create a repository and push the files

From inside the `claude-mastery` folder:

```
git init
git add .
git commit -m "Claude Mastery — complete course"
git branch -M main
git remote add origin https://github.com/<your-username>/claude-mastery.git
git push -u origin main
```

(Create the empty `claude-mastery` repo on GitHub first, then use its HTTPS URL above.)

### 2. Turn on Pages

On GitHub: **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose branch **main** and folder **/ (root)**, and **Save**.

### 3. Visit your site

After a minute or two it goes live at:

```
https://<your-username>.github.io/claude-mastery/
```

That is the whole deploy. Because everything is static and uses relative paths, no configuration files are needed.

### Updating later

Edit any file, then:

```
git add .
git commit -m "update"
git push
```

Pages redeploys automatically within a minute.

## Option B — Any static host

The same folder works on Netlify, Cloudflare Pages, Vercel (as a static project), or any plain web server:

- **Netlify / Cloudflare Pages / Vercel:** drag-and-drop the folder, or connect the repo. No build command; publish directory is the project root.
- **Your own server / S3 / nginx:** copy the folder to the web root. No server-side code is required.

## Option C — Just run it locally

You do not have to deploy at all to use it. Serve the folder over HTTP:

```
python3 -m http.server 8080
# visit http://localhost:8080
```

Any static file server works. (Opening `index.html` directly from disk usually works too, but some browsers restrict local script loading, so a local server is the reliable path.)

## Custom domain (optional, GitHub Pages)

1. In **Settings → Pages → Custom domain**, enter your domain and save (this writes a `CNAME` file).
2. At your DNS provider, add a `CNAME` record pointing your subdomain (e.g. `learn`) to `<your-username>.github.io`, or the four `A` records GitHub lists for an apex domain.
3. Enable **Enforce HTTPS** once the certificate provisions.

## Notes

- **Fonts:** the page pulls Inter, Space Grotesk, and JetBrains Mono from Google Fonts. If a viewer is offline or a network blocks that CDN, the design falls back to clean system fonts automatically — nothing breaks.
- **No secrets, no backend, no tracking:** there is nothing to configure or secure. All state (progress, streaks, flashcard schedule) is stored in the visitor's own browser.
- **Integrity check before publishing (optional):** `npm run verify` runs the content checker over all tracks.
