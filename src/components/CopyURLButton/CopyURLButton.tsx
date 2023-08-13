import { useState } from 'react'
import { Tooltip } from 'react-tooltip'

import { copyURL } from '@/utils'
import { LinkIcon } from '@assets/svg'
import Button from '../Button/Button'

import './CopyURLButton.scss'

export default function CopyURLButton() {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyClick = () => {
        copyURL()
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1500)
    }

    return (
        <>
            <Button
                id='copy-btn'
                className='copy-link-button'
                onClick={handleCopyClick}
                disabled={isCopied}
            >
                <LinkIcon />
            </Button>
            <Tooltip
                anchorSelect='#copy-btn'
                isOpen={isCopied}
                place='left'
                content='Link to folder is copied'
                className='tooltip success'
                openOnClick
            />
        </>
    )
}
