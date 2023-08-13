import { GalleryProps } from 'react-photoswipe-gallery'
import { DataSourceArray } from 'photoswipe'

import { getUrlParam, getFullscreenAPI } from '@/utils'

export const usePswpUiElements = (mediaFilesLength: number) => {
    let toggleThumbnails = true

    const uiElements: GalleryProps['uiElements'] = [
        {
            name: 'bullets-indicator',
            order: 9,
            isButton: false,
            appendTo: 'wrapper',

            onInit: (el, pswpInstance) => {
                if (toggleThumbnails) {
                    const thumnailsWrapper = document.createElement('div')
                    thumnailsWrapper.classList.add('pswp__thumbnails-container')
                    el.appendChild(thumnailsWrapper)

                    let prevIndex = -1
                    const thumbnails: HTMLElement[] = []

                    const dataSource = (
                        pswpInstance.options.dataSource as DataSourceArray
                    ).slice()

                    const thumbWidth = 100
                    const thumbMargin = 5
                    const thumbOuterWidth = document.documentElement.clientWidth
                    let translateX =
                        (thumbWidth + thumbMargin) * pswpInstance.currIndex -
                        (thumbOuterWidth / 2 - thumbWidth / 2)
                    const thumbTotalWidth =
                        (pswpInstance.options.dataSource as DataSourceArray)
                            .length *
                        (thumbWidth + thumbMargin)

                    for (let i = 0; i < dataSource.length; i++) {
                        const slideData = dataSource[i]
                        const thumbnail = document.createElement('div')
                        thumbnail.style.transition = 'border 0.2s ease-in-out'
                        thumbnail.style.opacity = '0.7'
                        thumbnail.style.cursor = 'pointer'
                        thumbnail.style.border = '2px solid transparent'
                        thumbnail.style.float = 'left'
                        thumbnail.style.marginRight = '5px'
                        thumbnail.onclick = (e: MouseEvent) => {
                            const target = e.target as
                                | HTMLImageElement
                                | HTMLDivElement
                            const thumbnailEl =
                                target.tagName === 'IMG'
                                    ? target.parentElement
                                    : (e.target as
                                          | HTMLImageElement
                                          | HTMLDivElement)
                            pswpInstance.goTo(
                                thumbnails.indexOf(thumbnailEl as HTMLElement)
                            )
                        }
                        const thumbnailImage = document.createElement('img')
                        thumbnailImage.setAttribute(
                            'src',
                            slideData.msrc as string
                        )
                        thumbnailImage.style.width = '96px'
                        thumbnailImage.style.height = '80px'
                        thumbnailImage.style.objectFit = 'cover'

                        thumbnail.appendChild(thumbnailImage)
                        thumnailsWrapper.appendChild(thumbnail)
                        thumbnails.push(thumbnail)
                    }
                    pswpInstance.on('change', () => {
                        translateX =
                            (thumbWidth + thumbMargin) *
                                pswpInstance.currIndex -
                            (thumbOuterWidth / 2 - thumbWidth / 2)

                        if (translateX > thumbTotalWidth - thumbOuterWidth) {
                            translateX = thumbTotalWidth - thumbOuterWidth
                        }

                        if (translateX < 0) {
                            translateX = 0
                        }

                        thumnailsWrapper.style.transitionDuration = '200ms'
                        thumnailsWrapper.style.width = `${thumbTotalWidth}px`
                        thumnailsWrapper.style.transform = `translate3d(-${translateX}px, 0px, 0px)`

                        if (prevIndex >= 0) {
                            const prevThumbnail = thumbnails[prevIndex]
                            prevThumbnail.style.opacity = '0.7'
                            prevThumbnail.style.cursor = 'pointer'
                            prevThumbnail.style.border = '2px solid transparent'
                        }

                        const currentThumbnail =
                            thumbnails[pswpInstance.currIndex]
                        currentThumbnail.style.opacity = '1'
                        currentThumbnail.style.cursor = 'unset'
                        currentThumbnail.style.border = '2px solid #fff'
                        prevIndex = pswpInstance.currIndex
                    })
                }
            }
        },
        {
            name: 'toggle-thumbnails-button',
            title: 'Toggle thumbnails',
            order: 9,
            isButton: true,
            html: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-grid"/><path d="M0 1.125C0 0.50368 0.50368 0 1.125 0H3.375C3.99632 0 4.5 0.50368 4.5 1.125V3.375C4.5 3.99632 3.99632 4.5 3.375 4.5H1.125C0.50368 4.5 0 3.99632 0 3.375V1.125Z" fill="white"/><path d="M6.75 1.125C6.75 0.50368 7.25368 0 7.875 0H10.125C10.7463 0 11.25 0.50368 11.25 1.125V3.375C11.25 3.99632 10.7463 4.5 10.125 4.5H7.875C7.25368 4.5 6.75 3.99632 6.75 3.375V1.125Z" fill="white"/><path d="M13.5 1.125C13.5 0.50368 14.0037 0 14.625 0H16.875C17.4963 0 18 0.50368 18 1.125V3.375C18 3.99632 17.4963 4.5 16.875 4.5H14.625C14.0037 4.5 13.5 3.99632 13.5 3.375V1.125Z" fill="white"/><path d="M0 7.875C0 7.25368 0.50368 6.75 1.125 6.75H3.375C3.99632 6.75 4.5 7.25368 4.5 7.875V10.125C4.5 10.7463 3.99632 11.25 3.375 11.25H1.125C0.50368 11.25 0 10.7463 0 10.125V7.875Z" fill="white"/><path d="M6.75 7.875C6.75 7.25368 7.25368 6.75 7.875 6.75H10.125C10.7463 6.75 11.25 7.25368 11.25 7.875V10.125C11.25 10.7463 10.7463 11.25 10.125 11.25H7.875C7.25368 11.25 6.75 10.7463 6.75 10.125V7.875Z" fill="white"/><path d="M13.5 7.875C13.5 7.25368 14.0037 6.75 14.625 6.75H16.875C17.4963 6.75 18 7.25368 18 7.875V10.125C18 10.7463 17.4963 11.25 16.875 11.25H14.625C14.0037 11.25 13.5 10.7463 13.5 10.125V7.875Z" fill="white"/><path d="M0 14.625C0 14.0037 0.50368 13.5 1.125 13.5H3.375C3.99632 13.5 4.5 14.0037 4.5 14.625V16.875C4.5 17.4963 3.99632 18 3.375 18H1.125C0.50368 18 0 17.4963 0 16.875V14.625Z" fill="white"/><path d="M6.75 14.625C6.75 14.0037 7.25368 13.5 7.875 13.5H10.125C10.7463 13.5 11.25 14.0037 11.25 14.625V16.875C11.25 17.4963 10.7463 18 10.125 18H7.875C7.25368 18 6.75 17.4963 6.75 16.875V14.625Z" fill="white"/><path d="M13.5 14.625C13.5 14.0037 14.0037 13.5 14.625 13.5H16.875C17.4963 13.5 18 14.0037 18 14.625V16.875C18 17.4963 17.4963 18 16.875 18H14.625C14.0037 18 13.5 17.4963 13.5 16.875V14.625Z" fill="white"/></svg>',

            onClick: (_event, _el, pswp) => {
                toggleThumbnails = !toggleThumbnails
                const thumbnailsWrapper = document.querySelector(
                    '.pswp__bullets-indicator'
                ) as HTMLDivElement
                const caption = document.querySelector(
                    '.pswp__default-caption'
                ) as HTMLDivElement

                thumbnailsWrapper.style.display = toggleThumbnails
                    ? 'block'
                    : 'none'
                caption.style.display = toggleThumbnails ? 'block' : 'none'

                pswp.on('close', () => {
                    if (!toggleThumbnails) toggleThumbnails = true
                })
            }
        },
        {
            name: 'fullscreen-button',
            title: 'Toggle fullscreen',
            order: 9,
            isButton: true,
            html: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-fullscreen-exit"/><use class="pswp__icn-shadow" xlink:href="#pswp__icn-fullscreen-request"/><path d="M6.33333 1H2.77778C1.79594 1 1 1.79594 1 2.77778V6.33333M6.33333 17H2.77778C1.79594 17 1 16.2041 1 15.2222V11.6667M11.6667 1H15.2222C16.2041 1 17 1.79594 17 2.77778V6.33333M17 11.6667V15.2222C17 16.2041 16.2041 17 15.2222 17H11.6667" stroke="white" stroke-width="1.5" stroke-linecap="round" id="pswp__icn-fullscreen-request"/><path d="M1 11.8799H4.22208C5.20388 11.8799 5.99978 12.644 5.99978 13.5866V17M6 1V4.4134C6 5.35598 5.20409 6.1201 4.2223 6.1201H1.00022M17 11.8799H13.7779C12.7961 11.8799 12.0002 12.644 12.0002 13.5866V17M12 1V4.4134C12 5.35598 12.7959 6.1201 13.7777 6.1201H16.9998" stroke="white" stroke-width="1.5" stroke-linecap="round" id="pswp__icn-fullscreen-exit" style="display:none"/></svg>',

            onClick: (_event, _el, pswp) => {
                const fullscreenAPI = getFullscreenAPI()
                const fsExit = document.getElementById(
                    'pswp__icn-fullscreen-exit'
                ) as HTMLElement
                const fsRequest = document.getElementById(
                    'pswp__icn-fullscreen-request'
                ) as HTMLElement

                function toggleFullscreen() {
                    if (fullscreenAPI) {
                        if (fullscreenAPI.isFullscreen()) {
                            fullscreenAPI.exit()
                        } else {
                            fullscreenAPI.request(
                                document.querySelector(`.pswp`)
                            )
                            fsExit.style.display = 'inline'
                            fsRequest.style.display = 'none'
                        }
                    }
                }
                toggleFullscreen()

                function onFsChange(_e: Event) {
                    if (!fullscreenAPI.isFullscreen()) {
                        fsExit.style.display = 'none'
                        fsRequest.style.display = 'inline'

                        pswp.off('close', pswpClose)
                        document.removeEventListener(
                            'fullscreenchange',
                            onFsChange
                        )
                    }
                }
                document.addEventListener('fullscreenchange', onFsChange)

                function pswpClose() {
                    if (fullscreenAPI && fullscreenAPI.isFullscreen()) {
                        fullscreenAPI.exit()
                    }
                }
                pswp.on('close', pswpClose)
            }
        },
        {
            name: 'slideshow-button',
            title: 'Start slideshow',
            order: 9,
            isButton: true,
            html: '<svg aria-hidden="true" width="16" height="18" viewBox="0 0 16 20" fill="none"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-slideshow-start"/><path d="M13.2905 8.93735C14.585 9.69884 14.5898 10.6568 13.2905 11.5177L3.25121 18.6645C1.98979 19.3751 1.13307 18.9556 1.04314 17.418L1.00054 2.45982C0.972136 1.04355 2.07735 0.643399 3.13051 1.32244L13.2905 8.93735Z" stroke="white" stroke-width="1.5" id="pswp__icn-slideshow-start"/></svg>',

            onClick: (_event, _el, pswp) => {
                const fullscreenAPI = getFullscreenAPI()

                function toggleFullscreen() {
                    if (fullscreenAPI) {
                        if (!fullscreenAPI.isFullscreen()) {
                            fullscreenAPI.request(
                                document.querySelector(`.pswp`)
                            )
                        }
                    }
                }
                toggleFullscreen()

                // Hide all ui elements
                const uiBottomThumbnails = document.querySelector(
                    '.pswp__bullets-indicator'
                ) as HTMLDivElement
                const uiTopBar = document.querySelector(
                    '.pswp__top-bar'
                ) as HTMLDivElement
                const uiCaption = document.querySelector(
                    '.pswp__default-caption'
                ) as HTMLDivElement
                const uiArrows = document.querySelectorAll<HTMLButtonElement>(
                    '.pswp__button--arrow'
                )

                function getSsIcons() {
                    const ssPlayIcon = document.getElementById(
                        'pswp__icn-slideshow-play'
                    ) as HTMLElement
                    const ssPauseIcon = document.getElementById(
                        'pswp__icn-slideshow-pause'
                    ) as HTMLElement

                    return { ssPlayIcon, ssPauseIcon }
                }

                uiTopBar.style.visibility = 'hidden'
                uiArrows.forEach(node => (node.style.visibility = 'hidden'))
                uiBottomThumbnails.style.visibility = 'hidden'
                uiCaption.style.visibility = 'hidden'

                // slideshow settings
                let ssInterval: ReturnType<typeof setInterval>
                let ssPause = false
                const ssDelay = 3000

                function gotoNextSlide() {
                    if (!ssPause && fullscreenAPI.isFullscreen()) {
                        pswp.next()
                    }
                }

                let slideshowPanel = document.querySelector(
                    '.slideshow__control-panel'
                ) as HTMLDivElement
                let pauseButton = document.querySelector(
                    '.pause-btn'
                ) as HTMLButtonElement

                // create slideshow panel if not exists in DOM
                if (!slideshowPanel) {
                    slideshowPanel = document.createElement('div')
                    slideshowPanel.classList.add('slideshow__control-panel')

                    pauseButton = document.createElement('button')
                    pauseButton.setAttribute('title', 'Pause slideshow')
                    pauseButton.classList.add('pswp__button', 'pause-btn')
                    pauseButton.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-slideshow-play"/><use class="pswp__icn-shadow" xlink:href="#pswp__icn-slideshow-pause"/><path d="M1 17V1M11 17V1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="pswp__icn-slideshow-pause" /><path d="M12.1199 8.05542C13.2912 8.7323 13.2955 9.58379 12.1199 10.3491L3.03681 16.7018C1.89552 17.3334 1.12039 16.9605 1.03903 15.5938L1.00048 2.29762C0.97479 1.03871 1.97475 0.683021 2.9276 1.28661L12.1199 8.05542Z" fill="white" stroke="white" stroke-width="1.5" id="pswp__icn-slideshow-play" style="display: none"/></svg>'

                    const restartButton = document.createElement(
                        'button'
                    ) as HTMLButtonElement
                    restartButton.setAttribute('title', 'Restart slideshow')
                    restartButton.classList.add('pswp__button')
                    restartButton.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><use class="pswp__icn-shadow"/><path d="M4.375 16.7501C2.51104 16.7501 1 15.2391 1 13.3751V6.625C1 4.76104 2.51104 3.25 4.375 3.25H9.4375M13.9375 3.25H15.625C17.489 3.25 19 4.76104 19 6.625V13.3751C19 15.2391 17.489 16.7501 15.625 16.7501H8.3125M8.3125 16.7501L10.5625 14.5M8.3125 16.7501L10.5625 19M8.3125 5.5L10.5625 3.25L8.3125 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>'

                    const closeButton = document.createElement(
                        'button'
                    ) as HTMLButtonElement
                    closeButton.setAttribute('title', 'Exit slideshow')
                    closeButton.classList.add('pswp__button')
                    closeButton.innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><use class="pswp__icn-shadow"/><path d="M15 1L1 15M15 15L1 1" stroke="white" stroke-width="1.5" stroke-linecap="round" /></svg>'

                    closeButton.addEventListener('click', () => {
                        if (fullscreenAPI && fullscreenAPI.isFullscreen()) {
                            fullscreenAPI.exit()
                        }
                    })

                    restartButton.addEventListener('click', () => {
                        pswp.goTo(0)
                    })

                    slideshowPanel.append(
                        pauseButton,
                        restartButton,
                        closeButton
                    )
                    //@ts-ignore
                    pswp.scrollWrap.appendChild(slideshowPanel)
                } else {
                    if (pauseButton.hasAttribute('disabled'))
                        pauseButton.removeAttribute('disabled')
                    pauseButton.setAttribute('title', 'Pause slideshow')
                    const { ssPauseIcon, ssPlayIcon } = getSsIcons()
                    ssPlayIcon.style.display = 'none'
                    ssPauseIcon.style.display = 'inline'
                }

                if (pswp.currIndex !== mediaFilesLength - 1) {
                    ssInterval = setInterval(gotoNextSlide, ssDelay)
                } else {
                    pauseButton.setAttribute('disabled', 'disabled')
                    pauseButton.setAttribute('title', 'Play slideshow')
                    const { ssPauseIcon, ssPlayIcon } = getSsIcons()
                    ssPlayIcon.style.display = 'inline'
                    ssPauseIcon.style.display = 'none'
                }

                function handlePauseClick() {
                    ssPause = !ssPause
                    clearInterval(ssInterval)
                    if (ssPause) {
                        pauseButton.setAttribute('title', 'Play slideshow')
                        const { ssPauseIcon, ssPlayIcon } = getSsIcons()
                        ssPlayIcon.style.display = 'inline'
                        ssPauseIcon.style.display = 'none'
                    } else {
                        ssInterval = setInterval(gotoNextSlide, ssDelay)
                        pauseButton.setAttribute('title', 'Pause slideshow')
                        const { ssPauseIcon, ssPlayIcon } = getSsIcons()
                        ssPlayIcon.style.display = 'none'
                        ssPauseIcon.style.display = 'inline'
                    }
                }

                pauseButton.addEventListener('click', handlePauseClick)

                let timeDelay = 1
                let panelInterval = setInterval(hideSlideshowPanel, 500)

                function hideSlideshowPanel() {
                    if (timeDelay === 3) {
                        slideshowPanel.classList.remove('show')
                        timeDelay = 1
                    }
                    timeDelay = timeDelay + 1
                }

                function showSlideshowPanel() {
                    slideshowPanel.classList.add('show')
                    timeDelay = 1
                    clearInterval(panelInterval)
                    panelInterval = setInterval(hideSlideshowPanel, 500)
                }
                //@ts-ignore
                pswp.scrollWrap.addEventListener(
                    'mousemove',
                    showSlideshowPanel
                )

                function pswpChange() {
                    clearInterval(ssInterval)

                    if (pswp.currIndex === mediaFilesLength - 1) {
                        pauseButton.setAttribute('disabled', 'disabled')
                        const { ssPauseIcon, ssPlayIcon } = getSsIcons()
                        ssPlayIcon.style.display = 'inline'
                        ssPauseIcon.style.display = 'none'

                        ssPause = true
                        return
                    }

                    ssPause = false

                    if (!ssPause && fullscreenAPI.isFullscreen()) {
                        if (pauseButton.hasAttribute('disabled'))
                            pauseButton.removeAttribute('disabled')
                        pauseButton.setAttribute('title', 'Pause slideshow')
                        const { ssPauseIcon, ssPlayIcon } = getSsIcons()
                        ssPlayIcon.style.display = 'none'
                        ssPauseIcon.style.display = 'inline'

                        ssInterval = setInterval(gotoNextSlide, ssDelay)
                    }
                }

                function pswpClose() {
                    clearInterval(ssInterval)
                    clearInterval(panelInterval)

                    if (fullscreenAPI && fullscreenAPI.isFullscreen()) {
                        fullscreenAPI.exit()
                    }

                    document.removeEventListener('fullscreenchange', onFsChange)
                    //@ts-ignore
                    pswp.scrollWrap.removeEventListener(
                        'mousemove',
                        showSlideshowPanel
                    )
                }

                function onFsChange(_e: Event) {
                    if (!fullscreenAPI.isFullscreen()) {
                        clearInterval(ssInterval)
                        clearInterval(panelInterval)

                        slideshowPanel.classList.remove('show')
                        uiTopBar.style.visibility = 'visible'
                        uiArrows.forEach(
                            node => (node.style.visibility = 'visible')
                        )
                        uiBottomThumbnails.style.visibility = 'visible'
                        uiCaption.style.visibility = 'visible'

                        pswp.off('change', pswpChange)
                        pswp.off('close', pswpClose)
                        //@ts-ignore
                        pswp.scrollWrap.removeEventListener(
                            'mousemove',
                            showSlideshowPanel
                        )
                        pauseButton.removeEventListener(
                            'click',
                            handlePauseClick
                        )
                        document.removeEventListener(
                            'fullscreenchange',
                            onFsChange
                        )
                    }
                }
                document.addEventListener('fullscreenchange', onFsChange)

                pswp.on('change', pswpChange)
                pswp.on('close', pswpClose)
            }
        },
        {
            name: 'download-button',
            order: 9,
            isButton: false,
            html: '<a class="pswp__button pswp__button--download-button" aria-label="Download" tabindex="0" target="_blank" rel="noopener" title="Download"><svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-download"></use><path d="M1 11.8483L1 15.1267C1 15.6235 1.19962 16.1 1.55496 16.4513C1.91029 16.8026 2.39222 17 2.89474 17H14.2632C14.7657 17 15.2476 16.8026 15.6029 16.4513C15.9583 16.1 16.1579 15.6235 16.1579 15.1267V11.8483M8.58 1V11.6155M8.58 11.6155L12.9108 7.55938M8.58 11.6155L4.24918 7.55938" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="pswp__icn-download"/></svg></a>',

            onClick: (_event, _el, pswp) => {
                const downloadButton = document.querySelector(
                    '.pswp__button--download-button'
                ) as HTMLAnchorElement

                downloadButton.setAttribute(
                    'href',
                    `https://drive.google.com/u/${localStorage.getItem(
                        'authuser'
                    )}/uc?id=${getUrlParam({
                        url: (pswp.element as HTMLDivElement).baseURI,
                        param: 'pid'
                    })}&export=download`
                )
                downloadButton.setAttribute('download', '')
            }
        },
        {
            name: 'link-to-file',
            title: 'Copy link',
            order: 9,
            isButton: true,
            html: '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><use class="pswp__icn-shadow" xlink:href="#pswp__icn-copy-link"/><path d="M5.02335 7.53518L2.90937 9.64916C2.11986 10.4387 1.66583 11.5129 1.67413 12.6419C1.68243 13.7709 2.12652 14.8517 2.95349 15.6532C3.75489 16.4802 4.83592 16.9243 5.96474 16.9325C7.11932 16.941 8.16815 16.5126 8.95771 15.7231L11.0717 13.6091M13.7719 10.9605L15.8859 8.84653C16.6754 8.05702 17.1294 6.98277 17.1211 5.85376C17.1128 4.72475 16.6687 3.64395 15.8418 2.84251C15.0406 2.0413 13.9597 1.59719 12.8307 1.58889C11.7017 1.5806 10.6273 2.00885 9.83774 2.79838L7.72376 4.91237M6.19191 12.397L12.5339 6.05509" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" id="pswp__icn-copy-link"/></svg>',

            onInit(element, _pswp) {
                const message = document.createElement('span')
                message.classList.add('copy-result')
                element.appendChild(message)
            },

            onClick: async (_event, _el, pswp) => {
                const message = document.querySelector(
                    '.copy-result'
                ) as HTMLSpanElement
                let timeout: ReturnType<typeof setTimeout>

                navigator.clipboard
                    .writeText((pswp.element as HTMLDivElement).baseURI)
                    .then(() => {
                        message.innerHTML =
                            '<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 1L4.30482 11L1 7.59127" stroke="#53fd53" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
                    })
                    .finally(() => {
                        timeout = setTimeout(() => {
                            message.innerHTML = ''
                        }, 3000)
                    })

                pswp.on('change', () => {
                    clearTimeout(timeout)
                    message.innerHTML = ''
                })

                pswp.on('close', () => {
                    clearTimeout(timeout)
                })
            }
        }
    ]

    return uiElements
}
