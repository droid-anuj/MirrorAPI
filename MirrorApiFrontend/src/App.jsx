import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MockApi from './pages/MockApi';
import WebSockets from './pages/WebSockets';
import './App.css';

function App() {
  const location = useLocation();

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="glass-nav">
        <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>
          Mirror<span>API</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/mock-api" className={location.pathname === '/mock-api' ? 'active' : ''}>Mock API</Link>
          <Link to="/websockets" className={location.pathname === '/websockets' ? 'active' : ''}>WebSockets</Link>
        </div>
      </nav>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mock-api" element={<MockApi />} />
          <Route path="/websockets" element={<WebSockets />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
