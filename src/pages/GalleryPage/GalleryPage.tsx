import { Navigate, useParams } from 'react-router-dom'

import { ALBUM_PATH, ROOT_FOLDER } from '@/constants'
import { useDriveFolder } from '@/hooks/useRequests'
import {
    FullscreenLoader,
    GalleryHead,
    GalleryFolders,
    GalleryMedia,
    ScrollToTopButton
} from '@/components'

import './GalleryPage.scss'

export default function GalleryPage() {
    const { folderId } = useParams()
    const { data, error } = useDriveFolder(folderId)

    if (!data && !error) {
        return <FullscreenLoader />
    }

    if (data?.trashed || error) {
        return <Navigate to={ALBUM_PATH + ROOT_FOLDER} replace />
    }
    const iframeStatus = window.self == window.top

    if (iframeStatus)
        return (
            <div className='gallery-container'>
                <ScrollToTopButton />
                <div className='gallery'>
                    <GalleryHead sharedFolderId={ROOT_FOLDER} />
                    <GalleryFolders folderId={folderId as string} />
                    <GalleryMedia folderId={folderId as string} />
                </div>
            </div>
        )
    else {
        const html = document.documentElement
        html.style.background = 'white'
        return (
            <div className='gallery-container'>
                <ScrollToTopButton />
                <div className='gallery iframeStyle'>
                    <GalleryMedia folderId={folderId as string} />
                </div>
            </div>
        )
    }
}
