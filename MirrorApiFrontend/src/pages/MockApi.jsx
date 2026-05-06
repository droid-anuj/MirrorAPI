import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

function MockApi() {
  const [activeTab, setActiveTab] = useState('create'); // 'create' or 'clone'
  
  // --- Create State ---
  const [formData, setFormData] = useState({
    user_id: '',
    url_path: '',
    method: 'GET',
    status_code: 200,
    response_body: '{\n  "message": "Hello World"\n}'
  });

  // --- Clone State ---
  const [cloneData, setCloneData] = useState({
    external_url: '',
    user_id: '',
    url_path: '',
    method: 'GET',
    auth_token: '',
    custom_headers: '{\n  "Content-Type": "application/json"\n}',
    request_body: '{\n  "key": "value"\n}'
  });
  const [isCloning, setIsCloning] = useState(false);

  const [createdMock, setCreatedMock] = useState(null);

  // --- Debugger State ---
  const [apiTester, setApiTester] = useState({
    url: '',
    method: 'GET',
    body: '{\n  "key": "value"\n}'
  });
  const [apiTesterResult, setApiTesterResult] = useState(null);

  const handleCreateMock = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        status_code: parseInt(formData.status_code),
        response_body: JSON.parse(formData.response_body)
      };
      const res = await axios.post(`${API_URL}/create-endpoint/`, payload);
      setCreatedMock(res.data.mock_url);
      setApiTester(prev => ({ ...prev, url: res.data.mock_url, method: formData.method }));
    } catch (err) {
      alert("Error creating mock. Make sure JSON is valid.");
      console.error(err);
    }
  };

  const handleCloneMock = async (e) => {
    e.preventDefault();
    setIsCloning(true);
    try {
      const payload = {
        ...cloneData,
        custom_headers: JSON.parse(cloneData.custom_headers),
        request_body: ['POST', 'PUT', 'PATCH'].includes(cloneData.method) ? JSON.parse(cloneData.request_body) : null
      };
      const res = await axios.post(`${API_URL}/clone-endpoint/`, payload);
      setCreatedMock(res.data.mock_url);
      setApiTester(prev => ({ ...prev, url: res.data.mock_url, method: cloneData.method }));
    } catch (err) {
      alert(err.response?.data?.error || "Error cloning API. Make sure URLs and JSON are valid.");
      console.error(err);
    } finally {
      setIsCloning(false);
    }
  };

  const handleApiTest = async (e) => {
    e.preventDefault();
    if (!apiTester.url) return;
    try {
      let payload = undefined;
      if (['POST', 'PUT', 'PATCH'].includes(apiTester.method)) {
        payload = apiTester.body ? JSON.parse(apiTester.body) : {};
      }

      const res = await axios({
        method: apiTester.method,
        url: apiTester.url,
        data: payload
      });

      setApiTesterResult({
        status: res.status,
        data: res.data,
        error: false
      });
    } catch (err) {
      setApiTesterResult({
        status: err.response?.status || 'Error',
        data: err.response?.data || err.message,
        error: true
      });
    }
  };

  return (
    <div className="page-container fade-in">
      <div className="dashboard-grid">
        
        {/* LEFT COLUMN: Generation */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', gap: '20px', borderBottom: '1px solid var(--panel-border)', marginBottom: '24px' }}>
            <button 
              onClick={() => setActiveTab('create')}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: activeTab === 'create' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'create' ? '2px solid var(--primary)' : 'none',
                borderRadius: 0,
                padding: '10px 0'
              }}
            >
              Manual Create
            </button>
            <button 
              onClick={() => setActiveTab('clone')}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: activeTab === 'clone' ? 'var(--primary)' : 'var(--text-muted)',
                borderBottom: activeTab === 'clone' ? '2px solid var(--primary)' : 'none',
                borderRadius: 0,
                padding: '10px 0'
              }}
            >
              Clone External API
            </button>
          </div>

          {activeTab === 'create' ? (
            <form onSubmit={handleCreateMock}>
              <div className="form-group">
                <label>Namespace (User ID)</label>
                <input
                  value={formData.user_id}
                  onChange={e => setFormData({ ...formData, user_id: e.target.value })}
                  placeholder="e.g. dev-team" required
                />
              </div>
              <div className="form-group">
                <label>Path</label>
                <input
                  value={formData.url_path}
                  onChange={e => setFormData({ ...formData, url_path: e.target.value })}
                  placeholder="e.g. users/v1" required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Method</label>
                  <select value={formData.method} onChange={e => setFormData({ ...formData, method: e.target.value })}>
                    <option>GET</option>
                    <option>POST</option>
                    <option>PUT</option>
                    <option>DELETE</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <input
                    type="number"
                    value={formData.status_code}
                    onChange={e => setFormData({ ...formData, status_code: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Response Body (JSON)</label>
                <textarea
                  rows="6"
                  value={formData.response_body}
                  onChange={e => setFormData({ ...formData, response_body: e.target.value })}
                />
              </div>
              <button type="submit" className="primary-btn" style={{ width: '100%' }}>Create Mock</button>
            </form>
          ) : (
            <form onSubmit={handleCloneMock}>
              <div className="form-group">
                <label>External URL to Clone</label>
                <input
                  value={cloneData.external_url}
                  onChange={e => setCloneData({ ...cloneData, external_url: e.target.value })}
                  placeholder="https://api.example.com/data" required
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label>Namespace</label>
                  <input
                    value={cloneData.user_id}
                    onChange={e => setCloneData({ ...cloneData, user_id: e.target.value })}
                    placeholder="e.g. dev-team" required
                  />
                </div>
                <div className="form-group">
                  <label>Local Path</label>
                  <input
                    value={cloneData.url_path}
                    onChange={e => setCloneData({ ...cloneData, url_path: e.target.value })}
                    placeholder="e.g. cloned-api" required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Method</label>
                <select value={cloneData.method} onChange={e => setCloneData({ ...cloneData, method: e.target.value })}>
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>PATCH</option>
                </select>
              </div>
              <div className="form-group">
                <label>Auth Header (Optional)</label>
                <input
                  value={cloneData.auth_token}
                  onChange={e => setCloneData({ ...cloneData, auth_token: e.target.value })}
                  placeholder="Bearer your-token-here"
                />
              </div>
              <div className="form-group">
                <label>Additional Headers (JSON)</label>
                <textarea
                  rows="3"
                  value={cloneData.custom_headers}
                  onChange={e => setCloneData({ ...cloneData, custom_headers: e.target.value })}
                />
              </div>
              {['POST', 'PUT', 'PATCH'].includes(cloneData.method) && (
                <div className="form-group">
                  <label>Request Body to Send (JSON)</label>
                  <textarea
                    rows="3"
                    value={cloneData.request_body}
                    onChange={e => setCloneData({ ...cloneData, request_body: e.target.value })}
                  />
                </div>
              )}
              <button type="submit" className="primary-btn" style={{ width: '100%' }} disabled={isCloning}>
                {isCloning ? 'Cloning API...' : 'Clone & Create Mock'}
              </button>
            </form>
          )}

          {createdMock && (
            <div className="success-banner">
              <strong style={{ fontSize: '13px' }}>Live Mirror URL:</strong>
              <p className="url-text">{createdMock}</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Debugger */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ marginTop: 0, fontSize: '1.25rem', marginBottom: '8px' }}>API Debugger</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '24px' }}>
            Test your generated endpoints.
          </p>
          <form onSubmit={handleApiTest}>
            <div className="form-group" style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <div style={{ flex: '0 0 100px' }}>
                <label>Method</label>
                <select 
                  style={{ marginBottom: 0 }}
                  value={apiTester.method} 
                  onChange={e => setApiTester({...apiTester, method: e.target.value})}
                >
                  <option>GET</option>
                  <option>POST</option>
                  <option>PUT</option>
                  <option>DELETE</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <label>Target URL</label>
                <input 
                  style={{ marginBottom: 0 }}
                  value={apiTester.url} 
                  placeholder="Enter endpoint URL..."
                  onChange={e => setApiTester({...apiTester, url: e.target.value})}
                  required
                />
              </div>
            </div>

            {['POST', 'PUT'].includes(apiTester.method) && (
              <div className="form-group" style={{ marginTop: '16px' }}>
                <label>Request Body</label>
                <textarea 
                  rows="4"
                  value={apiTester.body}
                  onChange={e => setApiTester({...apiTester, body: e.target.value})}
                />
              </div>
            )}

            <button type="submit" className="primary-btn" style={{ width: '100%', marginTop: '16px' }}>Send Request</button>
          </form>

          <div style={{ flex: 1, marginTop: '24px' }}>
            {apiTesterResult ? (
              <div className="test-result-panel" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong style={{ fontSize: '13px', color: apiTesterResult.error ? 'var(--danger)' : 'var(--success)' }}>
                    {apiTesterResult.error ? 'Error' : 'Success'}
                  </strong>
                  <span className="status-badge">{apiTesterResult.status}</span>
                </div>
                <pre>{JSON.stringify(apiTesterResult.data, null, 2)}</pre>
              </div>
            ) : (
              <div className="empty-state">No request sent yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockApi;
