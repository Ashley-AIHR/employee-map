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
