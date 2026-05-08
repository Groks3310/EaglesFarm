import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import './index.css'
import App from './App.jsx'

// Use Railway URL in production, localhost in development
const API_URL = import.meta.env.DEV 
  ? 'http://localhost:5001' 
  : 'https://eaglesfarm-production.up.railway.app';

axios.defaults.baseURL = API_URL;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)