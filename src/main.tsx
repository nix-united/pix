import { GoogleOAuthProvider } from '@react-oauth/google'
import ReactDOM from 'react-dom/client'

import { RootRouter } from './routes/RootRouter'

import '@/styles/index.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <RootRouter />
    </GoogleOAuthProvider>
    // </React.StrictMode>
)
