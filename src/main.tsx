import { Component, StrictMode, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const root = document.getElementById('root')!;
const box = (m: string) =>
  `<pre style="white-space:pre-wrap;padding:16px;font:12px monospace;color:#b00020">${m.replace(/</g, '&lt;')}</pre>`;

class Boundary extends Component<{ children: ReactNode }, { err: Error | null }> {
  state = { err: null as Error | null };
  static getDerivedStateFromError(err: Error) { return { err }; }
  render() {
    return this.state.err
      ? <pre style={{ whiteSpace: 'pre-wrap', padding: 16, font: '12px monospace', color: '#b00020' }}>{String(this.state.err.stack || this.state.err)}</pre>
      : this.props.children;
  }
}

window.addEventListener('error', (e) => { root.innerHTML = box(String(e.error?.stack || e.message)); });
window.addEventListener('unhandledrejection', (e) => { root.innerHTML = box(String(e.reason?.stack || e.reason)); });

import('./App')
  .then(({ default: App }) => createRoot(root).render(<StrictMode><Boundary><App /></Boundary></StrictMode>))
  .catch((e) => { root.innerHTML = box(String(e?.stack || e)); });
