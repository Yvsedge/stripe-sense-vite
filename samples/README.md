# Synthetic strip samples

These are programmatically generated classroom images, not real used strips or manufacturer reference colours. The three simulated levels have no clinical meaning. All images contain ten horizontal, evenly spaced pads matching reference-profile.json.

## Use in the app

1. Sign in and select a patient at /analysis.
2. Upload reference-profile.json as the reference profile. Do not use the older built-in two-colour example profile.
3. Upload one numbered PNG (not preview.png).
4. Drag over the entire image, from top left to bottom right. The photo is already cropped to the ten-pad row.
5. Analyse and save.

The images include subtle texture and small offsets from reference colours, so Delta E will be nonzero. Expected per-pad matches, RGB and distances are in expected-results.json. These are deterministic computational checks, not measured urine values.

Regenerate and verify all four images from the repository root with npm run samples. preview.png is a contact sheet only.
