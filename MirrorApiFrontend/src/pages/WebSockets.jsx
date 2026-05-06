import { useState, useRef } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';
const WS_URL = import.meta.env.VITE_WS_URL || 'ws://127.0.0.1:8000/ws/webhook';

// Separate component for log entries to handle local "showHeaders" state
function WebhookLogEntry({ log }) {
  const [showHeaders, setShowHeaders] = useState(false);

  return (
    <div className="webhook-log fade-in">
      <div style={{ marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
           <div style={{ color: 'var(--success)', marginBottom: '4px', fontSize: '11px', fontWeight: '800', letterSpacing: '0.05em' }}>
              PAYLOAD
           </div>
           <button className="header-toggle-btn" onClick={() => setShowHeaders(!showHeaders)}>
             {showHeaders ? 'Hide Headers' : 'Show Headers'}
           </button>
        </div>
        
        {showHeaders && (
          <div style={{ marginTop: '8px', marginBottom: '16px' }}>
             <pre style={{ maxHeight: '200px', overflow: 'auto', background: '#f8fafc', fontSize: '11px' }}>
               {JSON.stringify(log.headers || {}, null, 2)}
             </pre>
          </div>
        )}
        
        <pre>{JSON.stringify(log.payload || log, null, 2)}</pre>
      </div>
    </div>
  );
}

function WebSockets() {
  const [listenId, setListenId] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [webhookLogs, setWebhookLogs] = useState([]);
  const wsRef = useRef(null);

  const [testPayload, setTestPayload] = useState('{\n  "event": "test.event",\n  "data": "Hello World"\n}');
  const [testMethod, setTestMethod] = useState('POST');

  const toggleListen = () => {
    if (isListening) {
      wsRef.current?.close();
      setIsListening(false);
    } else {
      if (!listenId) return alert("Please enter an ID to listen to");
      const ws = new WebSocket(`${WS_URL}/${listenId}/`);
      ws.onopen = () => setIsListening(true);
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setWebhookLogs(prev => [data, ...prev]);
      };
      ws.onclose = () => setIsListening(false);
      wsRef.current = ws;
    }
  };

  const sendCustomWebhook = async (e) => {
    e.preventDefault();
    if (!listenId) return;
    try {
      let data = undefined;
      if (['POST', 'PUT'].includes(testMethod)) data = JSON.parse(testPayload);
      await axios({ method: testMethod, url: `${API_URL}/webhook/${listenId}/`, data });
    } catch (err) {
      alert("Error sending webhook. Verify JSON.");
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="dashboard-grid">
        {/* STICKY SIDEBAR */}
        <div className="sticky-sidebar">
          <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ marginTop: 0, fontSize: '1.25rem', marginBottom: '8px' }}>Webhook Inspector</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
              Monitor incoming payloads in real-time.
            </p>

            <div className="form-group" style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <label>Webhook ID</label>
                <input
                  style={{ marginBottom: 0 }}
                  value={listenId}
                  onChange={e => setListenId(e.target.value)}
                  placeholder="e.g. orders-stream"
                  disabled={isListening}
                />
              </div>
              <button
                type="button"
                onClick={toggleListen}
                className="primary-btn"
                style={{ padding: '10px 24px', background: isListening ? 'var(--danger)' : 'var(--primary)' }}
              >
                {isListening ? 'Stop' : 'Connect'}
              </button>
            </div>

            {isListening && (
              <div className="active-connection-panel" style={{ marginTop: '16px' }}>
                <div style={{ fontSize: '13px', color: '#15803d', fontWeight: '600', marginBottom: '12px' }}>
                  <span className="status-indicator"></span> Connected
                </div>
                
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>WEBHOOK URL</label>
                  <p className="url-text" style={{ fontSize: '12px', marginTop: '4px' }}>
                    {API_URL}/webhook/{listenId}/
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700' }}>WEBSOCKET URL</label>
                  <p className="url-text" style={{ fontSize: '12px', marginTop: '4px', background: 'var(--primary-light)', color: 'var(--primary)', borderColor: 'var(--panel-border)' }}>
                    {WS_URL}/{listenId}/
                  </p>
                </div>
              </div>
            )}

            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid var(--panel-border)' }}>
               <h3 style={{ margin: '0 0 16px 0', fontSize: '14px' }}>Simulate Webhook</h3>
               <form onSubmit={sendCustomWebhook}>
                 <div className="form-group">
                   <label>Method</label>
                   <select value={testMethod} onChange={e => setTestMethod(e.target.value)}>
                      <option>POST</option>
                      <option>GET</option>
                      <option>PUT</option>
                   </select>
                 </div>
                 
                 {['POST', 'PUT'].includes(testMethod) && (
                   <div className="form-group">
                     <label>JSON Body</label>
                     <textarea
                       rows="4"
                       value={testPayload}
                       onChange={e => setTestPayload(e.target.value)}
                     />
                   </div>
                 )}

                 <button type="submit" className="primary-btn" style={{ width: '100%' }} disabled={!listenId}>
                   Push Message
                 </button>
               </form>
            </div>
          </div>
        </div>

        {/* LOG SECTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel">
            <h2 style={{ marginTop: 0, fontSize: '1.25rem', marginBottom: '8px' }}>Live Logs</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
              Incoming WebSocket events.
            </p>

            <div style={{ flex: 1 }}>
              {webhookLogs.length === 0 ? (
                <div className="empty-state">Waiting for events...</div>
              ) : (
                webhookLogs.map((log, index) => (
                  <WebhookLogEntry key={index} log={log} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebSockets;
