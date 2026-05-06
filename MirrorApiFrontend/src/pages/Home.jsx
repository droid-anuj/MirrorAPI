import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container fade-in">
      {/* Hero Section */}
      <header className="header" style={{ marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px auto' }}>
        <h1>Mirror<span>API</span></h1>
        <p style={{ fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
          The developer's Swiss Army Knife for API development.
        </p>
        
        {/* Two Distinct Entry Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
          <Link to="/mock-api" className="primary-btn" style={{ 
            textDecoration: 'none', 
            padding: '16px 40px', 
            fontSize: '16px',
            background: 'var(--primary)',
            boxShadow: '0 10px 20px -5px rgba(79, 70, 229, 0.4)'
          }}>
            🚀 Start Mocking
          </Link>
          <Link to="/websockets" className="primary-btn" style={{ 
            textDecoration: 'none', 
            padding: '16px 40px', 
            fontSize: '16px',
            background: 'var(--secondary)',
            boxShadow: '0 10px 20px -5px rgba(14, 165, 233, 0.4)'
          }}>
            ⚡ Watch Webhooks
          </Link>
        </div>
      </header>

      {/* Feature Grid */}
      <div className="dashboard-grid" style={{ marginBottom: '64px' }}>
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '2rem' }}>🌐</div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Dynamic Mock APIs</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>
            Don't wait for the backend. Define your own HTTP endpoints with custom paths, methods, 
            status codes, and JSON responses. Get a live URL in seconds.
          </p>
          <ul style={{ paddingLeft: '18px', margin: '8px 0', color: '#475569', fontSize: '13px' }}>
            <li style={{ marginBottom: '6px' }}>Custom namespaces for teams.</li>
            <li style={{ marginBottom: '6px' }}>Support for GET, POST, PUT, DELETE.</li>
            <li>Instant JSON validation.</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '2rem' }}>⚡</div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Live Webhook Catcher</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>
            Debug third-party integrations like Stripe or GitHub without a server. 
            Connect to a unique ID and see payloads stream directly to your browser via WebSockets.
          </p>
          <ul style={{ paddingLeft: '18px', margin: '8px 0', color: '#475569', fontSize: '13px' }}>
            <li style={{ marginBottom: '6px' }}>Real-time payload inspection.</li>
            <li style={{ marginBottom: '6px' }}>Persistent webhook IDs.</li>
            <li>Simulate payloads with one click.</li>
          </ul>
        </div>

        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '2rem' }}>👯</div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>API Cloning</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.5', fontSize: '14px', margin: 0 }}>
            Mirror existing external APIs for offline or local development. 
            Provide a URL and Auth headers, and MirrorAPI will fetch and mock that exact response.
          </p>
          <ul style={{ paddingLeft: '18px', margin: '8px 0', color: '#475569', fontSize: '13px' }}>
            <li style={{ marginBottom: '6px' }}>Bypass rate limits of external APIs.</li>
            <li style={{ marginBottom: '6px' }}>Support for custom Auth tokens.</li>
            <li>Automatic JSON mirroring.</li>
          </ul>
        </div>
      </div>

      {/* Use Case Section */}
      <div className="glass-panel" style={{ textAlign: 'center', background: 'var(--primary-light)', border: '1px solid rgba(79, 70, 229, 0.2)', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Built for Frontend Engineers</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto 24px auto', color: '#475569', fontSize: '14px', lineHeight: '1.6' }}>
          MirrorAPI eliminates the "waiting on backend" bottleneck. Test complex error states, 
          inspect Stripe webhooks, or prototype new features with zero friction.
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="glass-panel" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '24px' }}>Tech stack used to build this website</h2>
        <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px' }}>Backend</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '8px' }}>🐍 Django & Python</li>
              <li style={{ marginBottom: '8px' }}>📡 Django REST Framework</li>
              <li style={{ marginBottom: '8px' }}>🔌 Django Channels (WS)</li>
              <li>📑 Requests (API Mirroring)</li>
            </ul>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px' }}>Frontend</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '8px' }}>⚛️ React.js</li>
              <li style={{ marginBottom: '8px' }}>⚡ Vite</li>
              <li style={{ marginBottom: '8px' }}>🛣️ React Router</li>
              <li>📦 Axios</li>
            </ul>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px' }}>Design</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '8px' }}>🎨 Vanilla CSS 3</li>
              <li style={{ marginBottom: '8px' }}>✨ Premium Light Theme</li>
              <li style={{ marginBottom: '8px' }}>📐 Responsive Grid</li>
              <li>🎭 CSS Animations</li>
            </ul>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '64px', textAlign: 'center', paddingBottom: '32px', color: 'var(--text-muted)', fontSize: '12px' }}>
        MirrorAPI - Modern API Development Toolkit
      </footer>
    </div>
  );
}

export default Home;
