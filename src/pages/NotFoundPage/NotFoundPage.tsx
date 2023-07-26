import { useNavigate } from 'react-router-dom'

import { Button } from '@/components'
import { ChevronLeftIcon } from '@assets/svg'

import './NotFoundPage.scss'

export default function NotFoundPage() {
    const navigate = useNavigate()

    return (
        <div className='container'>
            <div className='paper'>
                <div className='not-found-container'>
                    <h1 className='title'>404</h1>
                    <Button
                        className='back-button'
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeftIcon />
                        <span>Back</span>
                    </Button>
                    <p className='helper-text'>
                        the page you`re looking for does not seem to exist
                    </p>
                </div>
            </div>
        </div>
    )
}
