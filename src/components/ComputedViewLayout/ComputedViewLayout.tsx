import { PhotoAlbum } from 'react-photo-album'

import { TMediaFile } from '@/types'
import MediaItem from '../MediaItem/MediaItem'

interface IComputedViewLayoutProps {
    viewType: 'rows' | 'columns'
    mediaFiles: TMediaFile[]
}

export default function ComputedViewLayout({
    viewType,
    mediaFiles
}: IComputedViewLayoutProps) {
    return (
        <PhotoAlbum
            layout={viewType}
            photos={mediaFiles}
            targetRowHeight={280}
            spacing={10}
            renderPhoto={({ photo, wrapperStyle }) => (
                <MediaItem
                    key={photo.id}
                    mediaFile={photo}
                    wrapperStyle={wrapperStyle}
                />
            )}
        />
    )
}
