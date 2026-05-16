import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Register service worker for PWA / offline support
serviceWorker.register({
  onUpdate: (registration) => {
    console.log('MapTDP: Mise à jour disponible');
  },
  onSuccess: (registration) => {
    console.log('MapTDP: Prêt pour le mode hors-ligne');
  },
});
