import useSWRImmutable from 'swr/immutable'
import useSWRInfinite from 'swr/infinite'
import axios from 'axios'

import {
    TBreadcrumb,
    TDriveFolder,
    TDriveMediaFile,
    TGoogleUser,
    TResponseFromDrive,
    TSortOptions
} from '@/types'
import { fetcher } from '@/api/axios'
import { googleRoutes } from '@/api/paths'

const fetchMediaFiles = async (url: string) => {
    const { data } = await axios.get<TResponseFromDrive<TDriveMediaFile>>(url, {
        params: {
            fields: 'nextPageToken,files(id,size,createdTime,thumbnailLink,videoMediaMetadata,imageMediaMetadata(height,width))',
            orderBy: 'createdTime asc',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true,
            pageSize: 50
        },
        headers: {
            Authorization: localStorage.getItem('token')
        }
    })
    return data
}

export const useGoogleUser = () => {
    const { data, isLoading } = useSWRImmutable<TGoogleUser>(
        [googleRoutes.userInfo],
        fetcher
    )
    return { data, isLoading }
}

export const useDriveFolder = (folderId: string | undefined) => {
    const requestConfig = {
        params: {
            fields: 'id,name,parents,trashed',
            supportsAllDrives: true,
            includeItemsFromAllDrives: true
        }
    }
    const { data, error, isLoading } = useSWRImmutable<TBreadcrumb>(
        [`${googleRoutes.folderContent}/${folderId}`, requestConfig],
        fetcher
    )
    return { data, error, isLoading }
}

export const useDriveFolders = ({
    folderId,
    sortOptions
}: {
    folderId: string | undefined
    sortOptions: TSortOptions
}) => {
    const requestConfig = {
        params: {
            q: `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            fields: 'files(id,name,createdTime)',
            orderBy: `${sortOptions.type} ${sortOptions.order}`,
            supportsAllDrives: true,
            includeItemsFromAllDrives: true
        }
    }
    const { data, isLoading } = useSWRImmutable<
        TResponseFromDrive<TDriveFolder>
    >([googleRoutes.folderContent, requestConfig], fetcher)
    return { data, isLoading }
}

export const useDriveMediaFiles = (folderId: string | undefined) => {
    const getKey = (
        pageIndex: number,
        previousPageData: TResponseFromDrive<TDriveMediaFile> | null
    ) => {
        if (previousPageData && !previousPageData.nextPageToken) return null // reached the end
        if (pageIndex === 0) {
            return `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and (mimeType contains 'image/' or mimeType contains 'video/') and trashed=false`
        } // first page
        return `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and (mimeType contains 'image/' or mimeType contains 'video/') and trashed=false&pageToken=${previousPageData?.nextPageToken}`
    }

    const { data, isLoading, size, setSize } = useSWRInfinite<
        TResponseFromDrive<TDriveMediaFile>
    >(getKey, fetchMediaFiles, {
        revalidateOnFocus: false,
        revalidateFirstPage: false,
        keepPreviousData: true
    })

    return { data, isLoading, size, setSize }
}
