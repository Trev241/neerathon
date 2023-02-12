import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import Auth0ProviderWithNavigate from './Auth0ProviderWithNavigate';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

// Imprting customized Bootstrap styles
import './index.css';
import './custom.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <Navigation />
        <App />
        <Footer />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
