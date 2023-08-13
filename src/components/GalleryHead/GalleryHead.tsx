import { Link, useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

import { ALBUM_PATH } from '@/constants'
import { useGoogleUser } from '@/hooks/useRequests'
import { SingOutIcon } from '@assets/svg'
import PixLogo from '@assets/img/pix-logo.png'
import Button from '../Button/Button'

import './GalleryHead.scss'

export default function GalleryHead({
    sharedFolderId
}: {
    sharedFolderId: string
}) {
    const { data, isLoading } = useGoogleUser()
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/', { state: null, replace: true })
    }

    return (
        <div className='gallery-head'>
            <Link className='logo' to={ALBUM_PATH + sharedFolderId}>
                <img src={PixLogo} alt='pix logo' />
            </Link>
            <div className='user-info'>
                {isLoading ? (
                    <>
                        <Skeleton
                            className='user-avatar'
                            baseColor='rgba(230, 230, 230, 0.25)'
                        />
                        <div className='text'>
                            <Skeleton
                                height={20}
                                width={200}
                                count={2}
                                baseColor='rgba(230, 230, 230, 0.25)'
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <img className='user-avatar' src={data?.picture} />
                        <div className='text'>
                            <p>{data?.name}</p>
                            <p>{data?.email}</p>
                        </div>
                    </>
                )}
            </div>
            <Button
                className='logout-button'
                onClick={handleLogout}
                disabled={isLoading}
            >
                <SingOutIcon />
            </Button>
        </div>
    )
}
