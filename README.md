# National Tutoring Observatory

Website for the [National Tutoring Observatory](https://nationaltutoringobservatory.org).

This is a static site (HTML + vanilla JavaScript + Bootstrap) hosted on **GitHub Pages**. There is no build step — changes merged into the `main` branch go live automatically within a few minutes.

All dynamic content (team members, publications, partners) is driven by **JSON data files** in the `data/` folder. You never need to edit HTML to update people or publications.

---

## Table of Contents

- [Repository Overview](#repository-overview)
- [Quick Reference: What to Edit](#quick-reference-what-to-edit)
- [Data Schemas and Templates](#data-schemas-and-templates)
- [Approach A: GitHub Web Interface (Beginner-Friendly)](#approach-a-github-web-interface-beginner-friendly)
- [Approach B: Git CLI (Advanced)](#approach-b-git-cli-advanced)
- [Image Guidelines](#image-guidelines)
- [How the Site Works](#how-the-site-works)
- [Announcement Banner and Survey Page](#announcement-banner-and-survey-page)
- [Important Notes and Gotchas](#important-notes-and-gotchas)

---

## Repository Overview

```
├── index.html                     # Landing / home page
├── team.html                      # Team page (tabs for each group)
├── publications.html              # Publications listing
├── partners.html                  # Partners page
├── approach.html                  # Approach overview
├── news.html                      # News page
├── blog.html                      # Blog page
├── contact.html                   # Contact page
├── interest-survey.html           # Embedded interest survey (linked from the banner)
│
├── approach/                      # Sub-pages under Approach
│   ├── developers.html
│   ├── researchers.html
│   ├── school-districts.html
│   └── tutoring-providers.html
│
├── components/                    # Reusable HTML fragments (navbar, footer, card templates)
│   ├── navbar.html
│   ├── footer.html
│   ├── member.html                # Team member card template
│   ├── provider.html              # Tutoring provider card template
│   ├── publication-card.html      # Publication card template
│   ├── event-card.html
│   └── partner.html
│
├── data/                          # ** JSON data files — this is what you edit **
│   ├── team-information/
│   │   ├── core-team.json
│   │   ├── national-advisory-board.json
│   │   ├── practitioner-advisory-board.json
│   │   └── tutoring-providers.json
│   ├── publications.json
│   ├── partners.json
│   ├── hero-images.json
│   ├── hero-words.json
│   └── meetings.json
│
├── img/                           # All images
│   ├── team/
│   │   ├── core/                  # Core team headshots
│   │   ├── national-advisory-board/
│   │   └── practitioner-advisory-board/
│   ├── partners/                  # Partner and provider logos
│   ├── logos/                     # University logos (Cornell, CMU, etc.)
│   └── hero/                      # Hero / carousel images
│
├── css/
│   └── style.css                  # Main stylesheet
│
├── js/                            # JavaScript
│   ├── components.js              # Loads navbar and footer
│   ├── main.js
│   ├── team.js                    # Reads team JSON, renders member cards
│   ├── publications.js            # Reads publications JSON, renders cards
│   ├── partners.js
│   ├── hero.js
│   ├── approach-events.js
│   ├── github-widget.js
│   └── supascribe.js
│
├── CNAME                          # Custom domain config
├── package.json                   # npm scripts for local dev server
├── serve.py                       # Alternative Python dev server
└── TROUBLESHOOTING.md             # Debugging guide
```

---

## Quick Reference: What to Edit

| Task | File(s) to edit |
|------|----------------|
| Add / edit / remove a **Core Team** member | `data/team-information/core-team.json` + photo in `img/team/core/` |
| Add / edit / remove a **National Advisory Board** member | `data/team-information/national-advisory-board.json` + photo in `img/team/national-advisory-board/` |
| Add / edit / remove a **Practitioner Advisory Board** member | `data/team-information/practitioner-advisory-board.json` + photo in `img/team/practitioner-advisory-board/` |
| Add / edit / remove a **Tutoring Provider** | `data/team-information/tutoring-providers.json` + logo in `img/partners/` |
| Add / edit / remove a **publication** | `data/publications.json` |
| Add / edit / remove a **partner** | `data/partners.json` + logo in `img/partners/` |
| Update a **team member photo** | Replace the file in the matching `img/team/<group>/` folder |

---

## Data Schemas and Templates

Below are the JSON structures used by the site. Copy-paste the templates when adding new entries.

### Team Member (Core Team, National Advisory Board, Practitioner Advisory Board)

Each of the three board JSON files is an **array** of objects with this shape:

```json
{
  "name": "First Last",
  "position": "Title or Affiliation",
  "img": "img/team/<group>/firstname-lastname.jpg",
  "description": "A short bio. Can be left as an empty string.",
  "social": {
    "website": "",
    "email": "",
    "twitter": "",
    "linkedin": "",
    "cv": ""
  }
}
```

- Replace `<group>` with one of: `core`, `national-advisory-board`, or `practitioner-advisory-board`.
- Leave any social field as `""` if it does not apply.

### Tutoring Provider

`data/team-information/tutoring-providers.json` uses a different shape with a company and contacts list:

```json
{
  "company": "Company Name",
  "img": "img/partners/company-logo.png",
  "website": "https://example.com",
  "contacts": [
    {
      "name": "Contact Name",
      "title": "Job Title",
      "homepage": "",
      "img": "",
      "bio": ""
    }
  ]
}
```

### Publication

`data/publications.json` is an array of objects:

```json
{
  "authors": "Author One, Author Two, Author Three",
  "year": 2026,
  "title": "Full Paper Title",
  "venue": "Conference or Journal Abbreviation",
  "link": "https://link-to-paper.example.com"
}
```

Publications are automatically sorted by year (newest first), then alphabetically by title.

### Partner

`data/partners.json` is an array of objects:

```json
{
  "name": "Partner Organization Name",
  "img": "img/partners/partner-logo.png",
  "website": "https://example.com",
  "description": "A sentence or two about the partner."
}
```

---

## Approach A: GitHub Web Interface (Beginner-Friendly)

Everything below can be done entirely in your browser on github.com. No software to install.

### A1. Editing a JSON file (add, edit, or remove an entry)

1. Go to the repository on GitHub.
2. Navigate to the file you want to edit (e.g., `data/team-information/core-team.json`).
3. Click the **pencil icon** (Edit this file) in the top-right corner of the file view.
4. Make your changes in the editor:
   - **To add** a new entry: place your cursor after the last `}` in the array (before the closing `]`), add a comma, then paste a new object from the templates above.
   - **To edit** an existing entry: find the person or publication and change the relevant fields.
   - **To remove** an entry: delete the entire `{ ... }` block for that entry and remove any trailing comma that would be left behind.
5. Click the green **Commit changes...** button.
6. In the dialog:
   - Write a short commit message (e.g., "Add Jane Doe to core team").
   - Select **"Commit directly to the `main` branch"** for simple changes, or **"Create a new branch for this commit and start a pull request"** if you want someone to review first.
7. Click **Commit changes** (or **Propose changes** if creating a pull request).

The site will update automatically within a few minutes after the commit lands on `main`.

### A2. Uploading an image (photo or logo)

1. Go to the repository on GitHub.
2. Navigate to the correct image folder:
   - Core team photos: `img/team/core/`
   - National Advisory Board photos: `img/team/national-advisory-board/`
   - Practitioner Advisory Board photos: `img/team/practitioner-advisory-board/`
   - Partner / provider logos: `img/partners/`
3. Click **Add file** > **Upload files**.
4. Drag and drop your image file (or click "choose your files").
   - Name the file following the convention: `firstname-lastname.jpg` (lowercase, hyphens, no spaces).
5. Write a commit message (e.g., "Add photo for Jane Doe").
6. Commit directly to `main` or create a pull request.

### A3. Full example: Adding a new team member

1. **Upload the photo first** (follow A2 above). For example, upload `jane-doe.jpg` to `img/team/core/`.
2. Navigate to `data/team-information/core-team.json`.
3. Click the **pencil icon** to edit.
4. Add a new entry at the end of the array (before the closing `]`). Make sure there is a comma after the previous entry:

   ```json
   ,
   {
     "name": "Jane Doe",
     "position": "Research Scientist",
     "img": "img/team/core/jane-doe.jpg",
     "description": "Jane is a Research Scientist at Cornell University.",
     "social": {
       "website": "https://janedoe.com",
       "email": "jd123@cornell.edu",
       "twitter": "",
       "linkedin": "",
       "cv": ""
     }
   }
   ```

5. Commit the change.
6. The team page will now show Jane Doe's card.

### A4. Full example: Removing a team member

1. Navigate to the relevant JSON file (e.g., `data/team-information/core-team.json`).
2. Click the **pencil icon** to edit.
3. Find the member's entry and delete the entire `{ ... }` block, including the comma before or after it (whichever avoids leaving a trailing comma).
4. Commit the change.
5. Optionally, navigate to the member's photo in `img/team/<group>/` and delete it (click the file, then click the trash icon).

### A5. Full example: Adding a publication

1. Navigate to `data/publications.json`.
2. Click the **pencil icon** to edit.
3. Add a new entry at the end of the array (before the closing `]`):

   ```json
   ,
   {
     "authors": "Author One, Author Two",
     "year": 2026,
     "title": "My New Paper Title",
     "venue": "CONFERENCE2026",
     "link": "https://arxiv.org/abs/XXXX.XXXXX"
   }
   ```

4. Commit the change. The publication will appear on the publications page, sorted by year.

### A6. Full example: Removing a publication

1. Navigate to `data/publications.json`.
2. Click the **pencil icon** to edit.
3. Find and delete the entire `{ ... }` block for the publication. Clean up any leftover commas.
4. Commit the change.

---

## Approach B: Git CLI (Advanced)

Use this workflow if you prefer working in a terminal, want to preview changes locally before pushing, or are making large or multi-file changes.

### B1. One-time setup

```bash
# Clone the repository
git clone https://github.com/National-Tutoring-Observatory/National-Tutoring-Observatory.github.io.git
cd National-Tutoring-Observatory.github.io

# Install the local dev server dependency
npm install
```

### B2. Making changes

```bash
# 1. Make sure you are on the latest main branch
git checkout main
git pull origin main

# 2. Create a new branch for your changes
git checkout -b add-jane-doe

# 3. Start the local dev server to preview changes
npm start
# Site is now running at http://localhost:8000

# 4. Make your edits:
#    - Edit JSON files in data/
#    - Add images to img/team/<group>/ or img/partners/
#    - Preview in the browser at http://localhost:8000
```

### B3. Committing and pushing

```bash
# Stage your changes
git add data/team-information/core-team.json
git add img/team/core/jane-doe.jpg

# Commit with a descriptive message
git commit -m "Add Jane Doe to core team"

# Push your branch to GitHub
git push -u origin add-jane-doe
```

### B4. Opening a pull request

1. After pushing, go to the repository on GitHub.
2. You will see a banner: **"add-jane-doe had recent pushes"** with a **Compare & pull request** button. Click it.
3. Add a title and description, then click **Create pull request**.
4. Once reviewed and approved, merge the pull request. The site updates automatically.

### B5. Quick changes directly to main

For small, confident changes you can skip the branch and PR:

```bash
git checkout main
git pull origin main

# Make your edits...

git add -A
git commit -m "Update Jane Doe's bio"
git push origin main
```

The site will update within a few minutes.

---

## Image Guidelines

### Naming Convention

- **Lowercase**, **hyphen-separated**: `firstname-lastname.jpg`
- No spaces or special characters in filenames.
- Examples: `jane-doe.jpg`, `rene-kizilcec.jpg`, `saga.png`

### File Formats

- **Headshots**: `.jpg`, `.jpeg`, or `.png`
- **Logos**: `.png` or `.svg`

### Where to Put Images

| Type | Folder |
|------|--------|
| Core team headshots | `img/team/core/` |
| National Advisory Board headshots | `img/team/national-advisory-board/` |
| Practitioner Advisory Board headshots | `img/team/practitioner-advisory-board/` |
| Partner or provider logos | `img/partners/` |
| Hero / carousel images | `img/hero/` |
| University logos | `img/logos/` |

### Important

The `img` path you write in the JSON must **exactly match** the actual file path and name (case-sensitive). For example, if your file is `img/team/core/jane-doe.jpg`, the JSON must say `"img": "img/team/core/jane-doe.jpg"` — not `Jane-Doe.jpg` or `jane-doe.JPG`.

---

## How the Site Works

### Data-driven rendering

The site uses vanilla JavaScript to `fetch()` JSON data files and render HTML cards from templates:

- **`js/team.js`** loads the appropriate `data/team-information/*.json` file based on which tab is selected, then clones `components/member.html` or `components/provider.html` for each entry.
- **`js/publications.js`** loads `data/publications.json`, sorts entries by year (descending) then title, and renders `components/publication-card.html` for each one.
- **`js/partners.js`** loads `data/partners.json` and renders `components/partner.html` for each entry.
- **`js/components.js`** injects the shared `components/navbar.html` and `components/footer.html` into every page.

This means you only need to edit JSON files and add images — the JavaScript handles everything else.

### Local development

A local server is required because the site uses `fetch()` to load components and data, which browsers block when opening files directly from disk (`file://` protocol).

**Option 1 — npm (recommended):**
```bash
npm start
# or: npm run server
# Opens at http://localhost:8000
```

**Option 2 — Python:**
```bash
python3 serve.py
# Opens at http://localhost:8000
```

See [TROUBLESHOOTING.md](TROUBLESHOOTING.md) for help with common issues like 404 errors or missing images.

---

## Announcement Banner and Survey Page

### Announcement banner

A dismissible red banner can appear at the very top of every page (above the navbar) to promote time-sensitive things like a survey, an event, or a launch. It is defined once in `components/navbar.html`, so it shows on every page automatically. Visitors can close it with the `×` button, which hides it only for them.

**Change the banner text or link:**

1. Open `components/navbar.html`.
2. Edit the text inside `<span class="announcement-bar-text">` (including the leading emoji), and the `href` and label of the `<a class="announcement-bar-link">`.

**Turn the banner off (or back on):**

The banner reserves space at the top of the page using a CSS variable.

1. In `css/style.css`, find `--announcement-height` in the `:root` block near the top.
2. Set it to `0px` to hide the banner, or back to `40px` to show it.

To remove the banner entirely, also delete the `<!-- Announcement Banner -->` block in `components/navbar.html`.

### Interest survey page

`interest-survey.html` embeds an external survey form so visitors can fill it out without leaving the site.

- **Point it at a different survey:** change the URL in `<iframe src="...">`, and update the matching fallback ("Open it in a new tab") link just below the iframe so both use the same URL.
- **The survey provider's own header is hidden** by cropping the top of the embed. If that header reappears, or the bottom of the survey gets cut off, adjust the two values in the survey block of `css/style.css`:
  - `--survey-header-crop` controls how much is trimmed from the top of the embed.
  - `--survey-iframe-height` controls how tall the embed is. Increase it if the survey grows and the bottom is cut off.

---

## Important Notes and Gotchas

1. **JSON syntax is strict.** A single trailing comma or missing quote will break the entire page. If something stops rendering after your edit, double-check your JSON. You can paste it into [jsonlint.com](https://jsonlint.com) to validate.

2. **Changes to `main` deploy automatically.** GitHub Pages rebuilds within a few minutes of any push to `main`. There is no manual deploy step.

3. **Image paths are case-sensitive.** `Jane-Doe.jpg` and `jane-doe.jpg` are different files. Make sure the path in the JSON matches exactly.

4. **Clear your browser cache** if you don't see changes right away. Use Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows/Linux) for a hard refresh.

5. **The JSON files are arrays.** Each file starts with `[` and ends with `]`. Every entry is a `{ ... }` object separated by commas. The last entry must **not** have a trailing comma.
