import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'

// Style imports
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css'
import './styles/global.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/projects.css'
import './styles/sertifikat.css'
import './styles/contact.css'
import './styles/modal.css'
import './styles/cursor.css'
import './styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)

