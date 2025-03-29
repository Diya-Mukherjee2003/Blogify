import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './App.css'; // Corrected import path
import App from './App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import State from './context/State.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <State>
        <App />
      </State>
    </Router>
  </StrictMode>
);