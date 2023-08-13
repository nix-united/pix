import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactDOM from 'react-dom/client'

import { App } from './App'

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-tooltip/dist/react-tooltip.css'
import 'photoswipe/dist/photoswipe.css'
import '@/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
    </GoogleOAuthProvider>
)
