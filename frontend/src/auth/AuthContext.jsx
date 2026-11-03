import { createContext, useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router';
import { api, errorMessage } from '../api/client';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function refresh() {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/auth/me');
      setUser(response.data.user);
    } catch (error) {
      setUser(null);
      if (error.response?.status !== 401) setError(errorMessage(error));
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    refresh();
    const interceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && !error.config?.url?.startsWith('/auth/'))
          setUser(null);
        return Promise.reject(error);
      },
    );
    return () => api.interceptors.response.eject(interceptor);
  }, []);

  async function signOut() {
    await api.post('/auth/logout');
    setUser(null);
  }
  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, refresh, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function RequireAuth({ children }) {
  const { user, loading, error, refresh } = useAuth();
  const location = useLocation();
  if (loading) return <div className="auth-page">Checking your session…</div>;
  if (error)
    return (
      <div className="auth-page">
        <div className="panel">
          <p role="alert">{error}</p>
          <button className="primary-button" onClick={refresh}>
            Retry connection
          </button>
        </div>
      </div>
    );
  if (!user)
    return (
      <Navigate
        to="/signin"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  return children;
}
