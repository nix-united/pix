import { useEffect, useState } from 'react'
import clsx from 'clsx'

import { ChevronUpIcon } from '@assets/svg'
import Button from '../Button/Button'

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 450) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        })
    }, [])

    const scrollToTop = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.currentTarget.blur()
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    return (
        <Button
            className={clsx('scroll-to-top-btn', !isVisible ? 'hide' : '')}
            onClick={scrollToTop}
        >
            <ChevronUpIcon />
        </Button>
    )
}

export default ScrollToTopButton
