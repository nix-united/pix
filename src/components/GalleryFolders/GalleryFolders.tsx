import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'
import clsx from 'clsx'

import { TSortOptions, TSortType } from '@/types'
import { ALBUM_PATH, SORT_TYPES } from '@/constants'
import { useDriveFolders } from '@/hooks/useRequests'
import { FoldersSortMenu } from '../FoldersSortMenu/FoldersSortMenu'
import FolderItem from '../FoldersItem/FoldersItem'
import FoldersBreadcrumbs from '../FoldersBreadcrumbs/FoldersBreadcrumbs'
import CopyURLButton from '../CopyURLButton/CopyURLButton'

import './GalleryFolders.scss'

export default function GalleryFolders({ folderId }: { folderId: string }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [sortOptions, setSortOptions] = useState<TSortOptions>({
        ...SORT_TYPES[0],
        order: 'desc'
    })
    const { data, isLoading } = useDriveFolders({
        folderId,
        sortOptions
    })
    const navigate = useNavigate()

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>

        if ((data?.files.length as number) === 0) {
            timeout = setTimeout(() => setIsCollapsed(true), 1500)

            return () => {
                clearTimeout(timeout)
            }
        }

        setIsCollapsed(false)
    }, [data])

    const handleFoldersSort = ({ name, type }: TSortType) => {
        if (sortOptions.type === type) {
            setSortOptions({
                ...sortOptions,
                order: sortOptions.order === 'asc' ? 'desc' : 'asc'
            })
            return
        }

        setSortOptions({ ...sortOptions, name, type })
    }

    const handleFolderClick = (id: string) => {
        navigate(ALBUM_PATH + id)
    }

    return (
        <div className='gallery-folders'>
            <div className='folders-head'>
                <FoldersBreadcrumbs
                    folderId={folderId}
                    handleBreadcrumbClick={handleFolderClick}
                />
                <div className='folders-action-buttons'>
                    <CopyURLButton />
                    <FoldersSortMenu
                        isLoading={isLoading}
                        foldersLength={data?.files.length as number}
                        sortOptions={sortOptions}
                        handleFoldersSort={handleFoldersSort}
                    />
                </div>
            </div>
            <div className={clsx('wrapper', isCollapsed && 'collapsed')}>
                <div className='divider'>
                    {(data?.files.length as number) > 2 ? (
                        <p className='folders-count'>{data?.files.length}</p>
                    ) : null}
                </div>
                <div className='folders-wrapper'>
                    {isLoading ? (
                        <ul className='folders-list'>
                            {Array(8)
                                .fill(0)
                                .map((_, index) => (
                                    <li key={index} className='skeleton-item'>
                                        <Skeleton
                                            borderRadius='0.4em'
                                            baseColor='rgba(230, 230, 230, 0.25)'
                                            height={44}
                                        />
                                    </li>
                                ))}
                        </ul>
                    ) : (data?.files.length as number) > 0 ? (
                        <ul className='folders-list'>
                            {data?.files.map(folder => (
                                <FolderItem
                                    key={folder.id}
                                    folder={folder}
                                    handleFolderClick={handleFolderClick}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p className='empty-folders-list'>
                            This folder does not contain other folders
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}
