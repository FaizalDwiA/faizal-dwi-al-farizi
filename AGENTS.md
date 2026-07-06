<!-- AGENTS.md — concise instructions for AI coding agents -->
# AGENTS — AI agent instructions for this repository

Purpose: quick, actionable guidance so AI coding agents can be productive in this repo.

- **Primary entry (no build):** Open [index.html](index.html). The portfolio site is static and runs without a build step.
- **Dev workflow (optional):** For the Vite-based source (templates and code in `web-src`):
  - Scripts: see [package.json](package.json) at the root — `npm run dev`, `npm run build`, `npm run preview`.
  - Config: [vite.config.js](vite.config.js) at the root.

- **Key files & where to look:**
  - `index.html` — main site entry. See [index.html](index.html).
  - `project-details.html` — dynamic project detail page. See [project-details.html](project-details.html).
  - `assets/js/projects-data.js` — canonical project data used by the site. See [assets/js/projects-data.js](assets/js/projects-data.js).
  - `web-src/src/` — source files for the Vite workflow. Edit here if you intend to use the dev toolchain.
  - `README.md` — repository overview and zero-deps note. See [README.md](README.md#L1-L20).

- **Conventions & guidance:**
  - The root site is vanilla HTML/CSS/JS. Prefer small, minimal changes to `index.html`/`assets/*` for quick fixes.
  - Use the Vite workflow from the root only when you need the modern dev/build toolchain. After building, the output is handled by the build step (`npm run build`) and `build-cleanup.js`.
  - Do not assume CI or tests exist; there are no test scripts in the repo root.

- **Common tasks for agents:**
  - Fix or update content in `index.html` or `assets/js/*` and verify in a browser.
  - For larger refactors, modify `web-src/src`, run `npm install` + `npm run dev` or `npm run build` in the root directory, and link to the changed source files in PRs.

- **When editing generated files:** If you modify files under `assets/` that are produced by the Vite build, include a short note explaining whether the change came from `web-src` source or was a direct manual edit.

If you'd like, I can also:
- create a small `/.github/copilot-instructions.md` with a quick checklist for PRs, or
- add a tiny skill that can run `npm run dev` at root and open the preview.
