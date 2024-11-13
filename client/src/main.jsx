import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {FirestoreProvider} from "./Store/FireStore.jsx"
ReactDOM.createRoot(document.getElementById('root')).render(
<FirestoreProvider>

  <App />
</FirestoreProvider>

)
