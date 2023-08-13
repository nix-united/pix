import './VideoItem.scss'

export default function VideoItem({ url }: { url: string }) {
    return (
        <div className='video'>
            <div className='video-container'>
                <iframe
                    className='video-wrapper'
                    src={url}
                    allowFullScreen
                    allow='autoplay'
                ></iframe>
            </div>
        </div>
    )
}
