import { useState } from 'react'
import { useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useGoogleLogin, hasGrantedAllScopesGoogle } from '@react-oauth/google'

import { ALBUM_PATH, GOOGLE_SCOPES, ROOT_FOLDER } from '@/constants'
import { Modal, Button } from '@/components'
import { storageToken } from '@/utils'
import { GoogleIcon, XIcon, WarningIcon } from '@assets/svg'

import './HomePage.scss'

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { state } = useLocation()
    const navigate = useNavigate()

    const login = useGoogleLogin({
        onSuccess: tokenResponse => {
            const hasAccess = hasGrantedAllScopesGoogle(
                tokenResponse,
                GOOGLE_SCOPES[0],
                GOOGLE_SCOPES[1]
            )
            if (!hasAccess) {
                setIsModalOpen(true)
                return
            }

            const token = `${tokenResponse.token_type} ${tokenResponse.access_token}`
            localStorage.setItem('token', token)
            //@ts-ignore
            localStorage.setItem('authuser', tokenResponse.authuser)
            navigate(ALBUM_PATH + (state ? state : ROOT_FOLDER), {
                state: { expires_in: tokenResponse.expires_in },
                replace: true
            })
        },
        onError() {
            setIsModalOpen(true)
        },
        scope: GOOGLE_SCOPES.join(' ')
    })

    if (storageToken()) {
        return <Navigate to={ALBUM_PATH + ROOT_FOLDER} replace />
    }

    return (
        <div className='container'>
            <div className='paper'>
                <div className='home-page-container'>
                    <h1 className='title'>
                        Welcome{' '}
                        <span className='wrapper'>
                            <span className='middle-text'>to</span>{' '}
                            <span className='logo'>
                                <span>pi</span>
                                <XIcon />
                            </span>
                        </span>
                    </h1>
                    <Button
                        className='google-login-button'
                        onClick={() => login()}
                    >
                        <GoogleIcon />
                        <span>Sign in with Google</span>
                    </Button>
                    <h2 className='helper-text'>
                        quickly view photos and videos from your{' '}
                        <span>Google Drive</span>
                    </h2>
                </div>
            </div>
            <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
                <>
                    <WarningIcon />
                    <h2 className='modal-content-title'>Warning</h2>
                    <p className='modal-message'>
                        If you want to continue working with the application,
                        please{' '}
                        <span>
                            grant access to all listed actions with your Google
                            Drive
                        </span>
                        .
                    </p>
                </>
            </Modal>
        </div>
    )
}
