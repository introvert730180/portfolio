import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { applyTheme, getInitialTheme } from './lib/applyTheme'

// global styles (split by concern)
import './styles/base.css'
import './styles/utilities.css'

// write design tokens → CSS variables before first paint (no flash of
// the wrong theme); the ThemeProvider keeps them in sync afterwards.
applyTheme(getInitialTheme())

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
