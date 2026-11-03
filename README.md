# StripeSense — MERN colour analysis lab

Desktop React/Vite frontend, Axios client, Express API, MongoDB persistence and a JavaScript image analyser using Sharp. No trained ML model or hardware required.

## Run locally

Requires a current Node.js version compatible with Vite 8 and MongoDB Community running locally, or an Atlas connection string.

```powershell
npm install
Copy-Item backend/.env.example backend/.env
npm run dev
```

Configure `MONGODB_URI` in `backend/.env` for Atlas; default: `mongodb://127.0.0.1:27017`, database `stripesense`. Never put database credentials in a `VITE_` variable. Frontend: `http://localhost:5173`. Express API: `http://localhost:3000`; Vite proxies `/api` to it. If MongoDB is unavailable, the API exits with an actionable error. There is no silent in-memory fallback.

Run separately with `npm run dev:client` and `npm run dev:server`. Build: `npm run build`. `npm run preview` serves static assets only and does not proxy the API; deployment requires a reverse proxy for `/api`. Registration, sign-in and sign-out use MongoDB-backed sessions in HttpOnly, SameSite=Strict cookies. Passwords are salted and hashed with scrypt. Production cookies require HTTPS; configure `APP_ORIGIN` for your deployed frontend origin.

## Full demo

1. Create an account at `/signin` (doctor or individual/family), then add a fictional patient at `/patients`. Only a name is required; IDs are generated when omitted.
2. At `/analysis`, select the patient and click **Load synthetic example**.
3. A generated image, matching synthetic reference profile and full-image crop load together.
4. Click **Analyse & save result**. The report should alternate Reference A / Reference B with Delta E = 0.
5. Refresh or open `/history` to retrieve the saved MongoDB record. Print/save the report as PDF or delete it.

## Your own photos and reference profiles

Upload JPEG/PNG/WebP up to 8 MB and a JSON profile with exactly ten pads. Download `/api/reference-example` for the format. **Bundled colours are synthetic, not a manufacturer calibration.**

```json
{
  "name": "Brand and strip model",
  "pads": [
    {
      "name": "Parameter name",
      "unit": "",
      "references": [
        { "label": "Category A", "rgb": [200, 180, 120] },
        { "label": "Category B", "rgb": [100, 130, 90] }
      ]
    }
  ]
}
```

The abbreviated example shows one pad; include all ten in photo order. Supply the selected strip brand's actual chart labels, units and reference colours.

Photos must contain a horizontal row of ten evenly spaced pads matching the profile's left-to-right order. Drag a rectangle spanning ten equal pad cells, excluding the handle. The overlay previews the central 50% of each cell in both dimensions. The server applies EXIF rotation, converts to sRGB, averages sampled pixels, converts to CIELAB (D65), and chooses the closest reference using Delta E 1976. Near ties (distance gap below 3) are flagged for review. This heuristic is not medical confidence.

No arbitrary-layout detector, reaction-timing correction or lighting calibration is included. Outputs are chart labels, not inferred continuous concentrations or diagnoses. Web photos may lack known ground-truth readings; synthetic samples only demonstrate application behavior.

## Persistence and endpoints

`patients` stores unique patientCode, name and timestamp. `tests` stores patient reference/name snapshot, timestamp, crop, profile snapshot, measured/reference RGB, categories, distances, method, synthetic flag and normalized PNG image as BSON binary. Images are capped at 10 MB after normalization to stay below MongoDB's document size limit. Larger applications should use GridFS or object storage.

| Method     | Endpoint                   | Purpose                                              |
| ---------- | -------------------------- | ---------------------------------------------------- |
| GET        | `/api/health`              | Database connectivity                                |
| GET / POST | `/api/patients`            | Directory / create patient                           |
| GET        | `/api/reference-example`   | Synthetic profile format                             |
| POST       | `/api/tests`               | Multipart: image, patientId, profile JSON, crop JSON |
| GET        | `/api/tests?patientId=...` | Up to 500 recent tests                               |
| GET        | `/api/tests/:id`           | Report and saved profile                             |
| GET        | `/api/tests/:id/image`     | Saved PNG                                            |
| DELETE     | `/api/tests/:id`           | Delete test and image                                |

## Verification

```powershell
npm test
npm run build
```

Unit tests verify known pad colours, Lab conversion and invalid inputs. The MongoDB integration test is skipped unless you explicitly set a test URI:

```powershell
$env:TEST_MONGODB_URI='mongodb://127.0.0.1:27017'
npm test
```

It creates and drops only a uniquely named `stripesense_test_*` database, testing patient creation/duplicates, upload, history, report/image retrieval, invalid requests and deletion. Use an account with test database permissions.

The public landing page is available at `/` and `/landing`. It describes implemented features without illustrative charts or accuracy claims. Dashboard and workspace routes still require sign-in. Archived Figma source remains in `frontend/src/imports`. Functional routes: `/dashboard`, `/analysis`, `/patients`, `/history`, `/tests/:id`.

## Project layout

- `frontend/`: React source, Vite configuration, HTML entry and frontend dependencies.
- `backend/`: Express API, MongoDB connection/index setup (`db.js`), analyser, tests and environment configuration.
- Root: npm workspace scripts, shared lockfile and formatting configuration.

Run `npm install` once from the root; npm manages dependencies for both workspaces. `npm run dev` starts both applications. MongoDB data remains in the existing MongoDB service; moving the connection code does not relocate or delete database files. Compass still uses `mongodb://127.0.0.1:27017`.

Use `npm run format` to apply formatting and `npm run format:check` to check it.

## Account privacy

Dashboard, analysis, patients, history and reports require sign-in. APIs also enforce authentication and owner-based access, including source photos and deletion. Doctor and individual account types customise wording; they do not grant access to other accounts or verify medical qualifications.

MongoDB collections: `users` (email, salted password hash, account type), `sessions` (hashed token, account reference, expiry), `patients` and `tests` (ownerId). Patient IDs are unique within each account. Session expiry is checked on every request; expired session records are removed by a TTL index. Basic in-process throttling limits login/registration attempts. Password reset, email verification, shared clinical teams and MFA are not included.

Legacy records created before accounts remain in MongoDB but are hidden because they have no ownerId. They are not deleted or automatically claimed by the first registered account. An explicit ownership migration is needed to attach them to a verified owner.

Use the same hostname consistently (localhost:5173) since browser cookies for localhost and 127.0.0.1 are separate. All private API responses disable caching. Health checks remain public.

## Appearance

The workspace header and sign-in screen include a light/dark mode toggle. The initial theme follows the system preference, then remembers your explicit choice in localStorage. Theme colours never alter uploaded images or measured colour swatches. Printed reports keep a light background.
