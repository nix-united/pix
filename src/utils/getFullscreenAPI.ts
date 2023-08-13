export function getFullscreenAPI() {
    const enterFS = 'requestFullscreen'
    const exitFS = 'exitFullscreen'
    const elementFS = 'fullscreenElement'
    const changeEvent = 'fullscreenchange'
    const errorEvent = 'fullscreenerror'

    const api = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        request: function (el: any) {
            el[enterFS]()
        },
        exit: function () {
            //@ts-ignore
            return document[exitFS]()
        },
        isFullscreen: function () {
            //@ts-ignore
            return document[elementFS]
        },
        change: changeEvent,
        error: errorEvent
    }

    return api
}
