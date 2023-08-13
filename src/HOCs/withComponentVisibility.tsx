import { ComponentType } from 'react'

import { useComponentVisible } from '@/hooks/useComponentVisible'

export const withComponentVisibility =
    <TProps,>(Component: ComponentType<TProps>) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (props: any) => {
        const { ref, isComponentVisible, setIsComponentVisible } =
            useComponentVisible(false)

        return (
            <Component
                ref={ref}
                isComponentVisible={isComponentVisible}
                setIsComponentVisible={setIsComponentVisible}
                {...props}
            />
        )
    }
