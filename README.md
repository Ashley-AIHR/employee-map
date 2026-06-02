# Employee Map

Interactive AIHR-style employee map prototype based on the provided product design references.

The prototype models the actual product flow behind the screenshots:

- Upload a roster and normalize fields into a reusable employee data model
- Map inconsistent company roster columns into standard organization fields
- Review whole-company structure signals before drilling down
- Drill into a department to inspect age, tenure, city, level density, and management span
- Generate an executive summary with findings, risks, recommended actions, and export options

## Local preview

Run a simple static server from the repo root:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173`.

## Structure

- `index.html`: product shell and screen structure
- `styles.css`: dashboard visual system and responsive layout
- `script.js`: sample org data, rendering logic, navigation, department switching, and report actions
