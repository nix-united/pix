import clsx from 'clsx'

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    className: string
}

export default function Button({
    children,
    className,
    ...attributes
}: IButtonProps) {
    return (
        <button
            type='button'
            className={clsx('button', className)}
            {...attributes}
        >
            {children}
        </button>
    )
}
