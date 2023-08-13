import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Gallery } from 'react-photoswipe-gallery'
import Skeleton from 'react-loading-skeleton'
import clsx from 'clsx'

import { TDriveMediaFile, TMediaFile } from '@/types'
import { googleRoutes } from '@/api/paths'
import { useDriveMediaFiles } from '@/hooks/useRequests'
import { usePswpUiElements } from '@/hooks/usePswpUiElements'
import {
    RowsIcon,
    ColumnsIcon,
    GridIcon,
    CameraIcon,
    XDarkIcon
} from '@assets/svg'
import { getUrlParam } from '@/utils'
import { $google } from '@/api/axios'
import ComputedViewLayout from '../ComputedViewLayout/ComputedViewLayout'
import GridViewLayout from '../GridViewLayout/GridViewLayout'
import Button from '../Button/Button'

import './GalleryMedia.scss'

type MediaView = 'rows' | 'columns' | 'grid'

const VIEW_ICONS: { icon: JSX.Element; type: MediaView }[] = [
    { icon: <RowsIcon />, type: 'rows' },
    { icon: <ColumnsIcon />, type: 'columns' },
    { icon: <GridIcon />, type: 'grid' }
]

const fetchMediaFile = async (pid: string) => {
    const { data } = await $google.get<TDriveMediaFile & { parents: string[] }>(
        `${googleRoutes.folderContent}/${pid}?fields=id,parents,size,createdTime,thumbnailLink,videoMediaMetadata,imageMediaMetadata(height,width)`,
        {
            params: {
                supportsAllDrives: true,
                includeItemsFromAllDrives: true
            },
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }
    )
    return data
}

export default function GalleryMedia({ folderId }: { folderId: string }) {
    const [mediaView, setMediaView] = useState<MediaView>('rows')
    const [fileFromUrl, setFileFromUrl] = useState<TMediaFile | null>(null)
    const { data, isLoading, size, setSize } = useDriveMediaFiles(folderId)
    const uiElements = usePswpUiElements(data ? data[0].files.length : 0)
    const pid = getUrlParam({ param: 'pid' })
    const navigate = useNavigate()

    useEffect(() => {
        const getFile = async () => {
            try {
                const data = await fetchMediaFile(pid as string)
                const {
                    thumbnailLink,
                    imageMediaMetadata,
                    videoMediaMetadata,
                    parents,
                    ...other
                } = data

                if (parents[0] !== folderId) {
                    navigate(window.location.pathname)
                    return
                }

                const viewLink = videoMediaMetadata
                    ? `https://drive.google.com/file/d/${other.id}/preview`
                    : thumbnailLink.split('=')[0]
                const src = thumbnailLink.replace('s220', 's420')

                setFileFromUrl({
                    ...other,
                    ...imageMediaMetadata,
                    ...videoMediaMetadata,
                    src,
                    viewLink
                })
            } catch (err) {
                navigate(window.location.pathname)
            }
        }
        if (pid) getFile()
    }, [pid])

    useEffect(() => {
        let isFetching = false
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const handleScroll = (e: any) => {
            const { scrollHeight, scrollTop, clientHeight } =
                e.target.scrollingElement

            if (scrollHeight - scrollTop <= clientHeight * 3) {
                if (!isFetching && data && data.at(-1)?.nextPageToken) {
                    setSize(size + 1)
                    isFetching = true
                }
            }
        }

        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [data])

    const newMediaFiles = useMemo(() => {
        const modifiedData = data
            ? data
                  .flatMap(page => page.files)
                  .filter(
                      file =>
                          !(
                              !file?.thumbnailLink ||
                              (file.videoMediaMetadata &&
                                  !file.videoMediaMetadata.width)
                          )
                  )
                  .map(file => {
                      const {
                          id,
                          imageMediaMetadata,
                          videoMediaMetadata,
                          thumbnailLink,
                          ...other
                      } = file
                      const viewLink = file.videoMediaMetadata
                          ? `https://drive.google.com/file/d/${id}/preview`
                          : file.thumbnailLink.split('=')[0]
                      const src = thumbnailLink.replace('s220', 's420')

                      return {
                          id,
                          src,
                          viewLink,
                          ...imageMediaMetadata,
                          ...videoMediaMetadata,
                          ...other
                      }
                  })
            : []
        return modifiedData
    }, [data])

    const mediaFilesData = useMemo(
        () =>
            newMediaFiles ? ([] as TMediaFile[]).concat(...newMediaFiles) : [],
        [newMediaFiles]
    )

    return (
        <>
            <div className='gallery-media'>
                <div className='media-head'>
                    <div className='media-title'>
                        <CameraIcon />
                        <p>
                            Media{' '}
                            {(mediaFilesData?.length as number) > 0
                                ? `(${mediaFilesData?.length}${
                                      data?.at(-1)?.nextPageToken ? '+' : ''
                                  })`
                                : null}
                        </p>
                    </div>
                    <ul className='view-buttons-wrapper'>
                        {VIEW_ICONS.map((el, index) => (
                            <li key={index}>
                                <Button
                                    className={clsx(
                                        'view-button',
                                        el.type === mediaView &&
                                            mediaFilesData?.length &&
                                            'active'
                                    )}
                                    onClick={() => setMediaView(el.type)}
                                    disabled={
                                        el.type === mediaView ||
                                        !mediaFilesData?.length
                                    }
                                >
                                    {el.icon}
                                </Button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='divider' />
                <div className='media-body'>
                    {isLoading ? (
                        <ul className='media-skeleton'>
                            {Array(6)
                                .fill(0)
                                .map((_, index) => (
                                    <li
                                        key={index}
                                        className='media-skeleton-item'
                                    >
                                        <Skeleton
                                            borderRadius='0.4em'
                                            baseColor='rgba(210, 210, 210)'
                                            style={{
                                                minHeight: '250px',
                                                height: '100%'
                                            }}
                                        />
                                    </li>
                                ))}
                        </ul>
                    ) : mediaFilesData.length > 0 ? (
                        <Gallery
                            id='my-gallery'
                            withCaption
                            uiElements={uiElements}
                            options={{
                                loop: false,
                                zoom: false,
                                wheelToZoom: true,
                                errorMsg: 'Media file cannot be loaded',
                                closeSVG:
                                    '<svg aria-hidden="true" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-close"/><path d="M14 1L1 14M14 14L1 1" stroke="white" stroke-width="2" stroke-linecap="round" id="pswp__icn-close"/></svg>'
                            }}
                        >
                            {mediaView !== 'grid' ? (
                                <>
                                    <ComputedViewLayout
                                        mediaFiles={
                                            fileFromUrl &&
                                            pid === fileFromUrl?.id
                                                ? [
                                                      ...mediaFilesData,
                                                      fileFromUrl
                                                  ]
                                                : mediaFilesData
                                        }
                                        viewType={mediaView}
                                    />
                                </>
                            ) : (
                                <>
                                    <GridViewLayout
                                        mediaFiles={
                                            fileFromUrl &&
                                            pid === fileFromUrl?.id
                                                ? [fileFromUrl]
                                                : mediaFilesData
                                        }
                                    />
                                </>
                            )}
                        </Gallery>
                    ) : (
                        <div className='media-empty'>
                            <XDarkIcon />
                            <p>There are nothing here</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
