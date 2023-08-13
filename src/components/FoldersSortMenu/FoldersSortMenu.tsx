import { Dispatch, SetStateAction, forwardRef } from 'react'
import clsx from 'clsx'

import { TSortOptions, TSortType } from '@/types'
import { SORT_TYPES } from '@/constants'
import { withComponentVisibility } from '@/HOCs/withComponentVisibility'
import { SortOrderIcon, ArrowDownIcon } from '@assets/svg'
import Menu from '../Menu/Menu'
import Button from '../Button/Button'

import './FoldersSortMenu.scss'

interface IFoldersSortMenuProps {
    isLoading: boolean
    foldersLength: number
    sortOptions: TSortOptions
    handleFoldersSort: ({ name, type }: TSortType) => void
    setIsComponentVisible: Dispatch<SetStateAction<boolean>>
    isComponentVisible: boolean
}

type Ref = HTMLDivElement

export const SortMenu = forwardRef<Ref, IFoldersSortMenuProps>(
    (
        {
            isLoading,
            foldersLength,
            sortOptions,
            handleFoldersSort,
            setIsComponentVisible,
            isComponentVisible
        },
        ref
    ) => {
        const foldersSortClick = (sortParams: TSortType) => {
            handleFoldersSort({ ...sortParams })
            setIsComponentVisible(false)
        }

        return (
            <Menu
                containerName='sort-menu-container'
                buttonClassName='sort-button'
                buttonDisabled={isLoading || (foldersLength <= 1 && true)}
                buttonChildren={<SortOrderIcon className='button-svg' />}
                menuClassName='sort-menu'
                isComponentVisible={isComponentVisible}
                setIsComponentVisible={setIsComponentVisible}
                ref={ref}
            >
                <>
                    {SORT_TYPES.map(({ name, type }, index) => (
                        <li key={index}>
                            <Button
                                className={clsx(
                                    'menu-item',
                                    type === sortOptions.type && 'active-item'
                                )}
                                onClick={() => foldersSortClick({ name, type })}
                            >
                                <ArrowDownIcon
                                    className={clsx(
                                        type === sortOptions.type &&
                                            'show-order',
                                        sortOptions.order === 'asc'
                                            ? 'asc'
                                            : 'desc'
                                    )}
                                />
                                <span>{name}</span>
                            </Button>
                        </li>
                    ))}
                </>
            </Menu>
        )
    }
)

export const FoldersSortMenu = withComponentVisibility(SortMenu)
