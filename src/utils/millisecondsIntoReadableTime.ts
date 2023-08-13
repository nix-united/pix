export const millisecondsIntoReadableTime = (msDuration: number) => {
    const h = Math.floor(msDuration / 1000 / 60 / 60)
    const m = Math.floor((msDuration / 1000 / 60 / 60 - h) * 60)
    const s = Math.floor(((msDuration / 1000 / 60 / 60 - h) * 60 - m) * 60)

    const seconds = s < 10 ? `0${s}` : `${s}`
    const minutes = m < 10 ? `0${m}` : `${m}`
    const hours = h < 10 ? `0${h}` : `${h}`

    return hours === '00'
        ? minutes + ':' + seconds
        : hours + ':' + minutes + ':' + seconds
}
