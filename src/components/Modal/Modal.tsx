import { Dispatch, SetStateAction } from 'react'
import ReactDOM from 'react-dom'

import { Button } from '../'
import { CloseIcon } from '@assets/svg'

import './Modal.scss'

interface IModalProps {
    children: JSX.Element
    title?: string
    isModalOpen: boolean
    setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export default function Modal({
    title,
    children,
    isModalOpen,
    setIsModalOpen
}: IModalProps) {
    return ReactDOM.createPortal(
        <>
            {isModalOpen ? (
                <div
                    className='modal-container'
                    onClick={() => setIsModalOpen(false)}
                >
                    <div className='modal' onClick={e => e.stopPropagation()}>
                        <div className='modal-header'>
                            {title ? (
                                <h2 className='modal-title'> {title} </h2>
                            ) : null}
                            <Button
                                className='close'
                                onClick={() => setIsModalOpen(false)}
                            >
                                <CloseIcon />
                            </Button>
                        </div>
                        <div className='modal-content'>{children}</div>
                    </div>
                </div>
            ) : null}
        </>,
        document.getElementById('modal') as HTMLElement
    )
}
