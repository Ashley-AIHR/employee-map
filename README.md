# Employee Map

Interactive JS-only front-end prototype for an employee map product.

The prototype models the actual employee-map workflow:

- Import a roster and normalize fields into a reusable employee data model
- Map inconsistent company roster columns into standard organization fields
- Browse an organization tree and switch department context
- Filter the employee table by department, contract type, level, and search text
- Inspect department metrics, people records, open positions, and structure signals
- Adjust front-end rule thresholds and simulate exports

## Local preview

Run a simple static server from the repo root:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Structure

- `index.html`: minimal app mount point
- `styles.css`: dashboard visual system and responsive layout
- `script.js`: all sample data, state, rendering, navigation, filters, drawers, rules, and export simulation
