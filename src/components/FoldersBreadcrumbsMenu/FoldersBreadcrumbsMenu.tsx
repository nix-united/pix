import { Dispatch, SetStateAction, forwardRef } from 'react'

import { TBreadcrumb } from '@/types'
import { withComponentVisibility } from '@/HOCs/withComponentVisibility'
import { FolderIcon, DotsIcon } from '@assets/svg'
import Button from '../Button/Button'
import Menu from '../Menu/Menu'

import './FoldersBreadcrumbsMenu.scss'

interface IFoldersBreadcrumbsMenuProps {
    breadcrumbs: TBreadcrumb[]
    isComponentVisible: boolean
    setIsComponentVisible: Dispatch<SetStateAction<boolean>>
    handleBreadcrumbClick: (id: string) => void
}

type Ref = HTMLDivElement

export const BreadcrumbsMenu = forwardRef<Ref, IFoldersBreadcrumbsMenuProps>(
    (
        {
            breadcrumbs,
            isComponentVisible,
            setIsComponentVisible,
            handleBreadcrumbClick
        },
        ref
    ) => {
        return (
            <Menu
                containerName='breadcrumbs-menu-container'
                buttonClassName='more-button'
                buttonChildren={<DotsIcon />}
                menuClassName='breadcrumbs-menu'
                isComponentVisible={isComponentVisible}
                setIsComponentVisible={setIsComponentVisible}
                ref={ref}
            >
                <>
                    {breadcrumbs.map(el => (
                        <li key={el.id} id={`breadcrumb-${el.id}`}>
                            <Button
                                className='breadcrumbs-menu-folder'
                                onClick={() => handleBreadcrumbClick(el.id)}
                            >
                                <FolderIcon />
                                <span title={el.name}>{el.name}</span>
                            </Button>
                        </li>
                    ))}
                </>
            </Menu>
        )
    }
)

export const FoldersBreadcrumbsMenu = withComponentVisibility(BreadcrumbsMenu)
