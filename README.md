# jubayerhossen.github.io

Simple personal/static site repository containing the built site in the `docs/` folder.

## Project summary

This repository hosts a small static website (HTML, CSS, JS) inside the `docs/` directory. It's intended to be served as a GitHub Pages site or previewed locally.

## What’s included

- `docs/index.html` — main HTML file (site entry point)
- `docs/style.css` — site styles
- `docs/script.js` — client-side JavaScript
- `LICENSE.txt` — repository license
- `README.txt` — original README (kept for reference)

## How to preview locally

Option 1 — Open the site directly in your browser:
- Open `docs/index.html` with your browser (double-click or use `File → Open`).

Option 2 — Serve the `docs/` folder with Python (recommended for correct relative paths):

PowerShell (Windows):

```powershell
# serve files on http://localhost:8000
python -m http.server 8000 --directory docs
# then open http://localhost:8000 in your browser
```

Note: If `python` is not available, try `py -3 -m http.server 8000 --directory docs`.

## Development

This repository contains the built site only. If you plan to add source tooling (build steps, bundlers, SCSS, etc.), consider moving source files into a `src/` directory and adding a simple build step that outputs to `docs/`.

## Contributing

1. Fork or branch from `main`.
2. Make small, focused commits.
3. Open a pull request with a brief description of changes.

If you update the site, ensure `docs/index.html` still works when opened directly or served from a simple HTTP server.

## License

See `LICENSE.txt` for license terms.

## Contact

Repository owner: Jubayer Hossen

---

(If you want a different README tone, more technical details like a build pipeline, or a demo screenshot added, tell me what you'd like and I'll update this file.)
