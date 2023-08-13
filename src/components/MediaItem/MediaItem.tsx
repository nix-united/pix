import React, { CSSProperties, MutableRefObject } from 'react'
import { Item, ItemRef } from 'react-photoswipe-gallery'

import { TMediaFile } from '@/types'
import { millisecondsIntoReadableTime, humanFileSize } from '@/utils'
import { PlayIcon } from '@assets/svg'
import VideoItem from '../VideoItem/VideoItem'

import './MediaItem.scss'

export default function MediaItem({
    mediaFile,
    wrapperStyle
}: {
    mediaFile: TMediaFile
    wrapperStyle?: CSSProperties
}) {
    const {
        id,
        src,
        viewLink,
        width,
        height,
        createdTime,
        size,
        durationMillis
    } = mediaFile

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLDivElement>,
        ref: ItemRef
    ) => {
        if (e.key === 'Enter') {
            ref.current.click()
            return
        }
    }

    return (
        <Item
            key={id}
            id={id}
            original={viewLink}
            thumbnail={src}
            width={width}
            height={height}
            caption={`${new Date(
                createdTime
            ).toLocaleDateString()} • ${humanFileSize(+size)}`}
            content={
                !durationMillis ? (
                    /* @ts-ignore */
                    this
                ) : (
                    <VideoItem url={viewLink} />
                )
            }
            cropped
        >
            {({ ref, open }) => {
                return (
                    <div
                        style={wrapperStyle}
                        className='thumbnail-wrapper'
                        ref={ref as MutableRefObject<HTMLImageElement>}
                        onClick={open}
                        onKeyDown={e => handleKeyDown(e, ref)}
                        tabIndex={0}
                    >
                        {durationMillis && (
                            <div className='video-info'>
                                <p>
                                    <PlayIcon />
                                    {millisecondsIntoReadableTime(
                                        Number(durationMillis)
                                    )}
                                </p>
                            </div>
                        )}
                        <img
                            src={src}
                            height={height}
                            width={width}
                            data-imageid={id}
                            loading='lazy'
                        />
                    </div>
                )
            }}
        </Item>
    )
}
