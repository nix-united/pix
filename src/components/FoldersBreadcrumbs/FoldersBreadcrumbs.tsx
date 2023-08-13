import { Tooltip } from 'react-tooltip'
import Skeleton from 'react-loading-skeleton'
import clsx from 'clsx'

import { TBreadcrumb } from '@/types'
import { ROOT_FOLDER } from '@/constants'
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { FoldersBreadcrumbsMenu } from '../FoldersBreadcrumbsMenu/FoldersBreadcrumbsMenu'
import { HomeIcon } from '@assets/svg'
import Button from '../Button/Button'

import './FoldersBreadcrumbs.scss'

export default function FoldersBreadcrumbs({
    folderId,
    handleBreadcrumbClick
}: {
    folderId: string
    handleBreadcrumbClick: (id: string) => void
}) {
    const { breadcrumbs, isBreadcrumbsLoading } = useBreadcrumbs(folderId)
    const shortBreadcrumbs =
        breadcrumbs && breadcrumbs.length > 3
            ? [...breadcrumbs.slice(0, 1), '...', breadcrumbs.at(-1)]
            : breadcrumbs

    return (
        <ul className='breadcrumbs'>
            {isBreadcrumbsLoading ? (
                <div className='breadcrumbs-skeleton'>
                    <Skeleton
                        borderRadius='0.4em'
                        baseColor='rgba(230, 230, 230, 0.25)'
                        height={40}
                        width={300}
                    />
                </div>
            ) : (
                <>
                    {shortBreadcrumbs?.map((el, index) => {
                        if ((el as TBreadcrumb).id === ROOT_FOLDER) {
                            return (
                                <li
                                    key={(el as TBreadcrumb).id}
                                    className='breadcrumbs-item'
                                >
                                    <Button
                                        className='breadcrumbs-home-button'
                                        onClick={() =>
                                            handleBreadcrumbClick(
                                                (el as TBreadcrumb).id
                                            )
                                        }
                                        disabled={folderId === ROOT_FOLDER}
                                    >
                                        <HomeIcon />
                                        <span>{(el as TBreadcrumb).name}</span>
                                    </Button>
                                </li>
                            )
                        }

                        if (typeof el === 'string') {
                            return (
                                <li key={index} className='breadcrumbs-item'>
                                    <p className='breadcrumbs-divider'>/</p>
                                    <FoldersBreadcrumbsMenu
                                        breadcrumbs={breadcrumbs?.slice(1, -1)}
                                        handleBreadcrumbClick={
                                            handleBreadcrumbClick
                                        }
                                    />
                                </li>
                            )
                        }

                        return (
                            <li
                                key={el!.id}
                                className={clsx(
                                    'breadcrumbs-item',
                                    folderId === el!.id && 'active'
                                )}
                            >
                                {breadcrumbs &&
                                breadcrumbs[0].id === el!.id &&
                                breadcrumbs[0].id !== ROOT_FOLDER ? null : (
                                    <p className='breadcrumbs-divider'>/</p>
                                )}
                                <span id={`breadcrumb-${el!.id}`}>
                                    <Button
                                        className={clsx(
                                            'breadcrumbs-item-button',
                                            folderId === el!.id &&
                                                'breadcrumb-active'
                                        )}
                                        onClick={() =>
                                            handleBreadcrumbClick(el!.id)
                                        }
                                        disabled={folderId === el!.id}
                                    >
                                        <span>{el!.name}</span>
                                    </Button>
                                </span>
                                <Tooltip
                                    anchorSelect={`#breadcrumb-${el!.id}`}
                                    className='tooltip default'
                                    delayShow={1000}
                                >
                                    <p>{el!.name}</p>
                                </Tooltip>
                            </li>
                        )
                    })}
                </>
            )}
        </ul>
    )
}
