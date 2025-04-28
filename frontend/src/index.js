import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './components/Auth/AuthContext';
import "./style/main.css"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
<AuthProvider>
  <App />
</AuthProvider>
);


