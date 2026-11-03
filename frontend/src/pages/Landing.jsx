import { Link } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { ThemeToggle } from '../theme/ThemeContext';

function Icon({ type, ...props }) {
  const paths = {
    photo: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <circle cx="8" cy="10" r="1" />
        <path d="m4 17 5-5 4 4 3-3 5 5" />
      </>
    ),
    patient: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-3a6 6 0 0 1 12 0v3m3-13v6m-3-3h6" />
      </>
    ),
    colour: (
      <>
        <path d="M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    report: (
      <>
        <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-6-6Z" />
        <path d="M14 3v6h6M8 13h8m-8 4h5" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" />
      </>
    ),
    arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  };
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[type]}
    </svg>
  );
}

const features = [
  [
    'photo',
    'Start with a photo',
    'Upload a strip image and select the reagent-pad row. Keep the source photo with its result.',
  ],
  [
    'colour',
    'Compare the colours',
    'Match each pad against a supplied reference profile, with colour distances available for review.',
  ],
  [
    'patient',
    'Organise by patient',
    'Add yourself, a family member or a patient. Keep their tests connected without extra paperwork.',
  ],
  [
    'report',
    'Return to every result',
    'Search saved tests, revisit reports and print a copy whenever you need one.',
  ],
];

export default function Landing() {
  const { user } = useAuth();
  return (
    <div className="landing-page">
      <header className="work-header landing-header">
        <Link className="brand" to="/">
          <span className="brand-icon">▥</span>StripeSense
        </Link>
        <nav aria-label="Main navigation">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <Link to="/dashboard">Dashboard</Link>
        </nav>
        <div className="account-menu">
          <ThemeToggle />
          <Link className="text-link" to={user ? '/dashboard' : '/signin'}>
            {user ? 'My workspace' : 'Sign in'}
          </Link>
        </div>
      </header>
      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-intro">
            <div className="landing-kicker">
              <span /> A simpler way to keep track
            </div>
            <h1>
              From strip photo
              <br />
              to a <em>clearer record.</em>
            </h1>
            <p className="landing-description">
              Colour-based strip analysis and patient records, together in one workspace.
              Upload a photo, review the reference matches, and keep every result within
              reach.
            </p>
            <div className="report-actions">
              <Link className="primary-button" to="/dashboard">
                {user ? 'Open your dashboard' : 'Get started'}
                <Icon type="arrow" width="17" height="17" />
              </Link>
              <a className="secondary-button" href="#how-it-works">
                See how it works
              </a>
            </div>
            <div className="landing-assurance">
              <Icon type="lock" width="15" height="15" />
              <span>Your records. Your account. One organised place.</span>
            </div>
          </div>
          <div
            className="workflow-preview"
            aria-label="Photo-to-report workflow overview"
          >
            <div className="preview-heading">
              <span className="mini-brand">▥</span>
              <span>Inside your workspace</span>
              <span className="preview-label">Photo → Report</span>
            </div>
            <div className="preview-body">
              <div className="preview-row">
                <span className="preview-icon">
                  <Icon type="photo" />
                </span>
                <div>
                  <strong>A strip photo is your starting point</strong>
                  <small>Select the row of ten reagent pads</small>
                </div>
              </div>
              <div className="strip-frame">
                <div className="strip-paper">
                  {[
                    '#e3c675',
                    '#d9ae84',
                    '#af8aaa',
                    '#8bafaa',
                    '#bbbd81',
                    '#80a8a2',
                    '#cfca8f',
                    '#d7a29a',
                    '#c98eaa',
                    '#b19bb6',
                  ].map((colour, i) => (
                    <span key={i} style={{ backgroundColor: colour }} />
                  ))}
                </div>
                <span className="strip-caption">Colour reference matching</span>
              </div>
              <div className="preview-connector">
                <span />
                <Icon type="arrow" width="16" height="16" />
                <span />
              </div>
              <div className="preview-report">
                <span className="preview-icon">
                  <Icon type="report" />
                </span>
                <div>
                  <strong>A result you can return to</strong>
                  <p>
                    Pad-by-pad colour estimates, source image and patient details in a
                    saved report.
                  </p>
                </div>
              </div>
            </div>
            <div className="preview-foot">
              <Icon type="lock" width="14" height="14" /> Saved to your private workspace{' '}
              <Link to="/dashboard">Open dashboard →</Link>
            </div>
          </div>
        </section>

        <section className="landing-feature-section" id="features">
          <div className="landing-section-heading">
            <div>
              <p className="eyebrow">BUILT AROUND YOUR WORKFLOW</p>
              <h2>
                Less scattered information.
                <br />
                More clarity.
              </h2>
            </div>
            <p>
              For individuals keeping personal records and doctors managing a patient
              directory.
            </p>
          </div>
          <div className="landing-feature-grid">
            {features.map(([icon, title, text]) => (
              <article className="landing-feature" key={title}>
                <span className="feature-icon">
                  <Icon type={icon} />
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="landing-process" id="how-it-works">
          <div className="landing-section-heading">
            <div>
              <p className="eyebrow">HOW IT WORKS</p>
              <h2>A straightforward path to a saved result.</h2>
            </div>
          </div>
          <ol className="landing-steps">
            {[
              [
                'Add a patient',
                'Enter a name. A patient ID can be created automatically.',
              ],
              [
                'Upload & select',
                'Choose a horizontal strip photo and its matching reference profile.',
              ],
              [
                'Review the matches',
                'Inspect colour categories and any uncertain pad matches.',
              ],
              [
                'Save & revisit',
                'Find the report in history, or print it for discussion with a doctor.',
              ],
            ].map(([title, text], index) => (
              <li key={title}>
                <span className="step-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="landing-workspace-cta">
          <div>
            <p className="eyebrow">YOUR WORKSPACE IS READY</p>
            <h2>
              Start with one patient.
              <br />
              Keep the whole picture together.
            </h2>
            <p>
              Patient directory, photo analysis and saved reports—all in the dashboard.
            </p>
          </div>
          <Link className="primary-button" to="/dashboard">
            {user ? 'Go to dashboard' : 'Create your account'}
            <Icon type="arrow" width="18" height="18" />
          </Link>
        </section>
        <aside className="landing-medical-note">
          <Icon type="report" width="22" height="22" />
          <div>
            <strong>A useful record, not a diagnosis.</strong>
            <p>
              Results are unvalidated colour-based estimates. They cannot establish
              whether a result is normal, abnormal or critical. Always consult a qualified
              doctor and do not use these estimates to guide treatment decisions.
            </p>
          </div>
        </aside>
      </main>
      <footer className="landing-footer">
        <Link className="brand" to="/">
          <span className="brand-icon">▥</span>StripeSense
        </Link>
        <span>Patient records & colour-based analysis</span>
        <Link className="text-link" to="/dashboard">
          Open workspace →
        </Link>
      </footer>
    </div>
  );
}
