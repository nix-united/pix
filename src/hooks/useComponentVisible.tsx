import { useState, useEffect, useRef } from 'react'

export const useComponentVisible = (initialIsVisible: boolean) => {
    const [isComponentVisible, setIsComponentVisible] =
        useState(initialIsVisible)
    const ref = useRef<HTMLDivElement>(null)

    const handleHideDropdown = ({ key }: KeyboardEvent) => {
        if (key === 'Escape') {
            setIsComponentVisible(false)
        }
    }

    const handleClickOutside = ({ target }: MouseEvent) => {
        if (
            (ref.current && !ref.current?.contains(target as Node)) ||
            ref.current === target
        ) {
            setIsComponentVisible(false)
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleHideDropdown, true)
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('keydown', handleHideDropdown, true)
            document.removeEventListener('click', handleClickOutside, true)
        }
    }, [])

    return { ref, isComponentVisible, setIsComponentVisible }
}
