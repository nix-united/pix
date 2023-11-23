import { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate, useParams } from 'react-router-dom'

import { $google } from '@/api/axios'
import { googleRoutes } from '@/api/paths'
import { storageToken } from '@/utils'

type TGoogleTokenResponse = {
    issued_to: string
    audience: string
    user_id: string
    scope: string
    expires_in: number
    email: string
    access_type: string
}

export default function PrivateRoute() {
    const [isTokenLoading, setIsTokenLoading] = useState(true)
    const { folderId } = useParams()
    const navigate = useNavigate()
    let timeout: ReturnType<typeof setTimeout>

    useEffect(() => {
        const logout = (replace: boolean) => {
            localStorage.clear()
            navigate('/', { state: folderId, replace })
        }

        const validateUserToken = async () => {
            try {
                const { data } = await $google.get<TGoogleTokenResponse>(
                    googleRoutes.validateToken
                )
                setIsTokenLoading(false)

                timeout = setTimeout(
                    () => logout(false),
                    data.expires_in * 1000
                )

                return () => {
                    clearTimeout(timeout)
                }
            } catch (err) {
                logout(true)
            }
        }

        validateUserToken()

        return () => {
            clearTimeout(timeout)
        }
    }, [folderId])

    if (!storageToken()) {
        return <Navigate to={'/'} replace />
    }

    return !isTokenLoading ? <Outlet /> : null
}
