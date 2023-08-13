import { Tooltip } from 'react-tooltip'

import { TDriveFolder } from '@/types'
import { FolderIcon } from '@assets/svg'
import Button from '../Button/Button'

import './FoldersItem.scss'

interface IFolderItemProps {
    folder: TDriveFolder
    handleFolderClick: (id: string) => void
}

export default function FolderItem({
    folder,
    handleFolderClick
}: IFolderItemProps) {
    return (
        <li className='folder-wrapper'>
            <Button
                className='folder'
                onClick={() => handleFolderClick(folder.id)}
                id={`folder-tooltip-${folder.id}`}
            >
                <FolderIcon className='button-svg' />
                <span>{folder.name}</span>
            </Button>
            <Tooltip
                anchorSelect={`#folder-tooltip-${folder.id}`}
                className='tooltip default'
                delayShow={1000}
            >
                <p>{folder.name}</p>
                <p>{new Date(folder.createdTime).toLocaleDateString()}</p>
            </Tooltip>
        </li>
    )
}
