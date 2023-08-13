import { forwardRef } from 'react'
import clsx from 'clsx'

import Button from '../Button/Button'

interface IMenuProps {
    containerName: string
    buttonClassName: string
    menuClassName: string
    buttonDisabled?: boolean
    isComponentVisible: boolean
    buttonChildren: JSX.Element
    children: JSX.Element
    setIsComponentVisible: React.Dispatch<React.SetStateAction<boolean>>
}

type Ref = HTMLDivElement

const Menu = forwardRef<Ref, IMenuProps>(
    (
        {
            containerName,
            buttonClassName,
            buttonChildren,
            menuClassName,
            buttonDisabled,
            isComponentVisible,
            setIsComponentVisible,
            children
        },
        ref
    ) => {
        return (
            <div className={containerName} ref={ref}>
                <Button
                    className={clsx(
                        buttonClassName,
                        isComponentVisible && 'active'
                    )}
                    onClick={() => setIsComponentVisible(!isComponentVisible)}
                    disabled={buttonDisabled}
                >
                    {buttonChildren}
                </Button>
                <ul
                    className={clsx(
                        menuClassName,
                        !isComponentVisible ? 'menu-hidden' : 'menu-visible'
                    )}
                >
                    {children}
                </ul>
            </div>
        )
    }
)

export default Menu
