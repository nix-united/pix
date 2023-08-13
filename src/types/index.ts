export type TGoogleUser = {
    id: string
    email: string
    verified_email: boolean
    name: string
    given_name: string
    family_name: string
    picture: string
    locale: string
}

export type TSortType = {
    name: string
    type: 'createdTime' | 'name_natural'
}

export type TSortOrder = {
    order: 'asc' | 'desc'
}

export type TSortOptions = TSortType & TSortOrder

export type TDriveResource = TDriveFolder & TDriveMediaFile

export type TDriveFolder = {
    mimeType: string
    id: string
    name: string
    createdTime: string
}

export type TDriveMediaFile = {
    id: string
    size: string
    thumbnailLink: string
    imageMediaMetadata: TImageMediaMetadata
    videoMediaMetadata: TVideoMediaMetadata
    createdTime: string
}

export type TMediaFile = {
    id: string
    src: string
    createdTime: string
    viewLink: string
    width: number
    height: number
    size: string
    durationMillis?: string
}

type TImageMediaMetadata = {
    width: number
    height: number
}

type TVideoMediaMetadata = {
    width: number
    height: number
    durationMillis: string
}

export type TDriveResourceList = {
    files: TDriveResource[]
}

export type TBreadcrumb = {
    id: string
    name: string
    trashed: boolean
}

export type TDriveFolderInfo = {
    id: string
    name: string
    parents: string[] | undefined
    trashed: boolean
}

export type TResponseFromDrive<T> = {
    files: T[]
    nextPageToken: string
}
