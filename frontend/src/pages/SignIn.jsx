import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { api, errorMessage } from '../api/client';
import { ThemeToggle } from '../theme/ThemeContext';

export default function SignIn() {
  const { user, setUser, loading } = useAuth();
  const [register, setRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('individual');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation(),
    navigate = useNavigate();
  const requested = location.state?.from;
  const destination =
    typeof requested === 'string' &&
    requested.startsWith('/') &&
    !requested.startsWith('//') &&
    !requested.startsWith('/signin')
      ? requested
      : '/dashboard';
  if (loading) return <div className="auth-page">Checking your session…</div>;
  if (user) return <Navigate to={destination} replace />;

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { data } = await api.post(register ? '/auth/register' : '/auth/login', {
        name,
        email,
        password,
        role,
      });
      setUser(data.user);
      navigate(destination, { replace: true });
    } catch (error) {
      setError(errorMessage(error));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="auth-page">
      <div className="auth-theme-toggle">
        <ThemeToggle />
      </div>
      <div className="auth-card panel">
        <Link className="brand" to="/">
          {' '}
          <span className="brand-icon">▥</span>StripeSense
        </Link>
        <p className="eyebrow">YOUR PRIVATE HEALTH WORKSPACE</p>
        <h1>{register ? 'Create your account' : 'Welcome back'}</h1>
        <p className="muted">
          For doctors managing patients and individuals tracking themselves or their
          family.
        </p>
        {error && (
          <div role="alert" className="error-box">
            {error}
          </div>
        )}
        <form onSubmit={submit}>
          {register && (
            <>
              <label>
                Your name
                <input
                  required
                  maxLength={100}
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
              <label>
                Account type
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="individual">Individual / family</option>
                  <option value="doctor">Doctor / clinical practice</option>
                </select>
              </label>
            </>
          )}
          <label>
            Email
            <input
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              minLength={8}
              maxLength={128}
              autoComplete={register ? 'new-password' : 'current-password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {register && (
            <p className="muted">
              Use at least 8 characters. Your account type customises the workspace; it
              does not verify medical credentials.
            </p>
          )}
          <button disabled={busy} className="primary-button">
            {busy ? 'Please wait…' : register ? 'Create account' : 'Sign in'}
          </button>
        </form>
        <button
          className="text-link auth-switch"
          disabled={busy}
          onClick={() => {
            setRegister(!register);
            setError('');
            setPassword('');
          }}
        >
          {register ? 'Already have an account? Sign in' : 'New here? Create an account'}
        </button>
      </div>
    </div>
  );
}
