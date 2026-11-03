import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate, useParams } from 'react-router';
import { api, errorMessage } from '../api/client';
import { RequireAuth, useAuth } from '../auth/AuthContext';
import ResultExplanation from '../components/ResultExplanation';
import { ThemeToggle } from '../theme/ThemeContext';
import { displayCategory, displayProfile } from '../utils/reportInterpretation';

const date = (value) => new Date(value).toLocaleString();
const swatch = (rgb) => ({ backgroundColor: `rgb(${rgb.join(',')})` });
export function Shell({ children }) {
  return (
    <RequireAuth>
      <WorkspaceShell>{children}</WorkspaceShell>
    </RequireAuth>
  );
}

function WorkspaceShell({ children }) {
  const { user, signOut } = useAuth();
  const [logoutError, setLogoutError] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  async function logout() {
    setSigningOut(true);
    setLogoutError('');
    try {
      await signOut();
    } catch (error) {
      setLogoutError(errorMessage(error));
    } finally {
      setSigningOut(false);
    }
  }
  return (
    <div className="workspace">
      <header className="work-header">
        <Link className="brand" to="/dashboard">
          <span className="brand-icon">▥</span>StripeSense
        </Link>
        <nav>
          {[
            ['/dashboard', 'Dashboard'],
            ['/analysis', 'Analyse photo'],
            ['/history', 'Test history'],
            ['/patients', 'Patients'],
          ].map(([to, label]) => (
            <NavLink key={to} to={to}>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="account-menu">
          <ThemeToggle />
          <span>
            {user.name}
            <small>
              {user.role === 'doctor' ? 'Doctor workspace' : 'Individual / family'}
            </small>
          </span>
          <button className="secondary-button" disabled={signingOut} onClick={logout}>
            {signingOut ? 'Signing out…' : 'Sign out'}
          </button>
        </div>
      </header>
      <main className="work-main">
        {logoutError && (
          <div className="error-box" role="alert">
            {logoutError}
          </div>
        )}
        {children}
      </main>
      <footer className="work-footer">
        Colour-based estimates only. Always consult a qualified doctor. Results are not a
        diagnosis and must not guide treatment decisions.
      </footer>
    </div>
  );
}
function Heading({ eyebrow = 'STRIPESENSE WORKSPACE', title, children }) {
  return (
    <div className="page-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </div>
      {children}
    </div>
  );
}
function ErrorBox({ error }) {
  return (
    error && (
      <div role="alert" className="error-box">
        {error}
      </div>
    )
  );
}
function useRecords() {
  const [patients, setPatients] = useState([]),
    [tests, setTests] = useState([]),
    [error, setError] = useState(''),
    [loading, setLoading] = useState(true);
  const refresh = async () => {
    setLoading(true);
    setError('');
    try {
      const [p, t] = await Promise.all([api.get('/patients'), api.get('/tests')]);
      setPatients(p.data);
      setTests(t.data);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    refresh();
  }, []);
  return { patients, tests, error, loading, refresh };
}
function TestTable({ tests }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Patient</th>
            <th>Created</th>
            <th>Reference profile</th>
            <th>Result</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {tests.map((t) => (
            <tr key={t._id}>
              <td>
                <strong>{t.patientName}</strong>
                <small>{t.patientCode}</small>
              </td>
              <td>{date(t.createdAt)}</td>
              <td>{displayProfile(t.profileName, t.synthetic)}</td>
              <td>
                <span className="pill">{`${t.parameters.length} colour estimates`}</span>
              </td>
              <td>
                <Link className="text-link" to={`/tests/${t._id}`}>
                  View report →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function Dashboard() {
  const { patients, tests, error, loading, refresh } = useRecords();
  return (
    <>
      <Heading title="Your analysis workspace">
        <Link className="primary-button" to="/analysis">
          + Analyse a strip
        </Link>
      </Heading>
      <ErrorBox error={error} />
      {error && (
        <button className="secondary-button" onClick={refresh}>
          Retry connection
        </button>
      )}
      <div className="stat-grid">
        {[
          ['Patients', patients.length],
          ['Saved tests', tests.length],
          ['Pads per analysis', 10],
        ].map(([label, value]) => (
          <div className="panel stat" key={label}>
            <span>{label}</span>
            <strong>{loading ? '—' : value}</strong>
          </div>
        ))}
      </div>
      <section className="panel">
        <div className="section-heading">
          <h2>Recent tests</h2>
          <Link className="text-link" to="/history">
            View history →
          </Link>
        </div>
        {loading ? (
          <p>Loading records…</p>
        ) : tests.length ? (
          <TestTable tests={tests.slice(0, 5)} />
        ) : (
          <div className="empty">
            <h3>Start with your first strip photo</h3>
            <p>
              Add a patient, select a reference profile, and upload a horizontal strip
              image.
            </p>
            <Link className="primary-button" to="/patients">
              Add a patient
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
export function Patients() {
  const { user } = useAuth();
  const { patients, error, loading, refresh } = useRecords();
  const [name, setName] = useState(''),
    [code, setCode] = useState(''),
    [saveError, setSaveError] = useState(''),
    [busy, setBusy] = useState(false);
  async function save(e) {
    e.preventDefault();
    setBusy(true);
    setSaveError('');
    try {
      await api.post('/patients', { name, patientCode: code });
      setName('');
      setCode('');
      await refresh();
    } catch (e) {
      setSaveError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Heading title="Patients" />
      <ErrorBox error={error || saveError} />
      <div className="two-columns">
        <form className="panel" onSubmit={save}>
          <h2>Add a patient</h2>
          <p className="muted">
            {user.role === 'doctor'
              ? 'Add a patient to your private practice directory.'
              : 'Add yourself or a family member to start tracking tests.'}{' '}
            Only your account can access these records.
          </p>
          <label>
            Patient ID (optional)
            <input
              maxLength={40}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Leave blank to generate automatically"
            />
          </label>
          <label>
            Name
            <input
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Patient name"
            />
          </label>
          <button disabled={busy} className="primary-button">
            {busy ? 'Saving…' : 'Save patient'}
          </button>
        </form>
        <section className="panel">
          <h2>Patient directory</h2>
          {loading ? (
            <p>Loading…</p>
          ) : patients.length ? (
            patients.map((p) => (
              <div className="patient-row" key={p._id}>
                <div>
                  <strong>{p.name}</strong>
                  <small>{p.patientCode}</small>
                </div>
                <Link className="text-link" to={`/analysis?patient=${p._id}`}>
                  New test →
                </Link>
              </div>
            ))
          ) : (
            <p className="muted">No patients saved yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
export function History() {
  const { patients, tests, error, loading, refresh } = useRecords();
  const [patient, setPatient] = useState(''),
    [query, setQuery] = useState('');
  const filtered = tests.filter(
    (t) =>
      (!patient || t.patientId === patient) &&
      `${t.patientName} ${t.patientCode} ${t.profileName}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <Heading title="Test history">
        <Link to="/analysis" className="primary-button">
          + New analysis
        </Link>
      </Heading>
      <ErrorBox error={error} />
      <section className="panel">
        <div className="filter-row">
          <input
            aria-label="Search tests"
            placeholder="Search patient or profile…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            aria-label="Filter patient"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          >
            <option value="">All patients</option>
            {patients.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name} · {p.patientCode}
              </option>
            ))}
          </select>
          <button className="secondary-button" onClick={refresh}>
            Refresh
          </button>
        </div>
        {loading ? (
          <p>Loading tests…</p>
        ) : filtered.length ? (
          <TestTable tests={filtered} />
        ) : (
          <div className="empty">No matching tests.</div>
        )}
        <p className="muted">Showing up to the 500 most recent saved tests.</p>
      </section>
    </>
  );
}

export function Analysis() {
  const { patients, error: connectionError } = useRecords();
  const location = useLocation(),
    navigate = useNavigate();
  const [patient, setPatient] = useState(
    new URLSearchParams(location.search).get('patient') || '',
  );
  const [file, setFile] = useState(null),
    [url, setUrl] = useState(''),
    [profile, setProfile] = useState(null),
    [crop, setCrop] = useState(null),
    [start, setStart] = useState(null),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [progress, setProgress] = useState(0),
    [ready, setReady] = useState(false);
  const imageRef = useRef(null);
  useEffect(() => {
    if (!file) {
      setUrl('');
      return;
    }
    const next = URL.createObjectURL(file);
    setUrl(next);
    return () => URL.revokeObjectURL(next);
  }, [file]);
  function chooseFile(next) {
    setError('');
    if (!next) return;
    if (
      !['image/png', 'image/jpeg', 'image/webp'].includes(next.type) ||
      next.size > 8 * 1024 * 1024
    ) {
      setError('Choose a JPEG, PNG or WebP image up to 8 MB.');
      return;
    }
    setFile(next);
    setCrop(null);
    setReady(false);
  }
  async function readProfile(next) {
    try {
      const parsed = JSON.parse(await next.text());
      if (!parsed.name || parsed.pads?.length !== 10) throw Error();
      setProfile(parsed);
      setError('');
    } catch {
      setError('Choose a reference JSON file with a name and exactly 10 pads.');
    }
  }
  async function loadDemo() {
    try {
      const { data } = await api.get('/reference-example');
      setProfile(data);
      const canvas = document.createElement('canvas');
      canvas.width = 1000;
      canvas.height = 100;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#f4f0e7';
      ctx.fillRect(0, 0, 1000, 100);
      data.pads.forEach((p, i) => {
        ctx.fillStyle = `rgb(${p.references[i % 2].rgb.join(',')})`;
        ctx.fillRect(i * 100 + 15, 10, 70, 80);
      });
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
      chooseFile(new File([blob], 'synthetic-strip.png', { type: 'image/png' }));
      setCrop({ x: 0, y: 0, width: 1, height: 1 });
    } catch (e) {
      setError(errorMessage(e));
    }
  }
  function point(e) {
    const r = imageRef.current.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)),
      y: Math.max(0, Math.min(1, (e.clientY - r.top) / r.height)),
    };
  }
  function move(e) {
    if (!start) return;
    const p = point(e);
    setCrop({
      x: Math.min(start.x, p.x),
      y: Math.min(start.y, p.y),
      width: Math.abs(p.x - start.x),
      height: Math.abs(p.y - start.y),
    });
  }
  async function submit(e) {
    e.preventDefault();
    setError('');
    setBusy(true);
    setProgress(0);
    try {
      const body = new FormData();
      body.append('image', file);
      body.append('patientId', patient);
      body.append('profile', JSON.stringify(profile));
      body.append('crop', JSON.stringify(crop));
      const { data } = await api.post('/tests', body, {
        onUploadProgress: (e) => setProgress(Math.round(e.progress * 100) || 0),
      });
      navigate(`/tests/${data._id}`);
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Heading title="Analyse a strip photo">
        <button
          type="button"
          className="secondary-button"
          disabled={busy}
          onClick={loadDemo}
        >
          Load sample strip
        </button>
      </Heading>
      <ErrorBox error={error || connectionError} />
      <form onSubmit={submit}>
        <div className="two-columns analysis-columns">
          <section className="panel">
            <h2>1. Patient & reference</h2>
            <label>
              Patient
              <select
                required
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
              >
                <option value="">Select a patient</option>
                {patients.map((p) => (
                  <option value={p._id} key={p._id}>
                    {p.name} · {p.patientCode}
                  </option>
                ))}
              </select>
            </label>
            <Link className="text-link" to="/patients">
              + Add patient
            </Link>
            <label>
              Reference profile (.json)
              <input
                type="file"
                accept=".json,application/json"
                onChange={(e) => e.target.files[0] && readProfile(e.target.files[0])}
              />
            </label>
            <p className="muted">
              Use the selected brand’s pad order and labelled reference colours.{' '}
              <a
                className="text-link"
                href="/api/reference-example"
                download="reference-example.json"
              >
                Download JSON format
              </a>
              .
            </p>
            {profile && (
              <div className="profile-summary">
                <strong>{displayProfile(profile.name, profile.synthetic)}</strong>
                <p>Reference colours for approximate image matching.</p>
                <ol>
                  {profile.pads.map((p, i) => (
                    <li key={i}>{p.name}</li>
                  ))}
                </ol>
              </div>
            )}
            <h2>2. Strip photo</h2>
            <label>
              JPEG, PNG or WebP · up to 8 MB
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(e) => chooseFile(e.target.files[0])}
              />
            </label>
            <p className="muted">
              Use a horizontal row of 10 evenly spaced pads, ordered left to right to
              match the profile. Exclude the handle.
            </p>
          </section>
          <section className="panel">
            <h2>3. Select the pad row</h2>
            <p className="muted">
              Drag over the image from the left edge of the first pad’s cell to the right
              edge of the last. The boxes show the central regions that will be sampled.
            </p>
            {url ? (
              <div
                className="image-stage"
                onPointerDown={(e) => {
                  if (!ready) return;
                  e.currentTarget.setPointerCapture(e.pointerId);
                  setStart(point(e));
                  setCrop(null);
                }}
                onPointerMove={move}
                onPointerUp={(e) => {
                  move(e);
                  setStart(null);
                }}
                onPointerCancel={() => setStart(null)}
              >
                <img
                  draggable={false}
                  ref={imageRef}
                  src={url}
                  alt="Uploaded strip: drag to select the row of ten pads"
                  onLoad={() => setReady(true)}
                  onError={() => {
                    setReady(false);
                    setError('This image cannot be decoded. Choose another image.');
                  }}
                />
                {crop && (
                  <div
                    className="crop-overlay"
                    style={{
                      left: `${crop.x * 100}%`,
                      top: `${crop.y * 100}%`,
                      width: `${crop.width * 100}%`,
                      height: `${crop.height * 100}%`,
                    }}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <span key={i}>
                        <b>{i + 1}</b>
                        <i />
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="empty image-empty">
                <strong>Your strip photo will appear here</strong>
                <p>Upload a photo or load a sample strip.</p>
              </div>
            )}
            <div className="analysis-note">
              Matching uses CIELAB colour distance. A close colour match is not a medical
              confidence score. Unknown or uneven pad layouts are outside this prototype’s
              scope.
            </div>
            <button
              className="primary-button"
              disabled={busy || !file || !ready || !crop || !profile || !patient}
            >
              {busy ? `Uploading / analysing… ${progress}%` : 'Analyse & save result →'}
            </button>
          </section>
        </div>
      </form>
    </>
  );
}

export function Report() {
  const { id } = useParams(),
    navigate = useNavigate();
  const [test, setTest] = useState(null),
    [error, setError] = useState(''),
    [busy, setBusy] = useState(false),
    [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => {
    setTest(null);
    setError('');
    api
      .get(`/tests/${id}`)
      .then((r) => setTest(r.data))
      .catch((e) => setError(errorMessage(e)));
  }, [id]);
  async function remove() {
    setBusy(true);
    try {
      await api.delete(`/tests/${id}`);
      navigate('/history');
    } catch (e) {
      setError(errorMessage(e));
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <Heading title="Analysis report">
        <div className="report-actions">
          <button className="secondary-button" onClick={() => window.print()}>
            Print / Save PDF
          </button>
          <Link className="primary-button" to="/analysis">
            New analysis
          </Link>
        </div>
      </Heading>
      <ErrorBox error={error} />
      {test ? (
        <>
          <section className="panel report-summary">
            <div>
              <p className="eyebrow">PATIENT</p>
              <h2>{test.patientName}</h2>
              <p>
                {test.patientCode} · {date(test.createdAt)}
              </p>
              <small>Test ID: {test._id}</small>
            </div>
            <div>
              <span className="pill">Estimated colour result</span>
              <p>{displayProfile(test.profileName, test.synthetic)}</p>
              <small>{test.method}</small>
            </div>
          </section>
          <ResultExplanation test={test} />
          <section className="panel">
            <h2>Colour matching details</h2>
            <p className="muted">
              Values are labels from the supplied profile. Small Delta E means a closer
              colour match. “Review” marks a near tie between reference colours.
            </p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Pad / parameter</th>
                    <th>Matched category</th>
                    <th>Measured colour</th>
                    <th>Reference colour</th>
                    <th>Delta E</th>
                    <th>Review</th>
                  </tr>
                </thead>
                <tbody>
                  {test.parameters.map((p, i) => (
                    <tr key={i}>
                      <td>
                        {i + 1}. {p.name}
                      </td>
                      <td>
                        <strong>{displayCategory(p.label)}</strong> {p.unit}
                      </td>
                      <td>
                        <span className="colour-chip" style={swatch(p.rgb)} />
                        {p.rgb.join(', ')}
                      </td>
                      <td>
                        <span className="colour-chip" style={swatch(p.referenceRgb)} />
                        {p.referenceRgb.join(', ')}
                      </td>
                      <td>{p.deltaE}</td>
                      <td>{p.ambiguous ? 'Near tie — review' : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section className="panel">
            <h2>Source photo</h2>
            <img
              className="report-photo"
              src={`/api/tests/${id}/image`}
              alt="Original strip photograph used for this saved analysis"
            />
            <p className="muted">
              Stored with the reference profile, selected crop and colour measurements for
              reproducibility.
            </p>
          </section>
          <div className="delete-actions">
            {confirmDelete ? (
              <>
                <span>Delete this result and its stored photo?</span>
                <button disabled={busy} className="danger-button" onClick={remove}>
                  Confirm deletion
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setConfirmDelete(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="danger-button" onClick={() => setConfirmDelete(true)}>
                Delete test
              </button>
            )}
          </div>
        </>
      ) : (
        !error && <p>Loading saved report…</p>
      )}
    </>
  );
}
