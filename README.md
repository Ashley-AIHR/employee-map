# Employee Map

Interactive JS-only front-end prototype for an employee map product. The built-in sample is a deterministic 640-person company roster, so every page starts with realistic 500+ employee scale even before importing a file.

The prototype models the actual employee-map workflow:

- Import a roster and normalize fields into a reusable employee data model
- Map inconsistent company roster columns into standard organization fields
- Browse an organization tree and switch department context
- Filter the employee table by department, contract type, level, and search text
- Inspect department metrics, people records, open positions, and structure signals
- Adjust front-end rule thresholds and immediately refresh structure signals
- Persist imported data, mapping selections, and rules in `localStorage`
- Generate CSV / JSON / text exports directly in the browser

The sample roster includes eight departments, department heads, individual employee IDs, managers, job titles, cities, contract types, levels, hire dates, validation status, and derived budget/open-HC signals.

## Codex tutorial

This repo now includes a practical tutorial on how the project was vibe-coded with Codex using the real interactive development flow: reference images, user corrections, realistic data, import logic, verification, and GitHub publication.

- `docs/vibe-coding-with-codex.md`: step-by-step tutorial based on the real project history
- `outputs/test-employee-map-import.csv`: test import file for trying the app quickly

## Local preview

Run a simple static server from the repo root:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Structure

- `index.html`: minimal app mount point
- `styles.css`: dashboard visual system and responsive layout
- `script.js`: all sample data, CSV parser, local storage, derived org metrics, rendering, navigation, filters, drawers, rules, and browser-side exports
