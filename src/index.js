import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

console.log('Index.js loaded');

const container = document.getElementById('chrome-extension-root');
if (container) {
  console.log('Found chrome-extension-root');
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('chrome-extension-root not found');
}
