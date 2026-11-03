import { Link, Route, Routes } from 'react-router';
import Landing from './pages/Landing.jsx';
import SignIn from './pages/SignIn.jsx';
import {
  Analysis,
  Dashboard,
  History,
  Patients,
  Report,
  Shell,
} from './pages/Workspace.jsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          <Shell>
            <Dashboard />
          </Shell>
        }
      />
      <Route
        path="/analysis"
        element={
          <Shell>
            <Analysis />
          </Shell>
        }
      />
      <Route
        path="/patients"
        element={
          <Shell>
            <Patients />
          </Shell>
        }
      />
      <Route
        path="/history"
        element={
          <Shell>
            <History />
          </Shell>
        }
      />
      <Route
        path="/tests/:id"
        element={
          <Shell>
            <Report />
          </Shell>
        }
      />
      <Route
        path="*"
        element={
          <Shell>
            <h1>Page not found</h1>
            <Link to="/dashboard">Go to dashboard</Link>
          </Shell>
        }
      />
    </Routes>
  );
}
