import { TMediaFile } from '@/types'
import MediaItem from '../MediaItem/MediaItem'

import './GridViewLayout.scss'

export default function GridViewLayout({
    mediaFiles
}: {
    mediaFiles: TMediaFile[]
}) {
    return (
        <div className='grid-view'>
            {mediaFiles.map(file => {
                return <MediaItem key={file.id} mediaFile={file} />
            })}
        </div>
    )
}
