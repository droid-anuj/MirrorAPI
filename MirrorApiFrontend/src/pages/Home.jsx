import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="page-container fade-in">
      {/* Hero Section */}
      <header className="header" style={{ marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px auto', textAlign: 'center' }}>
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

      {/* Modern Features Section (No Cards) */}
      <section style={{ marginBottom: '80px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '48px',
          padding: '0 20px'
        }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>🌐</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: '600' }}>Dynamic Mock APIs</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Instantly define HTTP endpoints with custom paths and JSON responses. 
            </p>
            <ul style={{ paddingLeft: '18px', margin: 0, color: '#475569', fontSize: '13px', lineHeight: '1.8' }}>
              <li>Custom namespaces for teams.</li>
              <li>Support for GET, POST, PUT, DELETE.</li>
              <li>Instant JSON validation.</li>
            </ul>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>⚡</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: '600' }}>Live Webhook Catcher</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Debug third-party integrations in real-time via WebSockets.
            </p>
            <ul style={{ paddingLeft: '18px', margin: 0, color: '#475569', fontSize: '13px', lineHeight: '1.8' }}>
              <li>Real-time payload inspection.</li>
              <li>Persistent webhook IDs.</li>
              <li>Simulate payloads with one click.</li>
            </ul>
          </div>

          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '24px', marginBottom: '16px' }}>👯</div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', fontWeight: '600' }}>API Cloning</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
              Mirror existing external APIs for local development.
            </p>
            <ul style={{ paddingLeft: '18px', margin: 0, color: '#475569', fontSize: '13px', lineHeight: '1.8' }}>
              <li>Bypass rate limits of external APIs.</li>
              <li>Support for custom Auth tokens.</li>
              <li>Automatic JSON mirroring.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Use Case Section */}
      <div className="glass-panel" style={{ textAlign: 'center', background: 'var(--primary-light)', border: '1px solid rgba(79, 70, 229, 0.2)', marginBottom: '48px', padding: '40px' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '16px' }}>Built for Frontend Engineers</h2>
        <p style={{ maxWidth: '700px', margin: '0 auto 24px auto', color: '#475569', fontSize: '15px', lineHeight: '1.7' }}>
          MirrorAPI eliminates the "waiting on backend" bottleneck. Test complex error states, 
          inspect Stripe webhooks, or prototype new features with zero friction.
        </p>
      </div>

      {/* Tech Stack Section */}
      <div className="glass-panel" style={{ textAlign: 'center', padding: '40px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '32px' }}>Tech stack used to build this website</h2>
        <div style={{ display: 'flex', gap: '60px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px', fontWeight: '700' }}>Backend</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '8px' }}>🐍 Django & Python</li>
              <li style={{ marginBottom: '8px' }}>📡 Django REST Framework</li>
              <li style={{ marginBottom: '8px' }}>🔌 Django Channels (WS)</li>
              <li>📑 Requests (API Mirroring)</li>
            </ul>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px', fontWeight: '700' }}>Frontend</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '8px' }}>⚛️ React.js</li>
              <li style={{ marginBottom: '8px' }}>⚡ Vite</li>
              <li style={{ marginBottom: '8px' }}>🛣️ React Router</li>
              <li>📦 Axios</li>
            </ul>
          </div>
          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--primary)', marginBottom: '12px', fontWeight: '700' }}>Design</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>
              <li style={{ marginBottom: '8px' }}>🎨 Vanilla CSS 3</li>
              <li style={{ marginBottom: '8px' }}>✨ Premium Light Theme</li>
              <li style={{ marginBottom: '8px' }}>📐 Responsive Grid</li>
              <li>🎭 CSS Animations</li>
            </ul>
          </div>
        </div>
      </div>

      <footer style={{ marginTop: '80px', textAlign: 'center', paddingBottom: '40px', color: 'var(--text-muted)', fontSize: '13px' }}>
        MirrorAPI - Modern API Development Toolkit
      </footer>
    </div>
  );
}

export default Home;
